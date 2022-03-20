const fs = require('fs');
const express = require('express');
const { ApolloServer, UserInputError } = require('apollo-server-express');
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
const { MongoClient } = require('mongodb');
const e = require('express');



const url = 'mongodb://localhost/traveler';

let db;

let aboutMessage = "Welcome to Railway Reservation Database.";

const GraphQLDate = new GraphQLScalarType({
  name: 'GraphQLDate',
  description: 'A Date() type in GraphQL as a scalar',
  serialize(value) {
    return value.toISOString();
  },
  parseValue(value) {
    const dateValue = new Date(value);
    return isNaN(dateValue) ? undefined : dateValue;
  },
  parseLiteral(ast) {
    if (ast.kind == Kind.STRING) {
      const value = new Date(ast.value);
      return isNaN(value) ? undefined : value;
    }
  },
});

const resolvers = {
  Query: {
    about: () => aboutMessage,
    reservationList,
  },
  Mutation: {
    setAboutMessage,
    travellerAdd,
    travellerDelete,
    travellerBlacklist,
  },
  GraphQLDate,
}

function setAboutMessage(_, { message }) {
  return aboutMessage = message;
}

async function reservationList() {
  const travellers = await db.collection('travellers').find({}).toArray();
  return travellers;
}

async function newestTraveller(name){
  const result = await db.collection('counters').findOneAndUpdate(
    { _id: name },
    { $inc: { current:1 }},
    { returnOriginal: false },
  );
  return result.value.current;
}

async function travellerValidate(traveller) {
  const errors = [];
  if (traveller.name.length <=0) {
    errors.push('Name can not be empty');
  }
  if (String.valueOf(traveller.phonenum).length <= 0) {
    errors.push('Phone Number can not be empty');
  }
  if(errors.length>0){
    throw new UserInputError('Invalid input(s)', { errors });
  }

}


async function travellerDelAndBlkValidate(traveller) {
  const errors = [];
  if (traveller.name.length <=0) {
    errors.push('Name can not be empty');
  }
  if(errors.length>0){
    throw new UserInputError('Invalid input(s)', { errors });
  }

}

async function travellerAdd(_, { traveller }){
  await travellerValidate(traveller);
  var addedTraveller;
  traveller.time = new Date();
  traveller.id = await newestTraveller('travellers');

  const blks = await db.collection('blacklists').find({name: traveller.name}).count();   
  if (blks == 0) {
    const result = await db.collection("travellers").insertOne(traveller);
    addedTraveller = await db.collection('travellers').findOne({ _id: result.insertedId})
  } 
  return addedTraveller
}
  

async function travellerDelete(_, { name }){
  await travellerDelAndBlkValidate(name);
  const result = await db.collection("travellers").deleteOne(name);
  const deletedTraveller = await db.collection('travellers').findOne({ name: name})
  return deletedTraveller
}

async function travellerBlacklist(_, { traveller }){
  await travellerDelAndBlkValidate(traveller);
  var addedblkTraveller;
  const blks = await db.collection('blacklists').find({name: traveller.name}).count();   
  if (blks==0){
    const result = await db.collection("blacklists").insertOne(traveller);
    addedblkTraveller = await db.collection('blacklists').findOne({ _id: result.insertedId})
  }
  return addedblkTraveller
}

const app = express();

app.use(express.static('public'));

const server = new ApolloServer({
  typeDefs: fs.readFileSync('./server/schema.graphql', 'utf-8'),
  resolvers,
  formatError: error => {
    console.log(error);
    return error;
  },
})

server.applyMiddleware({ app, path: '/graphql' });

async function connectToDb() {
  const client = new MongoClient(url, {useNewUrlParser: true});
  await client.connect();
  console.log('Connected to MongoDB at', url);
  db = client.db();
}

(async function(){
  try{
    await connectToDb();
    app.listen(3000, function () {
      console.log('App started on port 3000');
    });
  } catch (err) {
    console.log('ERROR:', err);
  }
})();


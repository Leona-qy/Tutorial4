const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost/traveler';

async function testCRUD() {
  console.log('\n--- testCRUD ---');
  const client = new MongoClient(url, { useNewUrlParser: true });
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    const db = client.db();
    const collection = db.collection('travellers');

    //test add logic
    const traveller1 = { id: 1, name: 'A. Test', phonenum: 12345678 };
    const traveller2 = { id: 2, name: 'B. Test', phonenum: 88889999 };
    const result1 = await collection.insertOne(traveller1);
    const result2 = await collection.insertOne(traveller2);
    console.log('Result of insert:\n', result1.insertedId, result2.insertedId);

    //test find logic
    const docs = await collection.find({})
      .toArray();
    console.log('Result of find:\n', docs);

    //test update logic

    const result3 = await collection.updateOne({id: 2}, {$set: {phonenum: 86887677} });
    console.log('Result of update:\n', result2.insertedId);

    const docs1 = await collection.find({})
      .toArray();
    console.log('Result of find:\n', docs1);

    //test delete logic
    const result4 = await collection.deleteOne({id: 2});
    console.log('Result of delete:\n', result2.insertedId);

    const docs2 = await collection.find({})
      .toArray();
    console.log('Result of find:\n', docs2);

  } catch(err) {
    console.log(err);
  } finally {
    client.close();
  }
}


testCRUD()

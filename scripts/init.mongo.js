db.travellers.remove({});
db.counters.remove({});
db.blacklists.remove({});

const travelerDB = [
  {
    id: 1, name: 'Lily', phonenum: '12345678',
    time: new Date('2022-02-22'),
  },
  {
    id: 2, name: 'Mike', phonenum: '56781234',
    time: new Date('2022-02-23'),
  },
];

db.travellers.insertMany(travelerDB);
const count = db.travellers.count();
print('Inserted', count, 'travellers');

db.counters.remove({ _id: 'travallers' });
db.counters.insert({ _id: 'travellers', current: count });

db.travellers.createIndex({ id: 1 }, { unique: true });
db.travellers.createIndex({ name: 1 });
db.travellers.createIndex({ phonenum: 1 });
db.travellers.createIndex({ time: 1 });

db.blacklists.insert({name: "Helay"});
db.blacklists.insert({name: "Steven"});

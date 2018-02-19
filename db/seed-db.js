const mongoose = require('mongoose');
const Prayer = require('../models/prayer.model');
const User = require('../models/user.model');
const seedPrayer = require('./prayer.json');
const {DATABASE_URL} = require('../config');


mongoose.connect(DATABASE_URL);

mongoose.connection.dropDatabase();

User.create({'name':'Evan Garrett', 'email':'evang522@gmail.com', '_id': '000000000000000000000000'})
  .then(() => {
    console.log('Inserted Evan as a user');
    return Prayer.insertMany(seedPrayer);
  })
  .then((prayers) => {
    console.log(`Inserted ${prayers.length} prayer requests`);

  })
  .catch(err => {
    console.log('There was an error: ' + err);
  });



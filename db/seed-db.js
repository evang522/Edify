const mongoose = require('mongoose');
const Prayer = require('../models/prayer.model');
const User = require('../models/user.model');
const Need = require('../models/need.model');
const seedPrayer = require('./prayer.json');
const seedUsers = require('./users.json');
const {DATABASE_URL} = require('../config');
const seedNeeds = require('./needs.json');

mongoose.connect(DATABASE_URL);

mongoose.connection.dropDatabase();

User.insertMany(seedUsers)
  .then((users) => {
    console.log(`inserted ${users.length} users`);
    return Prayer.insertMany(seedPrayer);
  })
  .then((prayers) => {
    console.log(`Inserted ${prayers.length} prayer requests`);
    return Need.insertMany(seedNeeds);
  })
  .then(needs => {
    console.log(`Inserted ${needs.length} needs`);
  })
  .catch(err => {
    console.log('There was an error: ' + err);
  });



const mongoose = require('mongoose');
const Prayer = require('../models/prayer.model');
const seedPrayer = require('./prayer.json');
const {DATABASE_URL} = require('../config');


mongoose.connect(DATABASE_URL);

mongoose.connection.dropDatabase();

Prayer.insertMany(seedPrayer)
  .then((prayers) => {
    console.log(`Inserted ${prayers.length} prayer requests`);
  });
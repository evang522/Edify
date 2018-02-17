const express = require('express');
const router = express.Router();

// Bring in Models
const Prayer = require('../models/prayer.model');

router.get('/prequest', (req,res,next) => {
  Prayer.find()
    .then((prequests) => {
      res.json(prequests);
    });
});


module.exports = router;
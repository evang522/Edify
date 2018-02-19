const express = require('express');
const router = express.Router();


// Bring in User Model
const User = require('../models/user.model');

router.get('/users', (req,res,next) => {
  User.find()
    .select('name email avatar')
    .then((response) => {
      res.json(response);
    })
    .catch(next);
});


router.post('/users', (req,res,next) => {
  const requiredFields = ['name','email'];
  const newUser = {};
  requiredFields.forEach((field) => {
    if (!(field in req.body)) {
      const err = new Error(`Missing ${field} field`);
      err.status = 400;
      return next(err);
    }
    newUser[field] = req.body[field];
  });

  User.create(newUser)
    .then(response => {
      res.status(201).json(response);
    })
    .catch(next);
});



module.exports = router;

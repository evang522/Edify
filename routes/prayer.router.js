const express = require('express');
const router = express.Router();

// Bring in Models
const Prayer = require('../models/prayer.model');

router.get('/prequest', (req,res,next) => {
  const filter = {};
  const { searchTerm } = req.query;
  const projection = {};

  Prayer.find(filter, projection)
    .then((prequests) => {
      res.json(prequests);
    })
    .catch(next);
});

router.get('/prequest/:id', (req,res,next) => {
  const {id} = req.params;

  Prayer.findById(id)
    .then((prequest) => {
        
      if (prequest === null) {
        const err = new Error('Prayer request with this ID could not be found');
        err.status = 404;
        return next(err);
      }
      res.json(prequest);
    })
    .catch(err => {
      if (err.path === '_id') {
        const err = new Error('The requested ID is not of a valid ID type');
        err.status = 404;
        return next(err);
      }
      next(err);
    });
});

router.post('/prequest', (req,res,next) => {

  const newObj = {};
  const requiredFields = ['title','requestbody'];

  requiredFields.forEach((field) => {
    if (!(field in req.body)) {
      const err = new Error(`Missing ${field} field.`);
      err.status = 400;
      return next(err);
    }
    newObj[field] = req.body[field];
  });

  Prayer.create(newObj)
    .then((response) => {
      res.status(201).json(response);
    })
    .catch(err => {
      next(err);
    });

});


router.put('/prequest/:id', (req,res,next) => {
  const {id} = req.params;
  const updateObj = {};
  const updateableFields = ['title','requestbody'];

  updateableFields.forEach((field) => {
    if (field in req.body) {
      updateObj[field] = req.body[field];
    }
  });

  Prayer.findByIdAndUpdate(id,updateObj, {new:true})
    .then((response) => {
      if (response === null) {
        const err = new Error('Prayer request with this ID could not be found');
        err.status = 404;
        return next(err);
      }
      res.status(200).json(response);
    })
    .catch(err => {
      if (err.path === '_id') {
        const err = new Error('The requested ID is not of a valid ID type');
        err.status = 404;
        return next(err);
      }
      next(err);
    });

});

module.exports = router;

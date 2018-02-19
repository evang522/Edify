const express = require('express');
const router = express.Router();
const convertUrl = require('../js/urlconverter');

// Bring in Models
const Prayer = require('../models/prayer.model');

router.get('/prequests', (req,res,next) => {
  const filter = {};
  const { searchTerm } = req.query;
  const projection = {};

  Prayer.find(filter, projection)
    .populate('author')
    .sort({created:-1})
    .then((prequests) => {
      res.json(prequests);
    })
    .catch(next);
});

router.get('/prequests/:id', (req,res,next) => {
  const {id} = req.params;

  Prayer.findById(id)
    .populate(author)
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

router.post('/prequests', (req,res,next) => {
  const newObj = {};
  const requiredFields = ['title','requestbody'];

  requiredFields.forEach((field) => {
    if (!(field in req.body)) {
      const err = new Error(`Missing ${field} field.`);
      err.status = 400;
      return next(err);
    }
    newObj[field] = convertUrl(req.body[field]);
  });

  Prayer.create(newObj)
    .then((response) => {
      return Prayer.findById(response.id)
        .populate('author')
        .then((prayer) => {
          res.status(201).json(prayer);
        });
    })
    .catch(err => {
      next(err);
    });

});


router.put('/prequests/:id', (req,res,next) => {
  const {id} = req.params;
  const updateObj = {};
  const updateableFields = ['title','requestbody'];

  updateableFields.forEach((field) => {
    if (field in req.body) {
      updateObj[field] = convertUrl(req.body[field]);
    }
  });

  Prayer.findByIdAndUpdate(id,updateObj, {new:true})
    .then((response) => {
      if (response === null) {
        const err = new Error('Prayer request with this ID could not be found');
        err.status = 404;
        return next(err);
      }
      return Prayer.findById(response.id)
        .populate('author')
        .then((prayer) => {
          res.status(201).json(prayer);
        });
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


router.delete('/prequests/:id', (req,res,next) => {
  const {id} =req.params;

  Prayer.findByIdAndRemove(id)
    .then((response) => {
      if (response === null) {
        const err = new Error('Prayer request with this ID could not be found');
        err.status = 404;
        return next(err);
      }
      res.status(204).end();
    });
});


// COMMENT ROUTES

router.put('/prequests/comments/:id', (req,res,next) => {
  const {id} = req.params;
  const {message} = req.body;
  
  if (!message) {
    const err = new Error('Missing Message Field');
    err.status = 400;
    return next(err);
  }

  Prayer.findByIdAndUpdate(id, {$push: {'comments':{'message':message, author:'Evan Garrett', created:Date.now()}}}, {new:true})
    .then(response => {
      if (response === null) {
        const err = new Error('The Prayer Request with this ID could not be found');
        err.status = 404;
        return next(err);
      }
      res.status(200).json(response);
    })
    .catch(next);

});

module.exports = router;




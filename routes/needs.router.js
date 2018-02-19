const express = require('express');
const router = express.Router();
const Need = require('../models/need.model');


//===========GET ROUTE==========================================>

router.get('/needs', (req,res,next) => {
  Need.find()
    .sort({created:-1})
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      next(err);
    });
});


//================GET BY ID ROUTE==================================>

router.get('/needs/:id', (req,res,next) => {
  const {id} = req.params;
  
  Need.findById(id)
    .then(response => {
      if (response === null) {
        const err = new Error('Post with this ID could not be found');
        err.status = 404;
        return next(err);
      }
      res.json(response);
    })
    .catch(err => {
      next(err);
    });
});

//================================= CREATE ROUTE=======================>
router.post('/needs/', (req,res,next) => {
  const requiredField = ['title','body'];
  const newPost = {};
  requiredField.forEach((field) => {
    if (!(field in req.body)) {
      const err = new Error(`Missing ${field} field`);
      err.status = 400;
      return next(err);
    }
    newPost[field] = req.body[field];
  });

  Need.create(newPost)
    .then(response => {
      res.status(201).json(response);
    })
    .catch(next);

});


router.put('/needs/:id', (req,res,next) => {
  const {id} = req.params;
  const updateableFields = ['title','body'];
  const updateObj = {};

  updateableFields.forEach(field => {
    if (field in req.body) {
      updateObj[field] = req.body[field];
    }
  });
  
  Need.findByIdAndUpdate(id,updateObj, {new:true})
    .then(response => {
      if (response === null) {
        const err = new Error('Post with this ID could not be found');
        err.status = 404;
        return next(err);
      }
      res.status(201).json(response);
    })
    .catch(next);

});

router.delete('/needs/:id', (req,res,next) => {
  const {id} = req.params;

  Need.findByIdAndRemove(id)
    .then(response => {
      if (response === null) {
        const err = new Error('Post with this ID could not be found');
        err.status = 404;
        return next(err);
      }
      res.status(204).end();
    });
});

router.put('/needs/comments/:id', (req,res,next) => {
  const {id} = req.params;
  const comment = {
    body:req.body.body,
    author:'Jimmy Thorton',
    created: Date.now()
  };

  if (!comment.body) {
    const err = new Error('Missing Comment Message');
    err.status = 400;
    return next(err);
  }

  Need.findByIdAndUpdate(id, {$push: {comments: comment}}, {new:true})
    .then(response => {
      res.status(201).json(response);
    })
    .catch(next);
});


module.exports = router;
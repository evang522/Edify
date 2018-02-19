const mongoose = require('mongoose');

const IndividualNeedSchema = new mongoose.Schema({
  title: {
    type:String,
    required:true
  },
  body: {
    type:String,
    required:true
  },
  archived: {
    type:Boolean,
    default:false
  },
  author: {
    type:String,
    default:'Jim Bob',
  },
  comments: [],
  created: {
    type: Date,
    default: Date.now
  }
});


IndividualNeedSchema.set('toObject', {

  transform: function (doc,ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});



module.exports = mongoose.model('Individualneeds', IndividualNeedSchema);

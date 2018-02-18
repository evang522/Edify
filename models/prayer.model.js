const mongoose = require('mongoose');

const prayerSchema = new mongoose.Schema({
  title: {
    type:String,
    unique:true,
    default:'New Prayer Request',
    index:true
  },
  archived: {
    type:Boolean,
    default:false
  },
  status: {
    type:String,
    enum: ['Standing','Answered'],
  },
  requestbody: {
    type:String,
    required:true,
    index:true
  },
  created: {
    type:Date,
    default:Date.now
  },
  author: {
    type:String,
    default:'Evan Garrett'
  },
  comments: {
    type:Array,
    default:[]
  }
});

prayerSchema.set('autoindex', false);

prayerSchema.set('toObject', {

  transform: function (doc,ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});


module.exports = mongoose.model('prequest', prayerSchema);
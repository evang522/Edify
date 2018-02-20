const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  body: {
    type:String,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'User',
    default:'000000000000000000000002'
  },
  created: {
    type:Date,
    default: Date.now
  }
});


const NeedSchema = new mongoose.Schema({
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
    type: mongoose.Schema.Types.ObjectId,
    ref:'User',
    default:'000000000000000000000000'
  },
  comments: [commentSchema],
  created: {
    type: Date,
    default: Date.now
  }
});


NeedSchema.set('toObject', {

  transform: function (doc,ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});



module.exports = mongoose.model('needs', NeedSchema);

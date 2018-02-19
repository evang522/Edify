// User Schema


const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
  name: {
    type:String,
    required:true,
    unique:true
  },
  email: {
    type:String,
    required:true,
    unique:true
  },
  password: {
    type:String,
  },
  created: {
    type:Date,
    default:Date.now
  }

});

UserSchema.set('toObject', {
  transform: function (doc,ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});


module.exports = mongoose.model('User', UserSchema);
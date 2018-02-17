const mongoose = require('mongoose');

const prayerSchema = mongoose.Schema({
    title: {
        type:String,
        unique:true,
        default:'New Prayer Request'
    },
    archived: {
        type:Boolean,
        default:false
    },
    status: {
        enum: ['Standing','Answered'],
    },
    requestbody: {
        type:String,
        required:true
    },
    author: {
        type:String
    }
});

module.exports = mongoose.model('prequest', prayerSchema);
const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    image:{
        data:Buffer,
        contentType:String
    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    fullname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
  });
const UserModel = mongoose.model('User', userSchema, 'Users');
module.exports = UserModel;
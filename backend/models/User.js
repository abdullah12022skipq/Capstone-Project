const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  image: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  fullname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  stories: [{
    type: Schema.Types.ObjectId,
    ref: 'Story'
  }]
});

const UserModel = mongoose.model('User', userSchema, 'Users');
module.exports = UserModel;

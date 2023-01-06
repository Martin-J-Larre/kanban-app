const mongoose = require('mongoose');
const { schemaOptions } = require('./optionsModel');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String,
    require: true,
    select: false
  }
}, schemaOptions );

module.exports = mongoose.model('User', UserSchema);
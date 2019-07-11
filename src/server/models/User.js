const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Items
const User = new Schema({
  name: {
    type: String
  },
  login: {
      type: String,
      unique: true
  },
  password: {
    type: String
  },
  score: {
      type: Number
  },
  level: {
    type: Number
  },
  toys: {
      type: Number
  }
},{
    collection: 'users'
});

module.exports = mongoose.model('User', User);

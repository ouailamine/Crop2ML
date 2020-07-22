var mongoose = require('mongoose');
var UserAuthSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  }, 
  
  role: {
    type: String,
    required: true,
  },

  passwordRequire: {
    type: Number,
    required: true,
  }
});
var UserAuth = mongoose.model('crop_user_auth', UserAuthSchema);
module.exports = UserAuth;
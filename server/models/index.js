const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.model = require("./model.model");
db.userAuth = require("./userAuth.model");


module.exports = db;
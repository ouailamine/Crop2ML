var mongoose = require('mongoose');
var ModelSchema = new mongoose.Schema({
  titre: {
    type: String,
    //unique: true,
    required: true,
    //trim: true
  },
  auteur: {
    type: String,
    required: true,
    
  },
  mail: {
    type: String,
    required: true,
    
  },
  details: {
    type: String,
    required: true,
   
  },
  publie: {
    type: Boolean,
    required: true,
    
  },
  
  
});
var Model = mongoose.model('crop_Model', ModelSchema);
module.exports = Model;
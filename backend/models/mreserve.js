// init code
const mongoose = require('mongoose');

// user schema
const reserveSchema = mongoose.Schema({
  name: {
    type : String,
    required : true
  },
  email: {
    type : String,
    required : true,
  },
  phone:{
    type : String,
    required : true
  },
  facility:{
    type : String,
    required : true
  },
  address:{
    type : String,
    required : true
  },

});


// user model
mongoose.model('reservation',reserveSchema);


// module exports
module.exports = mongoose.model('reservation');

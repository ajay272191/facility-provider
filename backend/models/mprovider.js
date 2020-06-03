// init code
const mongoose = require('mongoose');

// user schema
const providerSchema = mongoose.Schema({
  name : {
    type : String,
    required : true
  },
   phone: {
    type : String,
    required : true
  },
  email : {
    type : String,
    required : true,
    unique : true
  },
  password : {
    type : String,
    required : true
  },
  facility : {
    type : String,
    required : true
  },
  address : {
    type : String,
    required : true
  },
  isActive : {
    type : Boolean,
    default : true
  },
  joinedOn: {
    type : Date,
    default : Date.now()
  }
});


// user model
mongoose.model('provider',providerSchema);


// module exports
module.exports = {
  provider : mongoose.model('provider'),
  customerSchema: providerSchema
}
//module.exports = mongoose.model('customers');

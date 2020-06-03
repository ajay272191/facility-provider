// init code
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const local_port = 8080;
//const hosted_port = process.env.PORT;
const database = require('./models/dbconnection');
const providerController = require('./controllers/cprovider');
const reserveController = require('./controllers/creserve');



// middleware setup
app.use(morgan('dev'));
app.use(cors());
app.use('/api/provider', providerController);
app.use('/api/reserve',reserveController);
// defaults routes
app.all(
  '/',
  function(req, res){
    return res.json({
      status: 200,
      message: "index page working"
    })
  }
);

// start server
app.listen(
  //hosted_port || local_port,
  local_port,
  function(){
    console.log('Server running at port : ' + local_port)// + ' or ' + hosted_port );
  }
);

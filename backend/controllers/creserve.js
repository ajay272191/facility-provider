// init code
const https = require('http');
const router = require('express').Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const booking = require('./../models/mreserve');
// const car = require('./../models/mcar').cars;
// const customer = require('./../models/mcustomer').customers;

// middleware setup
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// routes goes here

// create new reservation route
router.post(
  '/',
  [
    // details validation
    check('name').not().isEmpty().trim().escape(),
    check('phone').not().isEmpty().trim().escape(),
    check('address').not().isEmpty().trim().escape(),
    check('facility').not().isEmpty().trim().escape(),
    check('email').isEmail().normalizeEmail()
    ],
  function (req, res) {
    // check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        status: false,
        message: 'Form validation error.',
        errors: errors.array()
      });
    }
    // create new use model
    var temp = new booking({
      name : req.body.name,
      email : req.body.email,
      phone : req.body.phone,
      address : req.body.address,
      facility : req.body.facility
      });
      temp.save(function (error, result) {
        // check error
        if (error) {
          return res.json({
            status: false,
            message: 'DB Insert Fail...',
            error: error
          });
        }
        // Everything OK
        return res.json({
          status: true,
          message: 'DB Insert Success...',
          result: result
        });
      });
  }
);

// find book document route
router.get(
  '/one',
  function (req, res) {
    // find book document
    var phoneNumber = req.body.phone;
    booking.findOne({phone : req.body.phone }, function (error, result) {
      // check error
      if (error) {
        return res.json({
          status: false,
          message: 'DB Find Fail...',
          error: error
        });
      }
      if(result == null){
        return res.json({
          phone:phoneNumber,
          status: 404,
          message: 'no data avalaible',
          result: result
        });
      }
      // if everything OK
      return res.json({
        status: true,
        message: 'DB Find Success...',
        result: result
      });
    });
  }
);
router.get(
  '/',
  function (req, res) {
    // find book document
    booking.find({}, function (error, result) {
      // check error
      if (error) {
        return res.json({
          status: false,
          message: 'DB Find Fail...',
          error: error
        });
      }
      if(result == null){
        return res.json({
          status: 404,
          message: 'no data avalaible',
          result: result
        });
      }
      // if everything OK
      return res.send(result);
    });
  }
);

// remove car document
router.delete(
  '/',
  function(req, res){
    // check email not empty
    if ( req.body.phone){

          // delete car document
          booking.findOneAndRemove(
            {phone: req.body.phone},
            function(error, result){
              // check error
              if (error){
                return res.json({
                  status : false,
                  message : 'DB Delete Fail...',
                  error : error
                });
              }
              if (result   == null) {
                return res.json({
                  message : 'no data avalaible releted to given phone number'
                })
              }
              // everything OK
              return res.json({
                status : true,
                message : 'DB Delete Success...',
                result : result
              });
          });
  }else {
    return res.json({
      message : 'phone number required to perform this operation',
    });
  }
});

// module exports
module.exports = router;

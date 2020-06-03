// init code
const router = require('express').Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const provider = require('./../models/mprovider').provider;


// middleware setup
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// routes goes here

// default route
// create new provider route
router.post(
  '/',
  [
    // check not empty fields
    check('name').not().isEmpty().trim().escape(),
    check('phone').not().isEmpty().trim().escape(),
    check('email').isEmail().normalizeEmail(),
    check('address').not().isEmpty().trim().escape(),
    check('password').not().isEmpty().trim().escape(),
    check('facility').not().isEmpty().trim().escape()
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

    // hash password code
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);

    // create new use model
    var temp = new provider({
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      password: hashedPassword,
      facility: req.body.facility,
      address: req.body.address
    });

    // insert data into database
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

// find provider document route
router.get(
  '/',
  function (req, res) {
    if(req.body.phone){
      // find provider document
      provider.findOne({phone: req.body.phone}, function (error, result) {
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
            message : 'provider with provided phone number does\'nt exist '
          })
        }
        // if everything OK
        return res.json({
          status: true,
          message: 'DB Find Success...',
          result: result
        });
      });
    }else {
      return res.json({
        status: false,
        message: 'phone number not privided'
      })
    }
  }
);

// update provider document
router.put(
  '/',
  function (req, res) {
    
    if (req.body.phone && req.body.newPhone) {
      // update provider document
      provider.findOneAndUpdate(
        {phone : req.body.phone},
        { phone: req.body.newPhone},
        function (error, result) {
          // check error
          if (error) {
            return res.json({
              status: false,
              message: 'DB Update Fail...',
              error: error
            });
          }
          if(result == null){
            return res.json({
              message : 'cant update : provider with provided phone number does\'nt exist '
            })
          }
          // if everything OK
          return res.json({
            status: true,
            message: 'DB Update Success...',
            result: result
          });
        }
      );
    } else {
      return res.json({
        status : false,
        message : 'phoneNumbers not provided...'
      });
    }
  }
);

// remove provider document
router.delete(
  '/',
  function(req, res){
    // check email not empty
    if ( req.body.phone){
      provider.findOneAndRemove(
        //{ _id : req.params.id },
        {phone:req.body.phone},
        function(error, result){
          // check error
          if (error){
            return res.json({
              status : false,
              message : 'DB Delete Fail...',
              error : error
            });
          }
          //not found
          if(result == null){
            return res.json({
              message : 'details with this phone not exist : can\'t be deleted  '
            })
          }
          // everything OK
          return res.json({
            status : true,
            message : 'DB Delete Success...',
            result : result
          });
        }
      );
    } else {
      // if email not provided
      return res.json({
        status : false,
        message : 'phoneNumber not provided.'
      });
    }
  }
);

// login router for provider
router.post(
  '/login',
  [
    // check not empty fields
    check('password').not().isEmpty().trim().escape(),
    check('email').isEmail().normalizeEmail()
  ],
  function(req, res){
    // check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        status: false,
        message: 'Form validation error.',
        errors: errors.array()
      });
    }

    // check email exist or not
    provider.findOne(
      { email : req.body.email },
      function(error, result){
        // check error
        if (error){
          return res.json({
            status : false,
            message : 'DB Read Fail...',
            error : error
          });
        }

        // result is empty or not
        if ( result ){
          // when result variable contains document
          // match password
          const isMatch = bcrypt.compareSync(req.body.password, result.password);
          console.log(isMatch);
          // check password is match
          if (isMatch){
            // password matched
            return res.json({
              status : true,
              message : 'provider exists. Login Success...',
              result : result
            });
          } else {
            // password not matched
            return res.json({
              status : false,
              message : 'Password not matched. Login Fail...',
            });
          }
        } else {
          // provider document don't exists
          return res.json({
            status : false,
            message : 'provider don\'t exists.'
          });
        }

      }
    );
  }
);

// module exports
module.exports = router;

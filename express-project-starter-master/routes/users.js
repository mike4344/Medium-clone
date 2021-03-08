var express = require('express');
var router = express.Router();

const { check, validationResult } = require('express-validator')
const { csrfProtection, asyncHandler } = require('./utils')
const bcrypt = require('bcryptjs')

const db = require('../db/models')

//logged in/logged out functionality

/* GET users listing. */

//Login routes
router.get('/login', function(req, res, next) {
  
});

router.post('/login', function(req, res, next) {
  
});

router.get('/signup', csrfProtection, function(req, res, next) {
  //Make a blank user
  
  //render form


});

//validator array

router.post('/signup', csrfProtection, asynchHandler(async (req, res, next) => {
  //destructure form data from req

  //build user

  //check error

  //Hash password, store on user object
  //save
}));




module.exports = router;

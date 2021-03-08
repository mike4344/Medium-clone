var express = require('express');
var router = express.Router();

const { check, validationResult } = require('express-validator')
const { csrfProtection, asyncHandler } = require('./utils')
const bcrypt = require('bcryptjs')

const db = require('../db/models')

//logged in/logged out functionality

/* GET users listing. */

//Login routes


router.get('/', csrfProtection, asyncHandler(async(req, res, next) => {
  //Make a blank user
  const user = db.User.build()
  //render form
  res.render('signup', {
    title: 'Signup',
    user,
    csrfToken: req.csrfToken()
  })


}));

//validator array

router.post('/', csrfProtection, asyncHandler(async (req, res, next) => {
  //destructure form data from req

  //build user

  //check error

  //Hash password, store on user object
  //save
}));




module.exports = router;

var express = require('express');
var router = express.Router();

const { check, validationResult } = require('express-validator')
const { csrfProtection, asyncHandler, userValidators } = require('./utils')
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


router.post('/', csrfProtection, userValidators, asyncHandler(async (req, res, next) => {
  //destructure form data from req
  const { emailAddress, screenName, password } = req.body;
  //build user
  const user = db.User.build({
    emailAddress,
    screenName
  });
  //check error
  const validatorErrors = validationResult(req);
  //Hash password, store on user object
  if (validatorErrors.isEmpty()) {
    const hashedPassword = await bcrypt.hash(password, 10);
    user.hashedPassword = hashedPassword;
    await user.save();
    loginUser(req, res, user)
    res.redirect(`/users/${user.id}`)

  } else {
    const errors = validatorErrors.array().map((error) => error.msg);
    res.render('signup', {
      title: 'Signup',
      user,
      errors,
      csrfToken: req.csrfToken()
    })
  }
  //save
}));




module.exports = router;

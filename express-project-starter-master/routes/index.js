var express = require('express');
var router = express.Router();
const { logoutUser } = require('../auth')

const db = require("../db/models");
const { csrfProtection, asyncHandler } = require("./utils");

/* GET home page. */
router.get('/', asyncHandler( async(req, res, next)=> {
  const stories = await db.Story.findAll()
  const users = await db.User.findAll()
  let loggedInUser = null;
  if(req.session.auth){
    loggedInUser = await db.User.findByPk(req.session.auth.userId)
  }
  res.render('temp-home', { title: 'Animedium', stories, users, loggedInUser });
}));

router.get('/logout', asyncHandler( async (req, res) => {
  if(req.session.auth){
    logoutUser(req)
  }
  res.redirect('/')
}))

module.exports = router;

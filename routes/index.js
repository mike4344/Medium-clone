var express = require('express');
var router = express.Router();
const { logoutUser } = require('../auth')

const db = require("../db/models");
const { requireAuth } = require("../auth");
const { csrfProtection, asyncHandler } = require("./utils");
const convertDate = (timestamp) => timestamp.toString().slice(0, 16);
const { Sequelize } = require("../db/models");
const Op = Sequelize.Op;

//working toward the official homepage.
router.get('/homepage', requireAuth, asyncHandler( async(req, res, next) => {
  const stories = await db.Story.findAll({
    include: db.User,
  });
  const users = await db.User.findAll();
  const sortedUsers = users.sort();
  // const topWriters = await db.User.findAll()
  //this is an idea to show off the writers who have written the most stories or have the most likes.

  //want to find 5 most recently written stories and display them.
  const recentStories = await db.Story.findAll({
    limit: 5,
    order: [["createdAt", "asc"]],
    include: db.User,
  });
  const randomStories = await db.Story.findAll({
    limit: 5,
    order: Sequelize.literal('random()'),
    include: db.User,
  })

  let loggedInUser = null;
  if (req.session.auth) {
    loggedInUser = await db.User.findByPk(req.session.auth.userId);
  }

  res.render('homepage', {title: "ANIMEDIUM!", stories, users, sortedUsers, recentStories, loggedInUser, randomStories, convertDate })
}))


/* GET home page. */
router.get('/', asyncHandler( async(req, res, next)=> {
  const stories = await db.Story.findAll()
  const users = await db.User.findAll()
  let loggedInUser = null;
  if(req.session.auth){
    loggedInUser = await db.User.findByPk(req.session.auth.userId)
  }
  if(loggedInUser){
    res.redirect('/homepage')
  }
  res.render('splash', { title: 'Home', stories, users, loggedInUser });
}));

router.get('/logout', asyncHandler( async (req, res) => {
  if(req.session.auth){
    logoutUser(req)
  }
  res.redirect('/login')
}))

module.exports = router;

var express = require('express');
var router = express.Router();
const { logoutUser } = require('../auth')

const db = require("../db/models");
const { csrfProtection, asyncHandler } = require("./utils");
const convertDate = (timestamp) => timestamp.toString().slice(0, 16);

const grabUser = async (id) => {
  const user = await db.User.findByPk(id);
  return user;
}

//working toward the official homepage.
router.get('/homepage', asyncHandler( async(req, res, next) => {
  const stories = await db.Story.findAll({
    include: db.User,
  });
  const users = await db.User.findAll();
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
    //randomize
  })
  // const likedStories = await db.Story.findAll({
  //   include: [{
  //     model: Likes
  //   }],
  //   limit: 5,

  // })

  let loggedInUser = null;
  if (req.session.auth) {
    loggedInUser = await db.User.findByPk(req.session.auth.userId);
  }

  res.render('homepage', {title: "ANIMEDIUM!", stories, users, recentStories, loggedInUser, convertDate, grabUser })
}))


/* GET home page. */
router.get('/', asyncHandler( async(req, res, next)=> {
  const stories = await db.Story.findAll()
  const users = await db.User.findAll()
  let loggedInUser = null;
  if(req.session.auth){
    loggedInUser = await db.User.findByPk(req.session.auth.userId)
  }
  res.render('temp-home', { title: 'Home', stories, users, loggedInUser });
}));

router.get('/logout', asyncHandler( async (req, res) => {
  if(req.session.auth){
    logoutUser(req)
  }
  res.redirect('/')
}))

module.exports = router;

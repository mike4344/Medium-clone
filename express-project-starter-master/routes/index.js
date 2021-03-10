var express = require('express');
var router = express.Router();

const db = require("../db/models");
const { csrfProtection, asyncHandler } = require("./utils");

/* GET home page. */
router.get('/', asyncHandler( async(req, res, next)=> {
  const stories = await db.Story.findAll()
  const users = await db.User.findAll()
  res.render('temp-home', { title: 'Animedium', stories, users });
}));

module.exports = router;

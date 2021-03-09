var express = require("express");
var router = express.Router();

const { check, validationResult } = require("express-validator");
const { csrfProtection, asyncHandler, userValidators } = require("./utils");

const db = require("../db/models");
const { requireAuth } = require("../auth");

router.get('/create', requireAuth, csrfProtection, (req, res) => {
    //make a blank story for the form
    const story = db.Story.build();
    const userId = req.session.auth.userId
    //supply pug story creation template
    res.render('story-create', {
        title: 'Write Your Story!',
        story,
        userId,
        csrfToken: req.csrfToken()
    })
})

//here we need some story post validation

router.post('/create', requireAuth, csrfProtection, asyncHandler(async(req, res) => {

}))


module.exports = router;
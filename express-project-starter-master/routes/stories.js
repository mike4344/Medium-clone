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
    res.render('stories-create', {
        title: 'Write Your Story!',
        story,
        userId,
        csrfToken: req.csrfToken()
    })
})

//here we need some story post validation
const storyValidators = [
    check('title')
        .exists({ checkFalsy:true }) 
        .withMessage('Please provide a title')
        .isLength({ max:100 })
        .withMessage('Title should be less than 100 characters'),
    check('subtitle')
        .isLength({ max:255 })
        .withMessage('Subtitle should be less than 255 characters'),
    check('pictureURL')
    //MAYBE -- add regex to check URL
        .isLength({ max:255 })
        .withMessage('Picture URL should be less than 255 characters'),
    check('body')
        .exists({ checkFalsy: true })
        .withMessage('Body content required!'),
]

router.post('/create', requireAuth, csrfProtection, storyValidators, asyncHandler(async(req, res) => {
    //Deconstruct form inputs
    const { title, subtitle, pictureURL, body, userId } = req.body
    //create new story
    const story = await db.Story.create({
        title, subtitle, pictureURL, body, userId
    })
    res.redirect(`/stories/${story.id}`);
}))

router.get('/:storyId(\\d+)', asyncHandler(async (req, res, next) => {
    //grab id from the url
    const storyId = parseInt(req.params.storyId, 10);
    //grab the story from the database
    const story = await db.Story.findByPk(storyId, {
        include:  'User' 
    });

    let currentUserId = null;

    if(req.session.auth) {
        currentUserId = req.session.auth.userId;
    }
        //Renders story
        res.render('stories-display', { 
            title: story.title, 
            story,
            currentUserId
        })
        
}))


module.exports = router;
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
    if (story){

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
    } else {
        res.render('story-doesnotexist', {
            title: 'Oops!'
        })
    }

}))

router.get('/:storyId(\\d+)/edit', requireAuth, csrfProtection, asyncHandler(async (req, res, next) => {
    const storyId = parseInt(req.params.storyId, 10)
    const story = await db.Story.findByPk(storyId)
    if(story.userId === req.session.auth.userId){

        res.render('stories-edit', {
            title: 'Edit story',
            story,
            csrfToken: req.csrfToken()
        })
    } else {
        res.redirect(`/stories/${storyId}`)
    }
}))

router.post('/:storyId(\\d+)/edit', requireAuth, csrfProtection, storyValidators, asyncHandler(async (req, res , next) =>{
    const storyId = parseInt(req.params.storyId, 10)
    const story = await db.Story.findByPk(storyId)
    if(story.userId === req.session.auth.userId){
        const {title, subtitle, pictureURL, body} = req.body
        const updatedStory = {
            title,
            subtitle,
            pictureURL,
            body
        }
        const validatorErrors = validationResult(req);
        if(validatorErrors.isEmpty()){
            await story.update(updatedStory)
            res.redirect(`/stories/${storyId}`)
        } else {
            const errors = validatorErrors.array().map((error) => error.msg);
            res.render('stories-edit', {
                title: 'Edit Story',
                story,
                errors,
                csrfToken: req.csrfToken()
            })
        }
    } else {
        res.redirect(`/stories/${storyId}`)
    }
}))

router.get('/:storyId(\\d+)/delete', requireAuth, csrfProtection, asyncHandler(async (req, res, next)=>{
    const storyId = parseInt(req.params.storyId, 10)
    const story = await db.Story.findByPk(storyId)
    res.render('stories-delete', {
        title: 'Delete Story',
        story,
        csrfToken: req.csrfToken()
    })
}))

router.post('/:storyId(\\d+)/delete', requireAuth, csrfProtection, asyncHandler(async (req, res, next)=>{
    const storyId = parseInt(req.params.storyId, 10)
    const story = await db.Story.findByPk(storyId)
    console.log('we are here')
    if(story.userId === req.session.auth.userId){
        await story.destroy()
        res.redirect('/')
    } else {
       res.redirect(`/stories/${storyId}`)
    }
}))


module.exports = router;
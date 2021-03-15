const express = require("express");
const router = express.Router();

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

const updateValidators = [
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

    const story = await db.Story.build({
        title, subtitle, pictureURL, body, userId
    })

    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
        await story.save()
        res.redirect(`/stories/${story.id}`)
    } else {
        const errors = validatorErrors.array().map((error) => error.msg);
        res.render('stories-create', {
            title: 'Create Story',
            story,
            userId,
            errors,
            csrfToken: req.csrfToken()
        })

    }
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
        let currentUserStoryLike = null;
        let currentUser = null;

        let likeCount = await db.StoryLike.findAndCountAll({
            where: {
                storyId: storyId
            }
        })
        console.log(likeCount.count)
        if(req.session.auth) {
            currentUserId = req.session.auth.userId;
            currentUser = await db.User.findByPk(currentUserId)

            const storyLike = await db.StoryLike.findOne({
                where: {
                    storyId: storyId,
                    userId: currentUserId,
                }
            })
            if(storyLike){
                currentUserStoryLike = storyLike;
            }
        }
        //Renders story
        res.render('stories-display', {
            title: story.title,
            story,
            currentUserStoryLike,
            currentUserId,
            currentUser,
            likeCount: likeCount.count
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
    if (story){


    if(story.userId === req.session.auth.userId){

        res.render('stories-edit', {
            title: 'Edit story',
            story,
            csrfToken: req.csrfToken()
        })
    } else {
        res.redirect(`/stories/${storyId}`)
    }
} else {
    res.render('story-doesnotexist', {
        title: 'Oops!'
    })

}}))


router.post('/:storyId(\\d+)/edit', requireAuth, csrfProtection, updateValidators, asyncHandler(async (req, res , next) =>{
    const storyId = parseInt(req.params.storyId, 10)
    const story = await db.Story.findByPk(storyId)
    if(story.userId === req.session.auth.userId){
        const {subtitle, pictureURL, body} = req.body
        const updatedStory = {
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
    if (story){
        if(story.userId != req.session.auth.userId){
            res.redirect(`/stories/${storyId}`);
        }


        res.render('stories-delete', {
            title: 'Delete Story',
            story,
            csrfToken: req.csrfToken()
        })
    } else {
        res.render('story-doesnotexist', {
            title: 'Oops!'
        })

}}))


router.post('/:storyId(\\d+)/delete', requireAuth, csrfProtection, asyncHandler(async (req, res, next)=>{
    const storyId = parseInt(req.params.storyId, 10)
    const story = await db.Story.findByPk(storyId)
    if(story.userId === req.session.auth.userId){

    const comments = await db.Comment.findAll({
        where: {
            'storyId': storyId
        },
    })

    const likes = await db.StoryLike.findAll({
        where: {
            'storyId': storyId
        }
    })

        comments.forEach(async comment => {

            const likes = await db.CommentLike.findAll({
                where: {
                    'commentId': comment.id
                }
            })
            likes.forEach(async like => {
                await like.destroy();
            }) 

            await comment.destroy();
        })
        
        likes.forEach(async like => {
            await like.destroy();
        })

        await story.destroy()
        res.redirect('/')
    } else {
       res.redirect(`/stories/${storyId}`)
    }
}))


module.exports = router;

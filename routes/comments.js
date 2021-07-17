const express = require("express");
const router = express.Router();

const { check, validationResult } = require("express-validator");
const { csrfProtection, asyncHandler } = require("./utils");

const db = require("../db/models");
const { requireAuth } = require("../auth");

const commentValidator = [
    check('body')
        .exists({ checkFalsy: true })
        .withMessage('Please enter a comment')
]


router.post('/stories/:storyId(\\d+)/comments', requireAuth, commentValidator, asyncHandler(async (req, res) => {
    const { body, userId, storyId } = req.body;
    // console.log(req);

    const comment = await db.Comment.build({
        body, userId, storyId
    })

    const validatorErrors = validationResult(req);

    if(validatorErrors.isEmpty()){
        await comment.save();
        res.json(comment);
    } else {
        const errors = validatorErrors.array().map((error) => error.msg);
        res.json(errors);
    }

}))

router.get('/stories/:storyId(\\d+)/comments', asyncHandler( async (req, res) => {
    const storyId = parseInt(req.params.storyId, 10);
    const comments = await db.Comment.findAll({
        where: {
            storyId: storyId,
        },
        order: [['createdAt', 'DESC']],
        include: db.User
    })
    await res.json(comments);
}))

router.get('/stories/:storyId(\\d+)/comments/:commentId(\\d+)/edit', requireAuth, csrfProtection, asyncHandler(async (req, res, next) => {

    const storyId = parseInt(req.params.storyId, 10);
    const commentId = parseInt(req.params.commentId, 10);
    //grab user from the database
    const story = await db.Story.findByPk(storyId);
    const comment = await db.Comment.findByPk(commentId);
    
    if (comment.userId === req.session.auth.userId) {
        let currentUserId = req.session.auth.userId;
        res.render('comments-edit', {
            title: 'Edit Comment',
            comment,
            story,
            currentUserId,
            csrfToken: req.csrfToken()
        })
    } else {
        res.redirect(`/stories/${storyId}`);
    }
}))

router.post('/stories/:storyId(\\d+)/comments/:commentId(\\d+)/edit', requireAuth, commentValidator, csrfProtection, asyncHandler(async (req, res, next) => {

    const storyId = parseInt(req.params.storyId, 10);
    const commentId = parseInt(req.params.commentId, 10);
    //grab user from the database
    const comment = await db.Comment.findByPk(commentId);
    const story = await db.Story.findByPk(storyId);

    if (comment.userId === req.session.auth.userId) {
        const { body } = req.body;

        const updatedReview = {
            body
        };

        const validatorErrors = validationResult(req);

        if (validatorErrors.isEmpty()) {
            await comment.update(updatedReview)
            res.redirect(`/stories/${storyId}`)
        } else {
            let currentUserId = req.session.auth.userId;
            const errors = validatorErrors.array().map((error) => error.msg);
            res.render('comments-edit', {
                title: 'Edit Comment',
                comment,
                story,
                currentUserId,
                errors,
                csrfToken: req.csrfToken()
            })
        }
    } else {
        res.redirect(`/stories/${storyId}`)
    }
}))

router.post('/stories/:storyId(\\d+)/comments/:commentId(\\d+)/delete', requireAuth, csrfProtection, asyncHandler(async (req, res, next) => {

    const storyId = parseInt(req.params.storyId, 10);
    const commentId = parseInt(req.params.commentId, 10);
    //grab user from the database
    const comment = await db.Comment.findByPk(commentId);
    const story = await db.Story.findByPk(storyId);

    if (comment.userId === req.session.auth.userId) {
        await comment.destroy()
        res.redirect(`/stories/${storyId}`)

    } else {
        res.redirect(`/stories/${storyId}`)
    }
}))

module.exports = router;
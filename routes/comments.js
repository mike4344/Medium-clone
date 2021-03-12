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
    console.log(req);

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
        include: db.User
    })
    await res.json(comments);
}))


module.exports = router;
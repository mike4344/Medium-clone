const express = require('express');
const router = express.Router();

const db = require("../db/models");
const { requireAuth } = require("../auth");

const { asyncHandler } = require("./utils");

router.post('/comments/:commentId(\\d+)/likes', requireAuth, asyncHandler(async(req, res) => {
    const commentId = parseInt(req.params.commentId, 10);
    const currentUserId = req.session.auth.userId;

    const like = await db.CommentLike.findOne({
        where: {
            commentId: commentId,
            userId: currentUserId
        }
    })
    if(!like){
        await db.CommentLike.create({
            commentId: commentId,
            userId: currentUserId
        })
    }else{
        await like.destroy();
    }
}))

//like number query for comments
router.get('/comments/:commentId(\\d+)/likes', asyncHandler(async(req, res) => {
    const commentId = parseInt(req.params.commentId, 10)
    const likes = await db.CommentLike.findAndCountAll({
        where: {
            commentId: commentId
        }
    })
    await res.json(likes);
}))

//Has current user liked this particular comment
router.get('/comments/:commentId(\\d+)/current-user', asyncHandler(async(req, res) =>{
    if(req.session.auth){
        const commentId = parseInt(req.params.commentId, 10)
        const userId = req.session.auth.userId
        const like = await db.CommentLike.findOne({ 
            where: { 
                commentId: commentId,
                userId: userId
            }
        })
       await res.json(like)
    }
}))

module.exports = router;
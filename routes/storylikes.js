const express = require('express');
const router = express.Router();

const db = require("../db/models");
const { requireAuth } = require("../auth");

const { asyncHandler } = require("./utils");

router.post('/stories/:storyId(\\d+)/likes', requireAuth, asyncHandler(async (req, res) => {
    const storyId = parseInt(req.params.storyId, 10);
    const currentUserId = req.session.auth.userId;
    
    const like = await db.StoryLike.findOne({
        where: {
            storyId: storyId,
            userId: currentUserId
        }
    })
    if(!like){
        await db.StoryLike.create({
            storyId: storyId,
            userId: currentUserId
        })
    }else{
        await like.destroy();
    }
}))



module.exports = router;
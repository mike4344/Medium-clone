var express = require("express");
var router = express.Router();
const db = require('../db/models');
const { Sequelize }  = require('../db/models');
const Op = Sequelize.Op;

const { check, validationResult } = require("express-validator");
const { csrfProtection, asyncHandler, userValidators } = require("./utils");

const { requireAuth } = require("../auth");


router.get('/:userId(\\d+)', asyncHandler(async(req, res, next) => {
    //grabbing id from url
    const userId = parseInt(req.params.userId, 10);
    // console.log(db)
    //grab user from the database
    const user = await db.User.findByPk(userId);
    //grab stories of user from the database
    console.log("1", Op)
    console.log("2", Sequelize)
    const userStories = await db.Story.findAll({
        where: {
            userId: { [Op.eq]: user.id }
        }
    });

    let currentUserId = null;

    if (req.session.auth) {
        currentUserId = req.session.auth.userId;
    }

    res.render('profiles-display', {
        title: `${user.screenName}\'s Profile`,
        user,
        userStories,
        currentUserId
    })

}));


module.exports = router;
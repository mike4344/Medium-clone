var express = require("express");
var router = express.Router();
const db = require('../db/models');
const { Sequelize }  = require('../db/models');
const Op = Sequelize.Op;

const { check, validationResult } = require("express-validator");
const { csrfProtection, asyncHandler, userValidators } = require("./utils");

const { requireAuth } = require("../auth");

const convertDate = (timestamp) => timestamp.toString().slice(0, 16);
    

router.get('/:userId(\\d+)', requireAuth, asyncHandler(async(req, res, next) => {
    //grabbing id from url
    const userId = parseInt(req.params.userId, 10);
    // console.log(db)
    //grab user from the database
    const user = await db.User.findByPk(userId);
    //grab stories of user from the database
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
        convertDate,
        currentUserId
    })

}));

router.get('/currentUser', asyncHandler(async(req, res) => {
    let currentUserId = null;

    if (req.session.auth) {
        currentUserId = req.session.auth.userId;
    }

    res.json(currentUserId)
}))

const profileValidators = [
    check('screenName')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a value for the Screen Name.')
        .isLength({ max: 50 })
        .withMessage('Screen Name must be less than 50 characters.')
        .custom((value, { req }) => {
            return db.User.findOne({
                where: {
                    screenName: value
                }
            }).then((user) => {

                if (user) {

                    if (user.id === req.session.auth.userId) {
                        return;
                    }

                    return Promise.reject('The provided Screen Name is already in use.')
                }
                
            })
        }),
    check('pictureURL')
        //MAYBE -- add regex to check URL
        .isLength({ max: 255 })
        .withMessage('Picture URL should be less than 255 characters')
]

router.get('/:userId(\\d+)/edit', requireAuth, csrfProtection, asyncHandler(async (req, res, next) => {

    const userId = parseInt(req.params.userId, 10);
    //grab user from the database
    const user = await db.User.findByPk(userId);

    if (user.id === req.session.auth.userId) {
        let currentUserId = req.session.auth.userId;
        res.render('profiles-edit', {
            title: 'Edit Profile',
            user,
            userId,
            currentUserId,
            csrfToken: req.csrfToken()
        })
    } else {
        res.redirect(`/users/${userId}`);
    }
}))


router.post('/:userId(\\d+)/edit', requireAuth, profileValidators, csrfProtection, asyncHandler(async (req, res, next) => {

    const userId = parseInt(req.params.userId, 10);
    //grab user from the database
    const user = await db.User.findByPk(userId);

    if (user.id === req.session.auth.userId) {
        const { screenName, biography, pictureURL } = req.body;

        const updatedProfile = {
            screenName,
            biography,
            pictureURL
        };

        const validatorErrors = validationResult(req);

        if (validatorErrors.isEmpty()) {
            await user.update(updatedProfile)
            res.redirect(`/users/${userId}`)
        } else {
            let currentUserId = req.session.auth.userId;
            const errors = validatorErrors.array().map((error) => error.msg);
            res.render('profiles-edit', {
                title: 'Edit Profile',
                user,
                errors,
                userId,
                currentUserId,
                csrfToken: req.csrfToken()
            })
        }
    } else {
        res.redirect(`/users/${userId}`)
    }
}))


module.exports = router;
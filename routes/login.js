var express = require('express');
var router = express.Router();

const { check, validationResult } = require('express-validator')
const { csrfProtection, asyncHandler, userValidators } = require('./utils')
const bcrypt = require('bcryptjs')

const db = require('../db/models')
const {loginUser} = require('../auth')


router.get('/', csrfProtection, function (req, res, next) {
    // Pass csrf protection token
    res.render('login', {
        title: 'Login',
        csrfToken: req.csrfToken()
    })
});

loginValidators = [
    check('email')
        .exists({ checkFalsy: true})
        .withMessage('Please provide an email address'),
    check('password')
        .exists({ checkFalsy: true})
        .withMessage('Please provide a password')
];

router.post('/', csrfProtection, loginValidators, asyncHandler(async (req, res, next) => {
    const {email, password} = req.body;
    let errors = [];
    const validatorErrors = validationResult(req);
    if (validatorErrors.isEmpty()) {
        const user = await db.User.findOne({
            where: {
                email
            }
        });
        if (user !== null) {
            const passwordMatch = await bcrypt.compare(password, user.hashedPassword.toString());
            if (passwordMatch){
                loginUser(req, res, user);
                return res.redirect('/');
            }
        }
        errors.push('Email and password is an invalid combination');
    } else {
        errors = validatorErrors.array().map((error)=> error.msg);
    }
    res.render('login', {
        title: 'Login',
        email,
        errors,
        csrfToken: req.csrfToken()
    })
}));

router.post('/random-demo', asyncHandler( async (req, res) => {
    const {email, password} = req.body;
    const user = await db.User.findOne({
        where: {
            email
        }
    });
    if (user !== null) {
        const passwordMatch = await bcrypt.compare(password, user.hashedPassword.toString());
        if (passwordMatch){
            loginUser(req, res, user);
            return res.redirect('/');
        }
    }
}))


module.exports = router;

const csrf = require('csurf');

const csrfProtection = csrf({ cookie: true})

const asyncHandler = handler => (req, res, next) => handler(req, res, next).catch(next)

const userValidators = [
    check('emailAddress')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a value for the Email Address.')
        .isLength({ max: 100 })
        .withMessage('Email Address must be less than 100 characters.')
        .isEmail()
        .withMessage('Please enter a valid Email Address.')
        .custom((value) => {
            return db.User.findOne({
                where: {
                    emailAddress: value
                }
            }).then((user) => {
                if (user) {
                    return Promise.reject('The provided Email Address is already in use.')
                }
            })
        }),
    check('screenName')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a value for the Screen Name.')
        .isLength({ max: 50 })
        .withMessage('Screen Name must be less than 50 characters.')
        .custom((value) => {
            return db.User.findOne({
                where: {
                    screenName: value
                }
            }).then((user) => {
                if (user) {
                    return Promise.reject('The provided Screen Name is already in use.')
                }
            })
        }),
    check('password')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a value for Password.')
        .isLength({ min: 8, max: 50 })
        .withMessage('Password must be between 8-50 characters.')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, 'g')
        .withMessage('Password must contain at least 1 lowercase letter, uppercase letter, number, and special character (i.e. "!@#$%^&*")'),
    check('confirmPassword')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a value for Confirm Password')
        .isLength({ min: 8, max: 50 })
        .withMessage('Confirm Password must be between 8-50 characters.')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Confirm Password does not match Password');
            }
            return true;
        }),
]

module.exports = {
    csrfProtection,
    asyncHandler,
    userValidators
}

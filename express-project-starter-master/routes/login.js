var express = require('express');
var router = express.Router();

const { check, validationResult } = require('express-validator')
const { csrfProtection, asyncHandler, userValidators } = require('./utils')
const bcrypt = require('bcryptjs')

const db = require('../db/models')


router.get('/', function (req, res, next) {

});

router.post('/', function (req, res, next) {

});



module.exports = router;
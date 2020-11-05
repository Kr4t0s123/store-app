const express = require('express')
const { body } = require('express-validator');
const router = express.Router();
const { signout ,signup , signin , isSignedIn } = require('../controllers/auth')


router.post('/signup',[
    body('name').isLength({ min : 5}).withMessage("Name must be at least 5 char long"),
    body('email').isEmail().withMessage('Email is required'),
    body('password').isLength({ min : 3}).withMessage("Password must be at least 3 char long")
],signup)

router.post('/signin',[
    body('email').isEmail().withMessage('Email is required'),
    body('password').isLength({ min : 1}).withMessage("Password is required")
],signin)

router.get('/signout',signout)


module.exports = router
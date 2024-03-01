// routes.js
const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.get('/login', controller.userLoginController);
router.post('/signup', controller.userSignupController);

module.exports = router;

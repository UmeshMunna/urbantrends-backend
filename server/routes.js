// routes.js
const express = require('express');
const router = express.Router();
const controller = require('./controller');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/login', controller.userLoginController);
router.post('/signup', upload.single('profilePicture'), controller.userSignupController);

module.exports = router;

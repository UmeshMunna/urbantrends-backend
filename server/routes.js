const express = require('express');
const router = express.Router();
const controller = require('./controller');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


router.post('/login', controller.userLoginController);
router.post('/signup', upload.single('profilePicture'), controller.userSignupController);

module.exports = router;

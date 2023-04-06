const express = require('express');
const router = express.Router();
const User = require('../controllers/userController');

router.post('/auth/signUp', User.signingUp);
router.post('/auth/signIn', User.signingIn);



module.exports = router;
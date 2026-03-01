const express = require('express');
const router = express.Router();
const { register, login, adminLogin, googleLogin } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.post('/admin-login', adminLogin);
router.post('/google-login', googleLogin);

module.exports = router;

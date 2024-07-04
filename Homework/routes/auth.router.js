const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
var database = require('../database/connection.js');
const jwt = require('jsonwebtoken');

const authController = require("../controllers/auth.controller.js");

router.post('/login', authController.loginUser);
router.get('/login', authController.showloginForm)
// Register 
router.post('/register', authController.registerUser);

router.post('/validateEmail', authController.validateEmail);
router.post('/sendMail', authController.sendMail);
router.post('/sendOTP', authController.sendOTP);
router.post('/verifyOTP', authController.verifyOTP);
router.post('/resetPassword', authController.resetPassword);
module.exports = router;
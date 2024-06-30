const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
var database = require('../database/connection.js');
const jwt = require('jsonwebtoken');

const authController = require("../controllers/auth.controller.js");

router.post('/login', authController.loginUser);

// Register 
router.post('/register', authController.registerUser);

module.exports = router;
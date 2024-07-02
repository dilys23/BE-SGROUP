const db = require("../database/connection");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const registerService = async (user) => {
    const {
        username,
        email,
        password
    } = user;
    try {
        const [existingUser] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUser.length !== 0) {
            return {
                error: 'Email already exists.'
            };
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log(hashedPassword);
        await db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword]);
        return {
            username,
            email, 
            hashedPassword,
        };
    } catch (error) {
        return {
            error: 'Register failed'
        };
    }
}

const loginService = async (user) => {
    const {
        email,
        password
    } = user;
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    try {
        const [results] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (results.length > 0) {
            const user = results[0];
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                const token = jwt.sign({
                    id: user.id,
                    email: user.email
                }, jwtSecretKey, {
                    expiresIn: '1h'
                });
                return {
                    token
                };
            } else {
                return {
                    error: 'Incorrect Password'
                };
            }
        } else {
            return {
                error: 'Incorrect Email Address'
            };
        }
    } catch (error) {
        return {
            error: 'Login failed'
        };
    }
}

module.exports = {
    registerService,
    loginService
}
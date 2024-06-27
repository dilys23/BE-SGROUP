const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
// const userRouter = require("./user.router.js");
var database = require('../database/connection.js');
const jwt = require('jsonwebtoken');

router.get('/index', (req, res) => {
    res.render('index', {
        session: req.session
    });
});


router.get('/register', (req, res) => {
    res.render('register');
})
router.post('/register', async (req, res) => {
    const {
        username,
        email,
        password
    } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = 'Insert into users (username, email, password) values (?, ?, ?)  ';
        const result = await database.query(query, [username, email, hashedPassword]);
        res.redirect('/login');
    } catch (error) {
        console.error('error')
        res.status(500).send('An error occurred');
    }


})

router.get('/login', (req, res) => {
    res.render('login');
})

router.post('/login', async (req, res) => {
    const {
        email,
        password
    } = req.body;

    try {
        const query = 'select * from users where email = ?';
        const results = await database.query(query, [email]);

        if (results.length > 0) {
            const user = results[0][0];
            
            const match = await bcrypt.compare(password, user.password);
            
            if (match) {
                
                console.log(user.user_id);
                // req.session.user_id = user.user_id;
                console.log('Login successful');
                res.redirect('/index');
            } else {
                console.log('Incorrect Password');
                res.send('Incorrect Password');
            }
        } else {
            console.log('Incorrect Email Address');
            res.send('Incorrect Email Address');
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('An error occurred');
    }
});

router.get('/logout', function (request, response) {
    request.session.destroy();
    response.redirect('/');

})

// router.use("/user",userRouter );
module.exports = router;
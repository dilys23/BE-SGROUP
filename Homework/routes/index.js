const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
// const userRouter = require("./user.router.js");
var database = require('../database/connection.js');

router.get('/index', (req, res) => {
    res.render('index', { session: req.session });
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

router.post('/login', function (req, res) {
    const {
        email,
        password
    } = req.body;

    const query = 'select * from users where email = ?';
    database.query(query, [email], async (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
            const user = results[0];
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                req.session.user_id = user_id;
                res.redirect('/index')
            } else {
                res.send('Incorrect Password');
            }
        } else {
            res.send('Incorrect Email Address')
        }
    })

});

router.get('/logout', function (request, response) {
    request.session.destroy();
    response.redirect('/');

})

// router.use("/user",userRouter );
module.exports = router;
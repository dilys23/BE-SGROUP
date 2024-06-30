const db = require("../database/connection");
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()
const registerService = async(user) =>
    {
        const {name, email, password} = user;
        try {
            const [existingUser] = await db.query('select * from users where username = ?', [username]);
            if (existingUser.length !== 0)
                {
                    return {status: 400, message: 'Username already exists.'};
                }
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);
                await db.query(
                    'insert into users (name, email, password) values (?, ?, ?)', [name, email, hashedPassword]
                ); 
                // const [newUser] = await db.query('select * from users where username = ?', [username]);
                // const { }
            
        } catch (error) {
            return {error: 'Register failed'};
            
        }
    }

const loginService = async(user) =>
    {
        const {
            email,
            password
        } = user;
        let jwtSecretKey = process.env.JWT_SECRET_KEY;
    
        try {
            const query = 'select * from users where email = ?';
            const results = await database.query(query, [email]);
    
            if (results.length > 0) {
                const user = results[0][0];
                
                const match = await bcrypt.compare(password, user.password);
                
                if (match) {
                    
                    console.log(user.user_id);
                    // req.session.user_id = user.user_id;
                    const token = jwt.sign(user, jwtSecretKey);
                    console.log('Login successful');
                    res.send(token);
                    // res.redirect('/index');
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
    }

    module.exports = {
        registerService,
        loginService
    }
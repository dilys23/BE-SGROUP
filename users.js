import express from 'express'

const router = express.Router();
const users = [
    {
        first_name: 'Dilys',
        last_name: 'nguyen',
        email: 'dilys@gmail.com',
    },
    {
        first_name: 'Khoai',
        last_name: 'nguyen',
        email: 'khoai@gmail.com',
    }
]

router.get('/', (req, res) =>
{
    res.send(users);
})
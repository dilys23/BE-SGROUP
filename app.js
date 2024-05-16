// const express = require('express');
// const bodyParser = require('body-parser');
// const fs = require('fs');

// const app = express();
// app.use(bodyParser.json());

// // Load initial data
// let books = require('./data.json');

// // create a book 
// app.post('/books', (req, res) => {
//     const newBook = req.body;
//     newBook.id = books.length ? books[books.length - 1].id + 1 : 1;
//     books.push(newBook);
//     res.status(201).json(newBook);
// });

// // read all 
// app.get('/books', (req, res) => {
//     res.json(books);
// });

// // read one by id 
// app.get('/books/:id', (req, res) => {
//     const book = books.find(b => b.id === parseInt(req.params.id));
//     if (!book) {
//         return res.status(404).send('Book not found');
//     }
//     res.json(book);
// });

// // update
// app.put('/books/:id', (req, res) => {
//     const book = books.find(b => b.id === parseInt(req.params.id));
//     if (!book) {
//         return res.status(404).send('Book not found');
//     }
//     Object.assign(book, req.body);
//     res.json(book);
// });

// // delete book by id 
// app.delete('/books/:id', (req, res) => {
//     books = books.filter(b => b.id !== parseInt(req.params.id));
//     res.status(204).send();
// });

// // save data 
// process.on('SIGINT', () => {
//     console.log('Received SIGINT. Saving data...');
//     fs.writeFileSync('data.json', JSON.stringify(books, null, 2));
//     process.exit();
// });

// const port = 3000;
// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });

// import express from 'express';
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
// const { Console } = require('console');
// import bodyParser from 'body-parser' // body Parser là đi kèm với Express, cho phép tiếp nhận nội dung yêu cầu POST đến
const app = express(); // tạo app sử dụng đối tượng express
const Port = 5000
app.use(bodyParser.json());
app.get('/', (req, res) =>
{
    console.log('[GET ROUTE]');
    res.send('Welcome to my homepage')
})

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
app.listen(Port, () => console.log(`Server running on port: http://localhost:${Port}`));
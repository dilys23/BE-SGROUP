const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

let books = require('./data.json')

let validate = (req, res, next) => {
    if (req.body.title == null || req.body.title === undefined || req.body.title === "" || req.body.title !== String) {
        return res.status(400).json({
            error: 'Invalid or missing title'
        });
    } else if (req.body.author == null || req.body.author === undefined || req.body.author === "" || req.body.author !== String) {
        return res.status(400).json({
            error: 'Invalid or missing author'
        });
    }
    next();
}
// get list of books from data.json 
app.get('/api/books', (req, res) => {
    res.json(books)
})

// post a new book to list 
app.post('/api/books', validate, (req, res) => {
    const newBook = req.body;
    let maxID = 0;
    for (const book of books) {
        if (book.id > maxID) {
            maxID = book.id;
        }
    }
    newBook.id = maxID + 1;
    books.push(newBook);
    fs.writeFileSync('data.json', JSON.stringify(books, null, 2))
    res.status(201).json(newBook);
})


app.get('/api/books/:id', (req, res) => {
    let book = books.find(book => book.id === parseInt(req.params.id));
    if (!book) {
        return res.status(404).send('Book not found')
    }
    res.json(book);

})

// update new book 
app.put('/api/books/:id', (req, res) => {
    let book = books.find(book => book.id === parseInt(req.params.id));
    if (!book) {
        return res.status(404).send('Book not found')
    }
    Object.assign(book, req.body);
    fs.writeFileSync('data.json', JSON.stringify(books, null, 2))
    res.json(book);

})

// delete 
app.delete('/api/books/:id', (req, res) => {
    books = books.filter(b => b.id !== parseInt(req.params.id));
    fs.writeFileSync('data.json', JSON.stringify(books, null, 2))
    res.sendStatus(204);

})

// middleware 
app.get('/middleware',
    function (req, res, next) {
        if (req.query.token && req.query.token === 'valid-token') {
            return next();
        }
        res.status(403).json({
            message: "Error"
        });
    },
    function (req, res, next) {
        res.json({
            message: 'Successfully'
        });
    }
);

app.listen(3000, () => console.log('listening on port: http://localhost:3000'));

// const express = require('express');
// const bodyParser = require('body-parser');
// const fs = require('fs');
// const userRoutes = require('./users.js');

// const app = express(); // tạo app sử dụng đối tượng express
// const Port = 5000;

// app.use(bodyParser.json());
// app.use('/users', userRoutes);

// app.get('/', (req, res) => res.send('Hello from homepage'));

// app.listen(Port, () => console.log(`Server running on port: http://localhost:${Port}`));


const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

let books = require('./data.json');

app.get ('/', (req, res) =>
{
    res.send('Hello from homepage');
})
app.post('/books', (req, res) =>
{
    const newBook = req.body;
    newBook.id = books.length? books[books.length - 1].id + 1 : 1; 
    books.push (newBook);
    fs.writeFileSync('data.json', JSON.stringify(books, null, 2));
    res.status(201).json(newBook)
})
// get all books 
app.get('/books', (req, res) => 
{
    res.json(books);
})

// get book by id 
app.get('/books/:id', (req, res) => 
    {
        const book = books.find(b=>b.id === parseInt(req.params.id))
        if(!book)
            {
                return res.status(404).send('Book not found');
            }
            res.json(book);
    })
    
// update 
app.put('/books/:id', (req, res) =>
{
    const book = books.find(b=>b.id === parseInt(req.params.id));
    if(!book)
        {
            return res.status(404).send('Book not found');
        }
        Object.assign(book, req.body);
        res.json(book);
})
// delete book by id 
app.delete('/books/:id', (req, res) =>
{
    books = books.filter(b=>b.id !== parseInt(req.params.id));
    res.status(204).send();
} )
app.listen(3000, () => console.log('Server running on port: http://localhost:3000'));
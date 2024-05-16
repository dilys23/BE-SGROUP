const express = require('express');
const bodyParser = require ('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

let books = require ('./data.json')

// get danh sách books trong json 
app.get('/api/books', (req, res)=>{
    res.json(books)
})

// post mới một quyển sách vào danh sách 
app.post('/api/books', (req, res) =>
{
    const newBook = req.body;
    let maxID = 0;
    for (const book of books)
        {
            if (book.id > maxID)
                {
                    maxID = book.id;
                }
        }
    newBook.id = maxID + 1;  
    books.push(newBook);
    fs.writeFileSync('data.json', JSON.stringify(books, null, 2))
    res.status(201).json(newBook);  
})


app.get('/api/books/:id', (req, res) =>
{
    let book = books.find(book => book.id === parseInt(req.params.id));
    if(!book)
        {
            return res.status(404).send('Book not found')
        }
    res.json(book);

})

// update 
app.put('/api/books/:id', (req, res) =>
{
    let book = books.find(book => book.id === parseInt(req.params.id));
    if(!book)
        {
            return res.status(404).send('Book not found')
        }
    Object.assign(book, req.body);
    fs.writeFileSync('data.json', JSON.stringify(books, null, 2))
    res.json(book);
    
})

// delete 
app.delete('/api/books/:id', (req, res) => 
{
    books = books.filter(b=>b.id !== parseInt(req.params.id));
    fs.writeFileSync('data.json', JSON.stringify(books, null, 2))
    res.sendStatus(204);

})
app.listen(3000, () => console.log('listening on port: http://localhost:3000'));
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

if(process.env.ENV === 'TEST'){
    console.log("This is a test");
    const db = mongoose.connect('mongodb://localhost/books_Test'); 
}else {
    console.log("This is not a test");
    const db = mongoose.connect('mongodb://localhost/books');
}
const app = express();
const port = process.env.port|| 3000;
const Book = require('./model/bookModel');
const bookRouter = require('./route/bookRouter')(Book);///const bookRouter = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', bookRouter);

app.get('/', (req, res) => {
    res.send('Welcome here');
});

app.server = app.listen(port, () => {
    console.log(`running on port : ${port}`);
});

module.exports = app;
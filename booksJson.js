var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/books', {useNewUrlParser: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
    console.log("connected");
});

var bookSchema = new mongoose.Schema({
    title: String,
    genre: String,
    author: String,
    read: Boolean
});

var book = mongoose.model('Book', bookSchema);

var BOOKCONSTRUCTOR = function(title, genre, author, read){
  this.title = title;
  this.genre = genre;
  this.author = author;
  this.read = read;
}
var bookInfo = new BOOKCONSTRUCTOR("t3", 'g3', 'a1', false);
var newBook = new book(bookInfo);
console.log(newBook);

newBook.save((err, newBook) => {
    if(err) return console.error(err);
    console.log(`this book is:
     ${newBook}`);
});

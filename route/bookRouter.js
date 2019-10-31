const express = require('express');
const bookController = require('../controllers/booksController');

module.exports = function router(Book){

    const controller = bookController(Book);
    const bookRouter = express.Router();

    bookRouter.route('/books')
        .post(controller.post)
        .get(controller.get);
    
    bookRouter.use('/book/:bookId', (req, res, next) => {
        console.log(req.params.bookId);

        Book.findById(req.params.bookId, (err, book) => {
           
            if(book) {
                req.book = book;
                next();
            }
            else return res.sendStatus(404);

        });
    });
    bookRouter.route('/book/:bookId')
        .get((req, res) =>  res.json(req.book))
        .put((req, res) => {
            
            let {book} = req;

            book.read = req.body.read;
            book.title = req.body.title;
            book.genre = req.body.genre;
            book.author = req.body.author;

            book.save((err, book) => {
                if(err) res.send(err);
                else return res.json(book);
            });

        })
        .patch((req, res) => {
            const {book} = req;
            
            if(req.body._id) delete(req.body._id);

            Object.entries(req.body).forEach(item => {
                const key = item[0];
                const value = item[1];

                if(book[key]) book[key] = value;
            });

            book.save((err, book) => {
                if(err) res.send(err);
                else return res.json(book);
            });
        })
        .delete((req, res) => {
            req.book.remove((err) => {
                if(err) return res.send(err);
                else res.sendStatus(204);
            });
        });
    return bookRouter;
}

function booksController(Book){

    let post = function(req, res) {
        const book = new Book(req.body);
       
        if(!req.body.title){
            res.status(400);
            return res.send('Title is required');
        } else {
            book.save((err, book) => {
                console.log(`${book} is saved`);
            })
           
            res.statusMessage = "ok baby";
            res.status(201);
            return res.json(book);
        }
    }

    let get = function(req, res) {

        const queryParam = req.query; /// const {query} = req.query;
        console.log(queryParam);

        const query = {};
        if(req.query.genre){
            query.genre = req.query.genre;
        }

        Book.find(query, (err, books) => {
            if(err){
                return res.send(err);
            }
            return res.json(books);
        });
    
    }

    return {post, get};
}

module.exports = booksController;
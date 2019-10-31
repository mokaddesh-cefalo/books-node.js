const should = require('should');
const sinon = require('sinon');
const bookController = require('../controllers/booksController');

process.env.ENV = 'TEST';

describe("Book controller test:", () => {
    describe('post:', () => {
        it('should not allow an empty title on post', () => {
            const Book = function(book) { this.save = () => {}; } 

            const req = {
                body: {
                    author: "Shovon"
                }
            };

            const res = {
                status: sinon.spy(),
                send: sinon.spy(),
                json: sinon.spy(),
                statusMessage: sinon.spy()
            }
            
            
            const controller = bookController(Book);
            controller.post(req, res);
             
            res.status.calledWith(400).should.equal(true, `Bad status ${res.status.args[0][0]}`);
            res.send.calledWith('Title is required').should.equal(true);
            
        })
    })
});


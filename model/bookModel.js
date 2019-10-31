const mongoose = require('mongoose');

const {Schema} = mongoose;

const bookModel = new Schema({
    title: String,
    genre: String,
    author: String,
    read: {type:Boolean, default: false}
});

module.exports = mongoose.model('Book', bookModel);
var mongoose = require('mongoose')

var Price = new mongoose.Schema({
    price: Number,
    currency: String
})


var Product = new mongoose.Schema({
    title: String,
    author: String,
    type: String,
    photo: String,
    description: String,
    price: Price,
    stock: Number,
    piece_info:{
        technique: String,
        material: String,
        dimensions: String,
        year: String
    },
    book_info:{
        publisher: String,
        genre: String,
        isbn: String
    }
})

module.exports = mongoose.model('productModel', Product, "products")
var mongoose = require('mongoose')

var Price = new mongoose.Schema({
    price: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        default: "EUR",
        enum: ["EUR", "USD", "GBP"] // DISCUSS
    }
}, {_id: false});

var Dimensions = new mongoose.Schema({
    width: Number,
    height: Number,
    depth: Number
}, {_id: false});

var PieceInfo = new mongoose.Schema({
    technique: String,
    material: String,
    dimensions: Dimensions,
    year: Number
}, {_id: false});

var BookInfo = new mongoose.Schema({
    publisher: String,
    genre: String,
    isbn: {
        type: String,
        required: true
    },
}, {_id: false});

var Product = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    photos: {
        type: [String],
        default: []
    },
    description: String,
    price: {
        type: Price,
        required: true
    },
    stock: {
        type: Number,
        default: 1
    },
    product_type: {
        type: String,
        enum: ["book", "piece"],
    },
    piece_info: PieceInfo,
    book_info: BookInfo
})

module.exports = mongoose.model('productModel', Product, "products")
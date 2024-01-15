const mongoose = require('mongoose');

const Dimensions = new mongoose.Schema(
    {
        width: Number,
        height: Number,
        depth: Number,
    },
    { _id: false }
);

const PieceInfo = new mongoose.Schema(
    {
        technique: String,
        material: String,
        dimensions: {
            type: Dimensions,
            required: true
        },
        year: Number,
        state: {
            type: String,
            enum: ['submitted', 'rejected', 'available', 'unavailable'],
            default: 'submitted',
        },
    },
    { _id: false }
);

const BookInfo = new mongoose.Schema(
    {
        publisher: String,
        genre: String,
        stock: {
            type: Number,
            default: 1,
        },
        isbn: {
            type: String,
            required: true,
        },
    },
    { _id: false }
);

const Product = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    photos: {
        type: [String],
        default: [],
    },
    description: String,
    price: {
        type: Number,
        required: true,
    },
    product_type: {
        type: String,
        required: true,
        enum: ['book', 'piece'],
    },
    _seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userModel',
        required: true,
    },
    piece_info: PieceInfo,
    book_info: BookInfo,
});

module.exports = mongoose.model('productModel', Product, 'products');

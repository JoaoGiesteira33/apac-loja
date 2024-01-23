const mongoose = require('mongoose');

/**
 * 2/3D Dimensions + Weight of the piece
 * @typedef {Object} Dimensions
 * @property {Number} width - Width of the piece
 * @property {Number} height - Height of the piece
 * @property {Number} depth - Depth of the piece
 * @property {Number} weight - Weight of the piece
 */
const Dimensions = new mongoose.Schema(
    {
        width: Number,
        height: Number,
        depth: Number,
        weight: Number,
    },
    { _id: false }
);

/**
 * Information about the piece
 * @typedef {Object} PieceInfo
 * @property {String} technique - Technique of the piece
 * @property {String[]} materials - Materials used in the piece
 * @property {Dimensions} dimensions - 2/3D Dimensions + Weight of the piece
 * @property {Number} year - Year of the piece
 * @property {String} state - State of the piece, if unavailable, it means it is being used in an order
 */
const PieceInfo = new mongoose.Schema(
    {
        technique: {
            type: String,
            enum: [
                'Pintura',
                'Escultura',
                'Fotografia',
                'Desenho',
                'Colagens',
                'Impressões e Gravuras',
                'Arte Digital',
                'Instalação',
                'Design',
                'Arte Têxtil',
            ],
            required: true,
        },
        materials: {
            type: [String],
            default: [],
        },
        dimensions: {
            type: Dimensions,
            required: true,
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

/**
 * Information about the book //UNUSED
 * @typedef {Object} BookInfo
 * @property {String} publisher - Publisher of the book
 * @property {String} genre - Genre of the book
 * @property {Number} stock - Stock of the book
 * @property {String} isbn - ISBN of the book
 */
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

/**
 * Product model
 * @typedef {Object} Product
 * @property {String} title - Title of the product
 * @property {String} author - Author of the product
 * @property {String[]} photos - Photos of the product
 * @property {String} description - Description of the product
 * @property {Number} price - Price of the product
 * @property {String} product_type - Type of the product
 * @property {ObjectId} _seller - Id of the seller
 * @property {PieceInfo} piece_info - Information about the piece, if applicable
 * @property {BookInfo} book_info - Information about the book //UNUSED
 * @property {Boolean} featured - If the product is featured or not
 */
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
    featured: {
        type: Boolean,
        default: false,
    },
});

/**
 * Check if the product will have more than 12 photos after the update
 * @param {Function} next - Callback function
 * @returns {void}
 * @throws {Error} - Too many photos
 * @description This hook checks if the product will have more than 12 photos after the update, if so, it throws an error
 */
Product.pre('updateOne', function (next) {
    if (this._update.$push && this._update.$push.photos) {
        this.model.findById(this._conditions._id).then((product) => {
            if (
                product.photos.length + this._update.$push.photos.$each.length >
                12
            ) {
                throw new Error('Too many photos');
            } else {
                next();
            }
        });
    } else {
        next();
    }
});

module.exports = mongoose.model('productModel', Product, 'products');

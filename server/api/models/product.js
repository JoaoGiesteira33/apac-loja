const mongoose = require('mongoose');

const Dimensions = new mongoose.Schema(
    {
        width: Number,
        height: Number,
        depth: Number,
        weight: Number,
    },
    { _id: false }
);

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
    featured: {
        type: Boolean,
        default: false,
    },
});

// When adding updating photos to push new ones verify that the total number of photos will be less than 12
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

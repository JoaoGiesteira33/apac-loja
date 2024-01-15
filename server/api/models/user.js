const mongoose = require('mongoose');

const Address = new mongoose.Schema(
    {
        street: {
            type: String,
        },
        postal_code: {
            type: String,
        },
        city: {
            type: String,
        },
        country: {
            type: String,
        },
    },
    { _id: false }
);

/**
 * Demographics associated with the client/seller
 * @typedef {Object} Demographics
 * @property {String} name - Name of the client/seller
 * @property {Date} birth_date - Birth date of the client/seller
 * @property {String} address - Address of the client/seller
 * @property {String} phone - Phone number of the client/seller
 */
const Demographics = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        birth_date: {
            type: Date,
            required: true,
        },
        address: {
            type: Address,
        },
        phone: String,
    },
    { _id: false }
);

/**
 * Statistics associated with the client/seller
 * @typedef {Object} Statistics
 */
const Statistics = new mongoose.Schema(
    {
        // Por enquanto não temos estatísticas
    },
    { _id: false }
);

const SellerFields = new mongoose.Schema(
    {
        demographics: {
            type: Demographics,
            required: true,
        },
        statistics: Statistics,
        profile_picture: String,
        about: String,
        seller_type: {
            type: String,
            required: true,
            enum: ['artist', 'bookseller'],
        },
    },
    { _id: false }
);

const ClientFields = new mongoose.Schema(
    {
        demographics: {
            type: Demographics,
            required: true,
        },
        statistics: Statistics,
        /**
    events: {
        type: [Event],
        default: []
    },
    */
        search_history: {
            type: [String],
            default: [],
        }, // struct Purchase ???
        favorites: {
            type: [String],
            default: [],
        }, // struct Purchase ???
        cart: {
            type: [String],
            default: [],
        }, // struct Purchase ???
        interests: {
            type: [String],
            default: [],
        }, // user set his interests
    },
    { _id: false }
);

/**
 * User
 * @typedef {Object} User
 * @property {String} email - User email
 * @property {String} role - User role(seller/client/admin)
 * @property {Object} client_fields - Client fields
 * @property {Object} seller_fields - Seller fields
 */
const User = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        required: true,
        enum: ['client', 'seller', 'admin'],
    },
    client_fields: ClientFields,
    seller_fields: SellerFields,
    active_chat_id: {
        type: [String],
        default: [],
    },
    tags: {
        type: [String],
        default: [],
    },
});

module.exports = mongoose.model('userModel', User, 'users');

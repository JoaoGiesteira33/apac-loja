const mongoose = require('mongoose');

/**
 * Statistics associated with the seller
 * @typedef {Object} Statistics
 * @property {Number} rating - Rating of the seller
 * @property {Number} sales - Sales of the seller
 * @property {Number} products - Products of the seller
 */
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
 * @property {Address} address - Address of the client/seller
 * @property {String} phone - Phone of the client/seller
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
 * Information about the seller
 * @typedef {Object} SellerFields
 * @property {Demographics} demographics - Demographics of the seller
 * @property {Statistics} statistics - Statistics of the seller
 * @property {String} profile_picture - Profile picture of the seller
 * @property {String} about - About of the seller
 * @property {String} seller_type - Type of the seller, can be artist or bookseller
 * @property {String} status - Status of the seller, can be active or inactive
 */
const SellerFields = new mongoose.Schema(
    {
        demographics: {
            type: Demographics,
            required: true,
        },
        profile_picture: String,
        about: String,
        seller_type: {
            type: String,
            required: true,
            enum: ['artist', 'bookseller'],
        },
        status: {
            type: String,
            enum: ['active', 'inactive'],
            default: 'active',
        },
    },
    { _id: false }
);

/**
 * Information about the client
 * @typedef {Object} ClientFields
 * @property {Demographics} demographics - Demographics of the client
 * @property {String[]} search_history - Search history of the client
 * @property {String[]} favorites - Favorites of the client
 * @property {String[]} cart - Cart of the client
 * @property {String[]} interests - Interests of the client
 */
const ClientFields = new mongoose.Schema(
    {
        demographics: {
            type: Demographics,
            required: true,
        },
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
 * User schema
 * @typedef {Object} User
 * @property {String} email - Email of the user
 * @property {String} role - Role of the user, can be client, seller or admin
 * @property {ClientFields} client_fields - Client fields
 * @property {SellerFields} seller_fields - Seller fields
 * @property {String[]} active_chat_id - Active chat ids
 * @property {String[]} tags - Tags associated with the user //UNIMPLEMENTED
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

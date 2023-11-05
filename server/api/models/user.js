var mongoose = require('mongoose')

/**
 * Purchase history associated with the client
 * @typedef {Object} Purchase
 * @property {String} product_id - Product id
 * @property {Date} date - Purchase date
 */
var Purchase = new mongoose.Schema({
    product_id: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

/**
 * Demographics associated with the client/seller
 * @typedef {Object} Demographics
 * @property {String} name - Name of the client/seller
 * @property {Date} birth_date - Birth date of the client/seller
 * @property {String} address - Address of the client/seller
 * @property {String} phone - Phone number of the client/seller
 */
var Demographics = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    birth_date: {
        type: Date,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: String
});

/**
 * Statistics associated with the client/seller
 * @typedef {Object} Statistics
 * @property {Date} lastLogin - Last login date of the client/seller
 */
var Statistics = new mongoose.Schema({
    lastLogin: Date
});


var SellerFields = new mongoose.Schema({
    demographics: {
        type: Demographics,
        required: true
    },
    statistics: {
        type: Statistics,
        required: true
    },
    profile_picture: String,
    about: String,
    products: {
        type: [String],
        default: []
    },
    seller_type: {
        type: String,
        enum: ['artist', 'bookseller']
    }
});

var ClientFields = new mongoose.Schema({
    demographics: {
        type: Demographics,
        required: true
    },
    statistics: {
        type: Statistics,
        required: true
    },
    purchases: {
        type: [Purchase],
        default: []
    },
    events: {
        type: [Purchase],
        default: []
    }
});


/** 
 * User
 * @typedef {Object} User
 * @property {String} email - User email
 * @property {String} role - User role(seller/client/admin)
 * @property {Object} client_fields - Client fields
 * @property {Object} seller_fields - Seller fields
 * @property {Object} client_fields.demographics - Client demographics
 * @property {Object} client_fields.purchases - Client purchase history
 * @property {Object} client_fields.events - Client events that they are interested in
 * @property {Object} seller_fields.demographics - Seller demographics
 * @property {Object} seller_fields.profile_picture - Seller profile picture url
 * @property {Object} seller_fields.about - Seller about section
 * @property {Object} seller_fields.products - Seller products 
*/
var User = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: [String],
        required: true,
        enum: ['client', 'seller', 'admin']
    },
    client_fields: ClientFields,
    seller_fields: SellerFields,
    active_chat_id: [String],
    tags: [String]
})

module.exports = mongoose.model('userModel', User, "users")
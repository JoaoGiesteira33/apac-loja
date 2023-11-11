var mongoose = require('mongoose')


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
    /**
    events: {
        type: [Event],
        default: []
    },
    */
    search_history: {
        type:[String],
        default: []
    }, // struct Purchase ???
    favorites: {
        type:[String],
        default: []
    }, // struct Purchase ???
    cart: {
        type:[String],
        default: []
    }, // struct Purchase ???
    interests: {
        type:[String],
        default: []
    } // user set his interests
});


/** 
 * User
 * @typedef {Object} User
 * @property {String} email - User email
 * @property {String} role - User role(seller/client/admin)
 * @property {Object} client_fields - Client fields
 * @property {Object} seller_fields - Seller fields
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
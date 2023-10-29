var mongoose = require('mongoose')

/**
 * Purchase history associated with the client
 * @typedef {Object} Purchase
 * @property {String} product_id - Product id
 * @property {Date} date - Purchase date
 */
var Purchase = new mongoose.Schema({
    product_id: String,
    date: Date
});

/**
 * 
 */
var Demographics = new mongoose.Schema({
    name: String,
    birth_date: Date,
    address: String,
    phone: String
});

var Statistics = new mongoose.Schema({
    lastLogin: Date
});

// TODO - ALTERAR PARA USAR UM SQUEMA (?)
//var artistFields = new mongoose.Schema({
//    demographics: Demographics,
//    statistics: Statistics,
//    profile_picture: String,
//    about: String,
//    products: [String]
//})

/** 
 * User
 * @typedef {Object} User
 * @property {String} email - User email
 * @property {String} role - User role(artist/client/admin)
 * @property {Object} client_fields - Client fields
 * @property {Object} artist_fields - Artist fields
 * @property {Object} client_fields.demographics - Client demographics
 * @property {Object} client_fields.purchases - Client purchase history
 * @property {Object} client_fields.events - Client events that they are interested in
 * @property {Object} artist_fields.demographics - Artist demographics
 * @property {Object} artist_fields.profile_picture - Artist profile picture url
 * @property {Object} artist_fields.about - Artist about section
 * @property {Object} artist_fields.products - Artist products 
*/
var User = new mongoose.Schema({
    email: String,
    role: String,
    client_fields:{
        demographics: Demographics,
        statistics: Statistics,
        purchases: [Purchase],
        events: [String]
    },
    artist_fields:{
        demographics: Demographics,
        statistics: Statistics,
        profile_picture: String,
        about: String,
        products: [String]
    },
    active_chat_id: [String],
    
    // artist_fields: artistFields
})

module.exports = mongoose.model('userModel', User, "users")
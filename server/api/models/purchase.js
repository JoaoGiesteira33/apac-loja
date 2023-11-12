var mongoose = require('mongoose')

/**
 * Purchase history associated with the client
 * @typedef {Object} Purchase
 * @property {String} product_id - Product id
 * @property {String} client_email - Buyer's email
 * @property {Date} date - Purchase date
 */
var Purchase = new mongoose.Schema({
    product_id: {
        type: String,
        required: true
    },
    client_email:{
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('purchaseModel', Purchase, "purchases");
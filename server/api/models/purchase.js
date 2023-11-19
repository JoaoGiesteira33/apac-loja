var mongoose = require('mongoose')

/**
 * Purchase history associated with the client
 * @typedef {Object} Purchase
 * @property {String} product_id - Product id
 * @property {String} client_id - Buyer's id
 * @property {Date} date - Purchase date
 */

var Evaluation = new mongoose.Schema({
    rating: {
        type: Number,
        min: 0,
        max: 5
    },
    comment: String
}, {_id: false});

var Purchase = new mongoose.Schema({
    product_id: {
        type: String,
        required: true
    },
    client_id:{
        type: String,
        required: true
    },
    seller_id:{
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    state: {
        type: String,
        enum: ['reserved', 'paid', 'sent', 'delivered', 'canceled'],
    },
    evaluation: Evaluation
});

module.exports = mongoose.model('purchaseModel', Purchase, "purchases");
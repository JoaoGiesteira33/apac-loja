const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId;

/**
 * Purchase history associated with the client
 * @typedef {Object} Purchase
 * @property {String} product_id - Product id
 * @property {String} client_id - Buyer's id
 * @property {Date} date - Purchase date
 */

const Evaluation = new mongoose.Schema({
    rating: {
        type: Number,
        min: 0,
        max: 5
    },
    comment: String
}, {_id: false});


// const Purchase = new mongoose.Schema({
//     product_id: {
//         type: String,
//         required: true
//     },
//     client_id:{
//         type: String,
//         required: true
//     },
//     seller_id:{
//         type: String,
//         required: true
//     },
//     date: {
//         type: Date,
//         default: Date.now
//     },
//     state: {
//         type: String,
//         enum: ['reserved', 'paid', 'sent', 'delivered', 'canceled'],
//     },
//     evaluation: Evaluation
// });
//
// module.exports = mongoose.model('purchaseModel', Purchase, "purchases");

const State = new mongoose.Schema({
    value: {
        type: String,
        enum: ['reserved', 'paid', 'sent', 'delivered', 'canceled'],
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {_id: false});

const Shipment = new mongoose.Schema({
    _seller:{
        type: ObjectId,
        required: true,
        ref: 'userModel'
    },
    _product: {
        type: ObjectId,
        required: true,
        ref: 'productModel'
    },
    states: { // Last state represents the current state
        type: [State],
        default: []
    },
    shipping_proof: String, // Path to the file submitted by the seller
    evaluation: Evaluation
}, {_id: false});

const Order = new mongoose.Schema({
    _client:{
        type: ObjectId,
        required: true,
        ref: 'userModel'
    },
    date: {
        type: Date,
        default: Date.now
    },
    shipments: [Shipment]
    //Falta adicionar a parte do pagamento. Guardado aqui, ou na parte do shipment
});

module.exports = mongoose.model('orderModel', Order, "orders");
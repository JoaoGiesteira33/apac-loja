const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

/**
 * Order model
 * @typedef {Object} Order
 * @property {ObjectId} _client - Id of the client that ordered the products
 * @property {Date} date - Date of the order
 * @property {ObjectId[]} shipments - Ids of the shipments associated with the order
 */
const Order = new mongoose.Schema({
    _client: {
        type: ObjectId,
        required: true,
        ref: 'userModel',
    },
    date: {
        type: Date,
        default: Date.now,
    },
    shipments: {
        type: [
            {
                type: ObjectId,
                ref: 'shipmentModel',
            },
        ],
        default: [],
    },
});

module.exports = mongoose.model('orderModel', Order, 'orders');

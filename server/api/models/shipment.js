const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;

const Evaluation = new mongoose.Schema(
    {
        rating: {
            type: Number,
            min: 0,
            max: 5,
        },
        comment: String,
    },
    { _id: false }
);

const State = new mongoose.Schema(
    {
        value: {
            type: String,
            enum: ['reserved', 'paid', 'sent', 'delivered', 'canceled'],
        },
        date: {
            type: Date,
            default: Date.now,
        },
    },
    { _id: false }
);

const Shipment = new mongoose.Schema({
    _seller: {
        type: ObjectId,
        required: true,
        ref: 'userModel',
    },
    _product: {
        type: ObjectId,
        required: true,
        ref: 'productModel',
    },
    states: {
        // Last state represents the current state
        type: [State],
        default: [],
    },
    shipping_proof: String, // Path to the file submitted by the seller
    evaluation: Evaluation,
});

module.exports = mongoose.model('shipmentModel', Shipment, 'shipments');

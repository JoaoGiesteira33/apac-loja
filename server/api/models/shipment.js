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
            enum: [
                'unpaid',
                'pending',
                'reserved',
                'paid',
                'sent',
                'delivered',
                'canceled',
            ],
            default: 'unpaid',
        },
        date: {
            type: Date,
            default: Date.now,
        },
    },
    { _id: false }
);

const Payment = new mongoose.Schema(
    {
        transactionId: {
            type: String,
            required: true
        },
        method: {
            type: String,
            enum: ['paypal', 'eupago'],
        },
        reference: String
    },
    { _id: false }
);

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

const Shipment = new mongoose.Schema({
    _client: {
        type: ObjectId,
        required: true,
        ref: 'userModel',
    },
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
    payments: {
        type: [Payment],
        default: [],
    },
    address: Address,
    shipping_proof: String, // Path to the file submitted by the seller
    evaluation: Evaluation,
});

module.exports = mongoose.model('shipmentModel', Shipment, 'shipments');

const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;

/**
 * Evaluation of the shipment//UNIMPLEMENTED
 * @typedef {Object} Evaluation
 * @property {Number} rating - Rating of the shipment
 * @property {String} comment - Comment of the shipment
 */
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

/**
 * State of the shipment, used for the log
 * @typedef {Object} State
 * @property {String} value - Value of the state
 * @property {Date} date - Date the state was changed
 */
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

/**
 * Payment information
 * @typedef {Object} Payment
 * @property {String} transactionId - Id of the transaction
 * @property {String} method - Method of payment
 * @property {String} reference - Reference of the payment, only for eupago
 */
const Payment = new mongoose.Schema(
    {
        transactionId: {
            type: String,
            required: true,
        },
        method: {
            type: String,
            enum: ['paypal', 'eupago'],
        },
        reference: String,
    },
    { _id: false }
);

/**
 * Address of the shipment
 * @typedef {Object} Address
 * @property {String} street - Street of the address
 * @property {String} postal_code - Postal code of the address
 * @property {String} city - City of the address
 * @property {String} country - Country of the address
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
 * Shipment model
 * @typedef {Object} Shipment
 * @property {ObjectId} _client - Id of the client that ordered the product
 * @property {ObjectId} _seller - Id of the seller that sold the product
 * @property {ObjectId} _product - Id of the product that was sold
 * @property {State[]} states - Log of the states of the shipment, the last state represents the current state
 * @property {Payment[]} payments - Log of the payments related to the shipment
 * @property {Address} address - Address destination of the shipment
 * @property {String} shipping_proof - Path to the file submitted by the seller, if any
 * @property {Evaluation} evaluation - Evaluation of the shipment //UNIMPLEMENTED
 */
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

/**
 * Pre save hook for the shipment model
 * @param {Function} next - Callback function
 * @returns {Function} next - Callback function
 * @throws {Error} If there is already a shipment with the same product that is not canceled
 *
 * @description This hook checks if there is already a shipment with the same product that is not canceled, so that there is only one shipment per product
 */
Shipment.pre('save', function (next) {
    mongoose
        .model('shipmentModel')
        .findOne({
            _product: this._product,
            'states.value': { $ne: 'canceled' },
        })
        .then((shipment) => {
            if (shipment) {
                throw new Error(
                    'There is already a shipment for this product that is not canceled.'
                );
            } else {
                next();
            }
        })
        .catch((error) => {
            next(error);
        });
});

module.exports = mongoose.model('shipmentModel', Shipment, 'shipments');

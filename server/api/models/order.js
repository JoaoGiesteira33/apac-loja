const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

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
    //Falta adicionar a parte do pagamento. Guardado aqui, ou na parte do shipment
});

module.exports = mongoose.model('orderModel', Order, 'orders');

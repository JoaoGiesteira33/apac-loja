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
                'pending',
                'reserved',
                'paid',
                'sent',
                'delivered',
                'canceled',
            ],
            default: 'pending',
        },
        date: {
            type: Date,
            default: Date.now,
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
    shipping_proof: String, // Path to the file submitted by the seller
    evaluation: Evaluation,
});

//Lógica

function generateNotification(state, _product, _seller, _client) {
    const Notification = require('../models/notification');
    switch (state) {
        case 'pending':
            return new Notification({
                _user: _seller,
                title: 'Pedido de pré-reserva',
                message:
                    'Um cliente realizou um pedido de pré-reserva do seu produto.',
                link: `/product/${_product}`,
            });
        case 'reserved':
            return new Notification({
                _user: _client,
                title: 'Pedido de pré-reserva aceite',
                message:
                    'O vendedor aceitou o seu pedido de pré-reserva do produto.',
                link: `/product/${_product}`,
            });
        case 'paid':
            return new Notification({
                _user: _seller,
                title: 'Compra do seu produto',
                message: 'Um cliente comprou o seu produto.',
                link: `/product/${_product}`,
            });
        case 'sent':
            return new Notification({
                _user: _client,
                title: 'O produto que comprou foi enviado',
                message: 'O vendedor enviou o produto.',
                link: `/product/${_product}`,
            });
        case 'delivered':
            return new Notification({
                _user: _seller,
                title: 'O produto que vendeu foi entregue',
                message: 'O cliente recebeu o produto.',
                link: `/product/${_product}`,
            });
    }
}

module.exports = mongoose.model('shipmentModel', Shipment, 'shipments');

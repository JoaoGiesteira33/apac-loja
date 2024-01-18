const Shipment = require('../models/shipment');

const utils = require('../utils/utils');

// METHODS:
//      - getShipmentInfo
module.exports.getShipmentInfo = function (id, expand) {
    return Shipment.findOne({ _id: id })
        .populate(expand)
        .then((info) => {
            return info;
        });
};

//      - createShipment
module.exports.createShipment = function (data) {
    return Shipment.create(data).then((info) => {
        return info;
    });
};

//      - createManyShipments
module.exports.createManyShipments = async function (data, session) {
    let session = await Shipment.startSession();
    try {
        session.startTransaction();
        let shipments = await Shipment.insertMany(data, { session: session });
        //Create notifications
        let notificationPromises = shipments.map((shipment) => {
            let state = shipment.states.slice(-1)[0].value;
            let notification = generateNotification(
                state,
                shipment._product,
                shipment._seller,
                shipment._client
            );

            if (state == 'reserved') {
                notification.save({ session: session });
            } else {
                return notification.save({ session: session }).then(() => {
                    const Product = require('../models/product');
                    return Product.updateOne(
                        { _id: doc._product },
                        { $set: { 'piece_info.state': 'unavailable' } }
                    );
                });
            }
        });

        await Promise.all(notificationPromises);

        await session.commitTransaction();
        return shipments;
    } catch (err) {
        console.log(err);
        await session.abortTransaction();
        throw err;
    } finally {
        session.endSession();
    }
};

//     - replaceShipmentInfo
module.exports.replaceShipmentInfo = function (id, data) {
    return Shipment.replaceOne({ _id: id }, data).then((info) => {
        return info;
    });
};

//      - updateShipmentInfo
module.exports.updateShipmentInfo = function (id, data) {
    console.log(data);
    let dotData = utils.dotify(data);
    console.log(dotData);
    return Shipment.updateOne({ _id: id }, { $set: dotData }).then((info) => {
        return info;
    });
};

//      - deleteShipment
module.exports.deleteShipment = function (id) {
    return Shipment.deleteOne({ _id: id }).then((info) => {
        return info;
    });
};

//      - getShipments
module.exports.getShipments = function (filters, fields, page, limit, expand) {
    return Promise.all([
        Shipment.find(filters, fields)
            .sort({ _id: 'asc' })
            .skip(page * limit)
            .limit(limit)
            .populate(expand),
        Shipment.countDocuments(filters),
    ]).then(([shipments, count]) => {
        let hasMore = count > (page + 1) * limit && limit != 0;
        return { results: shipments, hasMore: hasMore };
    });
};

// ADDITIONAL METHODS:

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

// updateShipmentState
// Push a new state to the states array
module.exports.updateShipmentState = async function (id, value) {
    let session = await Shipment.startSession();

    try {
        session.startTransaction();

        let shipment = await Shipment.findOneAndUpdate(
            { _id: id },
            { $push: { states: { value: value, date: Date.now() } } },
            { session: session, new: true }
        );

        let state = shipment.states.slice(-1)[0].value;

        let notification = generateNotification(
            state,
            shipment._product,
            shipment._seller,
            shipment._client
        );

        await notification.save({ session: session });

        if (
            ['reserved', 'paid', 'sent', 'delivered', 'canceled'].includes(
                state
            )
        ) {
            const Product = require('../models/product');
            await Product.updateOne(
                { _id: shipment._product },
                { $set: { state: 'unavailable' } },
                { session: session }
            );
        }

        await session.commitTransaction();
        return shipment;
    } catch (err) {
        console.log(err);
        await session.abortTransaction();
        throw err;
    } finally {
        session.endSession();
    }
};

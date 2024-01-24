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
    let sessionIsPassed = session != undefined;
    if (!sessionIsPassed) {
        session = await Shipment.startSession();
    }
    try {
        if (!sessionIsPassed) session.startTransaction();
        let shipments = await Shipment.insertMany(data, { session: session });
        //Create notifications
        let notificationPromises = shipments.map((shipment) => {
            let state = shipment.states.slice(-1)[0].value;
            let notifications = generateNotifications(
                state,
                shipment._product,
                shipment._seller,
                shipment._client
            );

            if (notifications) {
                return Promise.all(
                    notifications.map((notification) => {
                        return notification
                            .save({ session: session })
                            .then(() => {
                                if (
                                    [
                                        'pending',
                                        'reserved',
                                        'paid',
                                        'sent',
                                        'delivered',
                                    ].includes(state)
                                ) {
                                    const Product = require('../models/product');
                                    return Product.updateOne(
                                        { _id: shipment._product },
                                        {
                                            $set: {
                                                'piece_info.state':
                                                    'unavailable',
                                            },
                                        }
                                    );
                                }
                            });
                    })
                );
            }
        });

        await Promise.all(notificationPromises);

        if (!sessionIsPassed) await session.commitTransaction();
        return shipments;
    } catch (err) {
        console.log(err);
        if (!sessionIsPassed) await session.abortTransaction();
        throw err;
    } finally {
        if (!sessionIsPassed) session.endSession();
    }
};

//     - replaceShipmentInfo
module.exports.replaceShipmentInfo = function (id, data) {
    return Shipment.replaceOne({ _id: id }, data, {
        upsert: true,
    }).then((info) => {
        return info;
    });
};

//      - updateShipmentInfo
module.exports.updateShipmentInfo = function (id, data) {
    return Shipment.updateOne({ _id: id }, { $set: data }).then((info) => {
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
module.exports.getShipments = async function (
    filters,
    fields,
    page,
    limit,
    expand
) {
    const [shipments, count] = await Promise.all([
        Shipment.find(filters, fields)
            .sort({ _id: 'asc' })
            .skip(page * limit)
            .limit(limit)
            .populate(expand),
        Shipment.countDocuments(filters),
    ]);
    let hasMore = count > (Number(page) + 1) * Number(limit) && limit != 0;
    return { results: shipments, hasMore: hasMore };
};

//      - updateShipmentState
// Push a new state to the states array
module.exports.updateShipmentState = async function (filter, value) {
    let session = await Shipment.startSession();

    try {
        session.startTransaction();

        let shipment = await Shipment.findOneAndUpdate(
            filter,
            { $push: { states: { value: value, date: Date.now() } } },
            { session: session, new: true }
        );

        let notifications = generateNotifications(
            value,
            shipment._product,
            shipment._seller,
            shipment._client
        );

        if (notifications) {
            await Promise.all(
                notifications.map((notification) => {
                    return notification.save({ session: session });
                })
            );
        }

        if (
            ['pending', 'reserved', 'paid', 'sent', 'delivered'].includes(value)
        ) {
            const Product = require('../models/product');
            await Product.updateOne(
                { _id: shipment._product },
                { $set: { state: 'unavailable' } },
                { session: session }
            );
        } else if (value == 'canceled') {
            const Product = require('../models/product');
            await Product.updateOne(
                { _id: shipment._product },
                { $set: { state: 'available' } },
                { session: session }
            );
        }

        await session.commitTransaction();
        return shipment;
    } catch (err) {
        await session.abortTransaction();
        throw err;
    } finally {
        session.endSession();
    }
};

module.exports.updateShipmentsState = async function (filter, value) {
    let session = await Shipment.startSession();
    try {
        session.startTransaction();

        let shipments = await Shipment.find(filter).session(session);

        await Shipment.updateMany(
            filter,
            { $push: { states: { value: value, date: Date.now() } } },
            { session: session }
        );

        let notificationPromises = shipments.map((shipment) => {
            let notifications = generateNotifications(
                value,
                shipment._product,
                shipment._seller,
                shipment._client
            );
            if (notifications) {
                console.log(notifications);
                return Promise.all(
                    notifications.map((notification) => {
                        return notification.save({ session: session });
                    })
                );
            }
        });
        await Promise.all(notificationPromises);

        if (
            ['pending', 'reserved', 'paid', 'sent', 'delivered'].includes(value)
        ) {
            const Product = require('../models/product');
            let productPromises = shipments.map((shipment) => {
                return Product.updateOne(
                    { _id: shipment._product },
                    { $set: { state: 'unavailable' } },
                    { session: session }
                );
            });
            await Promise.all(productPromises);
        } else if (value == 'canceled') {
            let shipments = await Shipment.find(filter).session(session);
            const Product = require('../models/product');
            let productPromises = shipments.map((shipment) => {
                return Product.updateOne(
                    { _id: shipment._product },
                    { $set: { state: 'available' } },
                    { session: session }
                );
            });
            await Promise.all(productPromises);
        }

        await session.commitTransaction();
        return shipments;
    } catch {
        await session.abortTransaction();
        throw err;
    } finally {
        session.endSession();
    }
};

//      - addPaymentInfo
// Add payment info to shipment
module.exports.addPaymentInfo = async function (filter, data) {
    return Shipment.updateOne(filter, { $push: { payments: data } }).then(
        (info) => {
            return info;
        }
    );
};

// ADDITIONAL METHODS:

function generateNotifications(state, _product, _seller, _client) {
    const Notification = require('../models/notification');
    switch (state) {
        case 'pending':
            return [
                new Notification({
                    _user: _seller,
                    title: 'Pedido de pré-reserva',
                    message:
                        'Um cliente realizou um pedido de pré-reserva do seu produto.',
                    link: `/product/${_product}`,
                }),
            ];
        case 'reserved':
            return [
                new Notification({
                    _user: _client,
                    title: 'Pedido de pré-reserva aceite',
                    message:
                        'O vendedor aceitou o seu pedido de pré-reserva do produto.',
                    link: `/product/${_product}`,
                }),
            ];
        case 'paid':
            return [
                new Notification({
                    _user: _seller,
                    title: 'Compra do seu produto',
                    message: 'Um cliente comprou o seu produto.',
                    link: `/product/${_product}`,
                }),
            ];
        case 'sent':
            return [
                new Notification({
                    _user: _client,
                    title: 'O produto que comprou foi enviado',
                    message: 'O vendedor enviou o produto.',
                    link: `/product/${_product}`,
                }),
            ];
        case 'delivered':
            return [
                new Notification({
                    _user: _seller,
                    title: 'O produto que vendeu foi entregue',
                    message: 'O cliente recebeu o produto.',
                    link: `/product/${_product}`,
                }),
            ];
        case 'canceled':
            return [
                new Notification({
                    _user: _client,
                    title: 'A sua compra foi cancelada',
                    message: 'A encomenda do produto foi cancelada.',
                    link: `/product/${_product}`,
                }),
                new Notification({
                    _user: _seller,
                    title: 'A sua venda foi cancelada',
                    message: 'A encomenda do seu produto foi cancelada.',
                    link: `/product/${_product}`,
                }),
            ];
    }
}

// Scheduled tasks

module.exports.overdueCheck = async function (days, state) {
    let date = new Date();
    date.setDate(date.getDate() - days);
    return this.updateShipmentsState(
        {
            $expr: {
                $and: [
                    {
                        $lte: [
                            {
                                $arrayElemAt: ['$states.date', -1],
                            },
                            date,
                        ],
                    },
                    {
                        $eq: [
                            {
                                $arrayElemAt: ['$states.value', -1],
                            },
                            state,
                        ],
                    },
                ],
            },
        },
        'canceled'
    );
};

// overduePayment
module.exports.overduePayment = async function () {
    return this.overdueCheck(2, 'reserved');
};

// overdueShipment
module.exports.overdueShipment = async function () {
    return this.overdueCheck(5, 'paid');
};

// overdueDelivery
module.exports.overdueDelivery = async function () {
    return this.overdueCheck(5, 'sent');
};

// Use node-cron to schedule the overdue checks
const cron = require('node-cron');
cron.schedule('* * * * *', async function () {
    console.log('Running overdue checks job');
    await module.exports.overduePayment();
    await module.exports.overdueShipment();
    await module.exports.overdueDelivery();
    console.log('Finished overdue checks job');
});

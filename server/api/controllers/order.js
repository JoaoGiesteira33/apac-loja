const Order = require('../models/order');

const utils = require('../utils/utils');

const controllerShipment = require('./shipment');

// METHODS:
//      - getOrderInfo
module.exports.getOrderInfo = function (id, expand) {
    return Order.findOne({ _id: id })
        .populate(expand)
        .then((info) => {
            return info;
        });
};

//      - createOrder
module.exports.createOrder = function (data) {
    return Order.create(data).then((info) => {
        return info;
    });
};

module.exports.createOrderWithShipments = async function (data) {
    let session = await Order.startSession();
    try {
        session.startTransaction();
        //add _client to shipments
        data.shipments.forEach((shipment) => {
            shipment._client = data._client;
        });

        let shipments = await controllerShipment.createManyShipments(
            data.shipments,
            session
        );

        let order = data;
        order.shipments = shipments.map((shipment) => shipment._id);

        let orderInfo = await Order.create([order], { session: session });
        console.log(orderInfo);

        await session.commitTransaction();
        return orderInfo;
    } catch (err) {
        console.log(err);
        await session.abortTransaction();
        throw err;
    } finally {
        session.endSession();
    }
};

//     - replaceOrderInfo
module.exports.replaceOrderInfo = function (id, data) {
    return Order.replaceOne({ _id: id }, data, {
        upsert: true,
    }).then((info) => {
        return info;
    });
};

//      - updateOrderInfo || this is used for patch request
module.exports.updateOrderInfo = function (id, data) {
    return Order.updateOne({ _id: id }, { $set: data }).then((info) => {
        return info;
    });
};

//      - deleteOrder
module.exports.deleteOrder = function (id) {
    return Order.deleteOne({ _id: id }).then((info) => {
        return info;
    });
};

//      - getOrders
module.exports.getOrders = function (filters, fields, page, limit, expand) {
    return Promise.all([
        Order.find(filters, fields)
            .sort({ _id: 'asc' })
            .skip(page * limit)
            .limit(limit)
            .populate(expand),
        Order.countDocuments(filters),
    ]).then(([orders, count]) => {
        let hasMore = count > (Number(page) + 1) * Number(limit) && limit != 0;
        return { results: orders, hasMore: hasMore };
    });
};

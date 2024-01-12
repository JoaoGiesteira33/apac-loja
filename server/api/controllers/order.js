const Order = require('../models/order');

const utils = require('../utils/utils');

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

//     - replaceOrderInfo
module.exports.replaceOrderInfo = function (id, data) {
    return Order.replaceOne({ _id: id }, data).then((info) => {
        return info;
    });
};

//      - updateOrderInfo || this is used for patch request
module.exports.updateOrderInfo = function (id, data) {
    let dotData = utils.dotify(data);
    return Order.updateOne({ _id: id }, { $set: dotData }).then((info) => {
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
        let hasMore = count > (page + 1) * limit;
        return { results: orders, hasMore: hasMore };
    });
};

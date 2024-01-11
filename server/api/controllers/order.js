const Order = require('../models/order');

// METHODS:
//      - getOrderInfo
module.exports.getOrderInfo = function (id) {
    return Order.findOne({ _id: id })
        .then((info) => {
            return info;
        })
        .catch((error) => {
            return error;
        });
};

//      - createOrder
module.exports.createOrder = function (data) {
    return Order.create(data)
        .then((info) => {
            return info;
        })
        .catch((error) => {
            return error;
        });
};

//      - updateOrderInfo
module.exports.updateOrderInfo = function (id, data) {
    return Order.updateOne({_id: id}, data)
        .then((info) => {
            return info;
        })
        .catch((error) => {
            return error;
        });
};

//      - deleteOrder
module.exports.deleteOrder = function (id) {
    return Order.deleteOne({_id: id})
        .then((info) => {
            return info;
        })
        .catch((error) => {
            return error;
        });
};

//      - getOrders
module.exports.getOrders = function (filters, fields, page, limit) {
    return Promise.all([
        Order.find(filters, fields).sort({_id:'asc'}).skip(page * limit).limit(limit),
        Order.countDocuments(filters)
    ])
    .then(([orders, count]) => {
        let hasMore = count > ((page + 1) * limit);
        return {results: orders, hasMore: hasMore};
    })
    .catch((error) => {
        return error;
    });
}
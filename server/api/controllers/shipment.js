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
module.exports.createManyShipments = function (data) {
    return Shipment.insertMany(data).then((info) => {
        return info;
    });
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

// updateOrderShipmentStatus
// Push a new state to the status array
module.exports.updateShipmentStatus = function (id, value) {
    return Shipment.updateOne(
        { _id: id },
        { states: { $push: { value: value, date: Date.now() } } }
    ).then((info) => {
        return info;
    });
};

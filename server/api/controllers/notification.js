const Notification = require('../models/notification');

const utils = require('../utils/utils');

// METHODS:

//      - getNotificationInfo
module.exports.getNotificationInfo = function (id, expand) {
    return Notification.findOne({ _id: id })
        .populate(expand)
        .then((info) => {
            return info;
        });
};

//      - createNotification
module.exports.createNotification = function (data) {
    return Notification.create(data).then((info) => {
        return info;
    });
};

//     - replaceNotificationInfo
module.exports.replaceNotificationInfo = function (id, data) {
    return Notification.replaceOne({ _id: id }, data, {
        upsert: true,
    }).then((info) => {
        return info;
    });
};

//      - updateNotificationInfo || this is used for patch request
module.exports.updateNotificationInfo = function (id, data) {
    let dotData = utils.dotify(data);
    return Notification.updateOne({ _id: id }, { $set: dotData }).then(
        (info) => {
            return info;
        }
    );
};

//      - deleteNotification
module.exports.deleteNotification = function (id) {
    return Notification.deleteOne({ _id: id }).then((info) => {
        return info;
    });
};

//      - getNotifications
module.exports.getNotifications = function (
    filters,
    fields,
    page,
    limit,
    expand
) {
    return Promise.all([
        Notification.find(filters, fields)
            .sort({ _id: 'asc' })
            .skip(page * limit)
            .limit(limit)
            .populate(expand),
        Notification.countDocuments(filters),
    ]).then(([notifications, count]) => {
        let hasMore = count > (page + 1) * limit && limit != 0;
        return { results: notifications, hasMore: hasMore };
    });
};

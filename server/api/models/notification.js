const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

/**
 * Notification model
 * @typedef {Object} Notification
 * @property {ObjectId} _user - Id of the user
 * @property {String} title - Title of the notification
 * @property {String} message - Message of the notification
 * @property {Date} date - Date of the notification
 * @property {String} link - Link of the resource the notification is about
 */
const Notification = new mongoose.Schema({
    _user: {
        type: ObjectId,
        required: true,
        ref: 'userModel',
    },
    title: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        default: '',
    },
    date: {
        type: Date,
        default: Date.now,
    },
    link: {
        type: String,
        default: '',
    },
});

module.exports = mongoose.model(
    'notificationModel',
    Notification,
    'notifications'
);

const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

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

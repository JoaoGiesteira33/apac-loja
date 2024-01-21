const mongoose = require('mongoose');

const File = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    mimetype: {
        type: String,
        required: true,
    },
    size: {
        type: Number,
        required: true,
    },
    data: {
        type: Buffer,
        required: true,
    },
});

module.exports = mongoose.model('fileModel', File, 'files');

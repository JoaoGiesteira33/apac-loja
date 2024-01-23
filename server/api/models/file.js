const mongoose = require('mongoose');

/**
 * File model
 * @typedef {Object} File
 * @property {String} name - Name of the file
 * @property {String} mimetype - Mimetype of the file
 * @property {Number} size - Size of the file
 * @property {Buffer} data - Buffered Data of the file
 */
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

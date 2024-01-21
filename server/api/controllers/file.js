const File = require('../models/file');

module.exports.getFile = function (id, expand) {
    return File.findOne({ _id: id })
        .populate(expand)
        .then((info) => {
            return info;
        });
};

module.exports.createFile = function (data) {
    return File.create(data).then((info) => {
        return info;
    });
};

module.exports.createManyFiles = function (data) {
    return File.insertMany(data).then((info) => {
        return info;
    });
};

module.exports.replaceFileInfo = function (id, data) {
    return File.replaceOne({ _id: id }, data, {
        upsert: true,
    }).then((info) => {
        return info;
    });
};

module.exports.updateFileInfo = function (id, data) {
    return File.updateOne({ _id: id }, { $set: data }).then((info) => {
        return info;
    });
};

module.exports.deleteFile = function (id) {
    return File.deleteOne({ _id: id }).then((info) => {
        return info;
    });
};

module.exports.getFiles = function (filters, fields, page, limit, expand) {
    return Promise.all([
        File.find(filters, fields)
            .sort({ _id: 'asc' })
            .skip(page * limit)
            .limit(limit)
            .populate(expand),
        File.countDocuments(filters),
    ]).then(([files, count]) => {
        let hasMore = count > (page + 1) * limit && limit != 0;
        return { results: files, hasMore: hasMore };
    });
};

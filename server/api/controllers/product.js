const Product = require('../models/product');
const controllerFile = require('./file');

const utils = require('../utils/utils');

// METHODS:
//      - getProductInfo
module.exports.getProductInfo = function (id, expand) {
    return Product.findOne({ _id: id })
        .populate(expand)
        .then((info) => {
            return info;
        });
};

//      - createProduct
module.exports.createProduct = function (data) {
    return Product.create(data).then((info) => {
        return info;
    });
};

//     - replaceProductInfo
module.exports.replaceProductInfo = function (id, data) {
    return Product.replaceOne({ _id: id }, data, {
        upsert: true,
    }).then((info) => {
        return info;
    });
};

//      - updateProductInfo
module.exports.updateProductInfo = function (id, data) {
    console.log(data);
    let dotData = utils.dotify(data);
    console.log(dotData);
    return Product.updateOne({ _id: id }, { $set: dotData }).then((info) => {
        return info;
    });
};

//      - deleteProduct
module.exports.deleteProduct = function (id) {
    return Product.deleteOne({ _id: id }).then((info) => {
        return info;
    });
};

//      - getProducts
module.exports.getProducts = function (filters, fields, page, limit, expand) {
    return Promise.all([
        Product.find(filters, fields)
            .sort({ _id: 'asc' })
            .skip(page * limit)
            .limit(limit)
            .populate(expand),
        Product.countDocuments(filters),
    ]).then(([products, count]) => {
        let hasMore = count > (page + 1) * limit && limit != 0;
        return { results: products, hasMore: hasMore };
    });
};

//      - getMaxPrice
module.exports.getMaxPrice = function () {
    return Product.find()
        .sort({ price: -1 })
        .limit(1)
        .then((info) => {
            return info[0].price;
        });
};

//      - addPhotos
module.exports.addPhotos = async function (id, photos) {
    let session = await Product.startSession();
    try {
        session.startTransaction();
        let files = await controllerFile.createManyFiles(photos);
        let filePaths = files.map((file) => file._id);
        await Product.updateOne(
            { _id: id },
            { $push: { photos: { $each: filePaths } } }
        );
        await session.commitTransaction();
        return files;
    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        session.endSession();
    }
};

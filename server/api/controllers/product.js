const Product = require('../models/product');

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
    return Product.replaceOne({ _id: id }, data).then((info) => {
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

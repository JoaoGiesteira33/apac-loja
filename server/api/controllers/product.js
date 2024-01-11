const Product = require('../models/product');

// METHODS:
//      - getProductInfo
module.exports.getProductInfo = function (id, expand) {
    return Product.findOne({ _id: id }).populate(expand)
        .then((info) => {
            return info;
        })
        .catch((error) => {
            return error;
        });
};
//      - createProduct
module.exports.createProduct = function (data) {
    return Product.create(data)
        .then((info) => {
            return info;
        })
        .catch((error) => {
            return error;
        });
};
//      - updateProductInfo
module.exports.updateProductInfo = function (id, data) {
    return Product.updateOne({ _id: id }, data)
        .then((info) => {
            return info;
        })
        .catch((error) => {
            return error;
        });
};
//      - deleteProduct
module.exports.deleteProduct = function (id) {
    return Product.deleteOne({ _id: id })
        .then((info) => {
            return info;
        })
        .catch((error) => {
            return error;
        });
};

//      - getProducts
module.exports.getProducts = function (filters, fields, page, limit, expand) {
    return Promise.all([
        Product.find(filters, fields).sort({_id:'asc'}).skip(page * limit).limit(limit).populate(expand),
        Product.countDocuments(filters)
    ])
    .then(([products,count]) => {
        let hasMore = count > ((page + 1) * limit);
        return {results: products, hasMore: hasMore};
    })
    .catch((error) => {
        return error;
    });
};

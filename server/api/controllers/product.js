const Product = require('../models/product');

// METHODS:
//      - getProductInfo
module.exports.getProductInfo = function (id) {
    return Product.findOne({ _id: id })
        .then((info) => {
            return info;
        })
        .catch((erro) => {
            return erro;
        });
};
//      - createProduct
module.exports.createProduct = function (data) {
    return Product.create(data)
        .then((info) => {
            return info;
        })
        .catch((erro) => {
            return erro;
        });
};
//      - updateProductInfo
module.exports.updateProductInfo = function (id, data) {
    return Product.update({ _id: id }, data)
        .then((info) => {
            return info;
        })
        .catch((erro) => {
            return erro;
        });
};
//      - deleteProduct
module.exports.deleteProduct = function (id) {
    return Product.deleteOne({ _id: id })
        .then((info) => {
            return info;
        })
        .catch((erro) => {
            return erro;
        });
};

//      - getProducts
module.exports.getProducts = function (filters, fields, page, limit) {
    return Product.find(filters, fields).skip(page * limit).limit(limit)
        .then((info) => {
            return info;
        })
        .catch((erro) => {
            return erro;
        });
};

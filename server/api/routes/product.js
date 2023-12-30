const express = require('express');
const router = express.Router();

const controllerProduct = require('../controllers/product');
//const controllerAuth = require('../controllers/accessLevel');

const middleware = require('./myMiddleware')

// ---------------------------------------------

// GET Product Info
router.get('/:id', middleware.fieldSelector, /*controllerAuth.hasAccess,*/ function (req, res, next) {
    controllerProduct.getProductInfo(req.params.id)
        .then((info) => {
            res.jsonp(info);
        })
        .catch((erro) => {
            res.jsonp(erro);
        });
});

// POST Product Info
router.post('/', /*controllerAuth.isAdmin,*/ function (req, res, next) {
    controllerProduct.createProduct(req.body)
        .then((info) => {
            res.jsonp(info);
        })
        .catch((erro) => {
            res.jsonp(erro);
        });
});

// UPDATE Product Info
router.put('/:id', /*controllerAuth.isAdmin,*/ function (req, res, next) {
    controllerProduct.updateProductInfo(req.params.id, req.body)
        .then((info) => {
            res.jsonp(info);
        })
        .catch((erro) => {
            res.jsonp(erro);
        });
});

// DELETE Product Info
router.delete('/:id', /*controllerAuth.isAdmin,*/ function (req, res, next) {
    controllerProduct.deleteProduct(req.params.id)
        .then((info) => {
            res.jsonp(info);
        })
        .catch((erro) => {
            res.jsonp(erro);
        });
});

// GET Products
router.get('/', middleware.extractFilters, middleware.fieldSelector, /*controllerAuth.hasAccess,*/ function (req, res, next) {
    controllerProduct.getProducts(req.filters, req.fields, req.query.page || 0)
        .then((info) => {
            res.jsonp(info);
        })
        .catch((erro) => {
            res.jsonp(erro);
        });
});

module.exports = router;
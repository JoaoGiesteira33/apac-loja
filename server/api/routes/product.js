const express = require('express');
const router = express.Router();

const controllerProduct = require('../controllers/product');
//const controllerAuth = require('../controllers/accessLevel');

const middleware = require('./myMiddleware');

// ---------------------------------------------

// GET Product Info
router.get(
    '/:id',
    middleware.expandExtractor,
    middleware.fieldSelector,
    function (req, res, next) {
        controllerProduct
            .getProductInfo(req.params.id, req.expand || '')
            .then((info) => {
                res.jsonp(info);
            })
            .catch((error) => {
                res.jsonp(error);
            });
    }
);

// POST Product Info
router.post('/', function (req, res, next) {
    controllerProduct
        .createProduct(req.body)
        .then((info) => {
            res.jsonp(info);
        })
        .catch((error) => {
            res.jsonp(error);
        });
});

// PUT Product Info
router.put('/:id', function (req, res, next) {
    controllerProduct
        .replaceProductInfo(req.params.id, req.body)
        .then((info) => {
            res.jsonp(info);
        })
        .catch((error) => {
            res.jsonp(error);
        });
});

// PATCH Product Info
router.patch('/:id', function (req, res, next) {
    controllerProduct
        .updateProductInfo(req.params.id, req.body, req.query.op || 'set')
        .then((info) => {
            res.jsonp(info);
        })
        .catch((error) => {
            res.jsonp(error);
        });
});

// DELETE Product Info
router.delete('/:id', function (req, res, next) {
    controllerProduct
        .deleteProduct(req.params.id)
        .then((info) => {
            res.jsonp(info);
        })
        .catch((error) => {
            res.jsonp(error);
        });
});

// GET Products
router.get(
    '/',
    middleware.expandExtractor,
    middleware.extractFilters,
    middleware.fieldSelector,
    function (req, res, next) {
        controllerProduct
            .getProducts(
                req.filters,
                req.fields,
                req.query.page || 0,
                req.query.limit || 28,
                req.expand || ''
            )
            .then((info) => {
                res.jsonp(info);
            })
            .catch((error) => {
                res.jsonp(error);
            });
    }
);

module.exports = router;

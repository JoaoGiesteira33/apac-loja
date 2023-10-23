var express = require('express');
var router = express.Router();

var controllerProduct = require('../controllers/product');
var controllerAuth = require('../../auth/controllers/auth');

// ---------------------------------------------

// GET Product Info
router.get('/product/:id', controllerAuth.hasAccess, function (req, res, next) {
    controllerProduct.getProductInfo(req.params.id)
        .then((info) => {
            res.jsonp(info);
        })
        .catch((erro) => {
            res.jsonp(erro);
        });
});

// POST Product Info
router.post('/product', controllerAuth.isAdmin, function (req, res, next) {
    controllerProduct.createProduct(req.body)
        .then((info) => {
            res.jsonp(info);
        })
        .catch((erro) => {
            res.jsonp(erro);
        });
});

// UPDATE Product Info
router.put('/product/:id', controllerAuth.isAdmin, function (req, res, next) {
    controllerProduct.updateProductInfo(req.params.id, req.body)
        .then((info) => {
            res.jsonp(info);
        })
        .catch((erro) => {
            res.jsonp(erro);
        });
});

// DELETE Product Info
router.delete('/product/:id', controllerAuth.isAdmin, function (req, res, next) {
    controllerProduct.deleteProduct(req.params.id)
        .then((info) => {
            res.jsonp(info);
        })
        .catch((erro) => {
            res.jsonp(erro);
        });
});


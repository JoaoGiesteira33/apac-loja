const express = require('express');
const router = express.Router();

const controllerOrder = require('../controllers/order');

const middleware = require('./myMiddleware')

// ---------------------------------------------

// GET Order Info
router.get('/:id', middleware.fieldSelector, function (req, res, next) {
    controllerOrder.getOrderInfo(req.params.id)
        .then((info) => {
            res.jsonp(info);
        })
        .catch((error) => {
            res.jsonp(error);
        });
});

// POST Order Info
router.post('/', function (req, res, next) {
    controllerOrder.createOrder(req.body)
        .then((info) => {
            res.jsonp(info);
        })
        .catch((error) => {
            res.jsonp(error);
        });
});

// UPDATE Order Info
router.put('/:id', function (req, res, next) {
    controllerOrder.updateOrderInfo(req.params.id, req.body)
        .then((info) => {
            res.jsonp(info);
        })
        .catch((error) => {
            res.jsonp(error);
        });
});

// DELETE Order Info
router.delete('/:id', function (req, res, next) {
    controllerOrder.deleteOrder(req.params.id)
        .then((info) => {
            res.jsonp(info);
        })
        .catch((error) => {
            res.jsonp(error);
        });
});

// GET Orders
router.get('/', middleware.extractFilters, middleware.fieldSelector, function (req, res, next) {
    controllerOrder.getOrders(req.filters, req.fields, req.query.page || 0, req.query.limit || 28)
        .then((info) => {
            res.jsonp(info);
        })
        .catch((error) => {
            res.jsonp(error);
        });
});

module.exports = router;
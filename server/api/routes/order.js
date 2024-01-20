const express = require('express');
const router = express.Router();

const controllerOrder = require('../controllers/order');
const controllerShipment = require('../controllers/shipment');

const { hasAccess, isAdminOrAUTH } = require('../utils/utils');

const middleware = require('./myMiddleware');

// ---------------------------------------------

// GET Order Info
router.get(
    '/:id',
    middleware.expandExtractor,
    middleware.fieldSelector,
    function (req, res, next) {
        controllerOrder
            .getOrderInfo(req.params.id, req.expand || '')
            .then((info) => {
                res.jsonp(info);
            })
            .catch((error) => {
                res.jsonp(error);
            });
    }
);

// POST Order Info
router.post('/', hasAccess, function (req, res, next) {
    if (req._id && req.level != 'admin') {
        req.body._client = req._id;
    }
    //Create the shipments and then the order with their ids
    controllerOrder
        .createOrderWithShipments(req.body)
        .then((info) => {
            res.status(201).jsonp(info);
        })
        .catch((error) => {
            res.status(500).jsonp(error);
        });
});

// PUT Order Info
router.put('/:id', hasAccess, function (req, res, next) {
    controllerOrder
        .getOrderInfo(req.params.id)
        .then((order) => {
            if (req._id != order._client._id && req.level != 'admin') {
                res.status(403).jsonp({
                    error: 'You are not allowed to replace this order.',
                });
            } else {
                controllerOrder
                    .replaceOrderInfo(req.params.id, req.body)
                    .then((info) => {
                        if (info.matchedCount == 0) {
                            res.status(201);
                        } else {
                            res.status(204);
                        }
                    })
                    .catch((error) => {
                        res.status(500).jsonp(error);
                    });
            }
        })
        .catch((error) => {
            res.status(500).jsonp(error);
        });
});

// PATCH Order Info
router.patch('/:id', function (req, res, next) {
    controllerOrder
        .getOrderInfo(req.params.id)
        .then((order) => {
            if (req._id != order._client._id && req.level != 'admin') {
                res.status(403).jsonp({
                    error: 'You are not allowed to update this order.',
                });
            } else {
                controllerOrder
                    .updateOrderInfo(req.params.id, req.body)
                    .then((info) => {
                        res.status(204);
                    })
                    .catch((error) => {
                        res.status(500).jsonp(error);
                    });
            }
        })
        .catch((error) => {
            res.status(500).jsonp(error);
        });
});

// DELETE Order Info
router.delete('/:id', isAdminOrAUTH, function (req, res, next) {
    controllerOrder
        .deleteOrder(req.params.id)
        .then((info) => {
            res.status(204);
        })
        .catch((error) => {
            res.status(500).jsonp(error);
        });
});

// GET Orders
router.get(
    '/',
    middleware.expandExtractor,
    middleware.extractFilters,
    middleware.fieldSelector,
    function (req, res, next) {
        if (req._id && req.level != 'admin') {
            req.filters._client = req._id;
        }
        controllerOrder
            .getOrders(
                req.filters,
                req.fields,
                req.query.page || 0,
                req.query.limit || 28,
                req.expand || ''
            )
            .then((info) => {
                res.status(200).jsonp(info);
            })
            .catch((error) => {
                res.status(500).jsonp(error);
            });
    }
);

module.exports = router;

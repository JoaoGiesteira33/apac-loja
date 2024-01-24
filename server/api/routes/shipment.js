const express = require('express');
const router = express.Router();

const controllerShipment = require('../controllers/shipment');

const { hasAccess, isAdminOrAUTH } = require('../utils/utils');

const middleware = require('./myMiddleware');

// ---------------------------------------------

// GET Shipment Info
router.get(
    '/:id',
    middleware.expandExtractor,
    middleware.fieldSelector,
    hasAccess,
    function (req, res, next) {
        controllerShipment
            .getShipmentInfo(req.params.id, req.expand || '')
            .then((info) => {
                if (
                    (info._client._id != req._id &&
                        info._seller._id != req._id) ||
                    req.level != 'admin'
                ) {
                    res.status(403).jsonp({
                        error: 'You are not allowed to see this shipment.',
                    });
                }
                res.status(200).jsonp(info);
            })
            .catch((error) => {
                res.status(500).jsonp(error);
            });
    }
);

// POST Shipment Info
router.post('/', isAdminOrAUTH, function (req, res, next) {
    controllerShipment
        .createShipment(req.body)
        .then((info) => {
            res.status(201).jsonp(info);
        })
        .catch((error) => {
            res.status(500).jsonp(error);
        });
});

// PUT Shipment Info
router.put('/:id', isAdminOrAUTH, function (req, res, next) {
    controllerShipment
        .replaceShipmentInfo(req.params.id, req.body)
        .then((info) => {
            if (info.matchedCount == 0) {
                res.status(201).jsonp(info);
            } else {
                res.status(200).jsonp(info);
            }
        })
        .catch((error) => {
            res.status(500).jsonp(error);
        });
});

// PATCH Shipment Info
router.patch('/:id', isAdminOrAUTH, function (req, res, next) {
    controllerShipment
        .updateShipmentInfo(req.params.id, req.body)
        .then((info) => {
            if (info.matchedCount == 1) {
                res.status(200).jsonp(info);
            } else {
                res.status(400).jsonp({
                    error: 'Error updating shipment info.',
                });
            }
        })
        .catch((error) => {
            res.status(500).jsonp(error);
        });
});

// DELETE Shipment Info
router.delete('/:id', isAdminOrAUTH, function (req, res, next) {
    controllerShipment
        .deleteShipment(req.params.id)
        .then((info) => {
            res.status(200).jsonp(info);
        })
        .catch((error) => {
            res.status(500).jsonp(error);
        });
});

// GET Shipments
router.get(
    '/',
    middleware.expandExtractor,
    middleware.fieldSelector,
    middleware.extractFilters,
    hasAccess,
    function (req, res, next) {
        if (req._id && req.level != 'admin') {
            req.filters = req.filters || {};
            req.filters._client = req._id;
        }
        controllerShipment
            .getShipments(
                req.filters,
                req.fields,
                req.page,
                req.limit,
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

router.post('/:id/states', hasAccess, function (req, res, next) {
    controllerShipment
        .getShipmentInfo(req.params.id)
        .then((info) => {
            if (
                info._client._id != req._id &&
                info._seller._id != req._id &&
                req.level != 'admin'
            ) {
                res.status(403).jsonp({
                    error: 'You are not allowed to change this shipment.',
                });
            }
            controllerShipment
                .updateShipmentState({ _id: req.params.id }, req.body.value)
                .then((info) => {
                    res.status(201).jsonp(info);
                })
                .catch((error) => {
                    res.status(500).jsonp(error);
                });
        })
        .catch((error) => {
            res.status(500).jsonp(error);
        });
});

module.exports = router;

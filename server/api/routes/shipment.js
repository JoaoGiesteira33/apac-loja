const express = require('express');
const router = express.Router();

const controllerShipment = require('../controllers/shipment');

const middleware = require('./myMiddleware');

// ---------------------------------------------

// GET Shipment Info
router.get(
    '/:id',
    middleware.expandExtractor,
    middleware.fieldSelector,
    function (req, res, next) {
        controllerShipment
            .getShipmentInfo(req.params.id, req.expand || '')
            .then((info) => {
                res.jsonp(info);
            })
            .catch((error) => {
                res.jsonp(error);
            });
    }
);

// POST Shipment Info
router.post('/', function (req, res, next) {
    controllerShipment
        .createShipment(req.body)
        .then((info) => {
            res.jsonp(info);
        })
        .catch((error) => {
            res.jsonp(error);
        });
});

// PUT Shipment Info
router.put('/:id', function (req, res, next) {
    controllerShipment
        .replaceShipmentInfo(req.params.id, req.body)
        .then((info) => {
            res.jsonp(info);
        })
        .catch((error) => {
            res.jsonp(error);
        });
});

// PATCH Shipment Info
router.patch('/:id', function (req, res, next) {
    controllerShipment
        .updateShipmentInfo(req.params.id, req.body)
        .then((info) => {
            res.jsonp(info);
        })
        .catch((error) => {
            res.jsonp(error);
        });
});

// DELETE Shipment Info
router.delete('/:id', function (req, res, next) {
    controllerShipment
        .deleteShipment(req.params.id)
        .then((info) => {
            res.jsonp(info);
        })
        .catch((error) => {
            res.jsonp(error);
        });
});

// GET Shipments
router.get(
    '/',
    middleware.expandExtractor,
    middleware.fieldSelector,
    middleware.extractFilters,
    function (req, res, next) {
        controllerShipment
            .getShipments(
                req.filters,
                req.fields,
                req.page,
                req.limit,
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

router.post('/:id/states', function (req, res, next) {
    controllerShipment
        .updateShipmentStatus(req.params.id, req.body.value)
        .then((info) => {
            res.jsonp(info);
        })
        .catch((error) => {
            res.jsonp(error);
        });
});

module.exports = router;

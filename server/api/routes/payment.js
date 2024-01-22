const express = require('express');
const router = express.Router();
const controllerPaypal = require('../controllers/paypal');
const controllerEupago = require('../controllers/eupago');
const { hasAccess } = require('../utils/utils');

// ***************************************
// *              PayPal                 *
// ***************************************

// POST Paypel Request
router.post('/paypal/orders', hasAccess, function (req, res) {
    if (req.body._client != req._id) {
        res.status(403).jsonp({
            error: 'Not allowed to create order.',
        });
    } else {
        console.log("Creating Paypal order=", req.body);
        controllerPaypal.createPaypalOrder(req.body)
            .then(rep => res.status(rep.httpStatusCode).json(rep.jsonResponse))
            .catch(error => {
                console.log("Failed to create order: ", error);
                res.status(500).jsonp({ error: "Failed to create order: ", error });
            });
    }
});

router.post("/paypal/orders/:paypalOrderId/capture", hasAccess, function (req, res) {
    controllerPaypal.capturePaypalOrder(req.params.paypalOrderId)
        .then((rep) => { 
            res.status(rep.httpStatusCode).json(rep.jsonResponse);
            // TODO atualizar order status (paypalOrderId != orderId)
        })
        .catch ((error) => {
            console.log("Failed to create order:", error);
            res.status(500).json({ error: "Failed to capture order." });
        });
});

// ***************************************
// *               EuPago                *
// ***************************************
// TODO criar callback/webhook
// POST EuPago MBWay Request
router.post('/eupago/mbway/orders', hasAccess, function (req, res) {
    if (req.body._client != req._id) {
        res.status(403).jsonp({
            error: 'Not allowed to create order.',
        });
    } else {
        console.log("Creating EuPago order=", req.body);
        controllerEupago.createEuPagoMBWayOrder(req.body)
        .then(response => res.status(response.httpStatusCode).json(response.jsonResponse))
        .catch(error => {
            console.log("Failed to create order: ", error);
            res.status(500).json({ error: "Failed to create order: ", error });
        });
    }
});

// POST EuPago Credit Card Request
router.post('/eupago/creditCard/orders', hasAccess, function (req, res) {
    if (req.body._client != req._id) {
        res.status(403).jsonp({
            error: 'Not allowed to create order.',
        });
    } else {
        console.log("Creating EuPago Credit Card order=", req.body);
        controllerEupago.createEuPagoCreditCardOrder(req.body)
            .then(response => res.status(response.httpStatusCode).json(response.jsonResponse))
            .catch(error => {
                console.log("Failed to create order: ", error);
                res.status(500).json({ error: "Failed to create order: ", error });
            });
    }
});

// EuPago webhook payment confirmation
router.get('/eupago/webhook', hasAccess, function (req, res) {
    console.log("Received EuPago Webhook: ", req.query);
    controllerEupago.receiveEuPagoWebhook(req.query)
        .then(response => res.status(response.httpStatusCode).json(response.jsonResponse))
        .catch(error => {
            console.log("Failed to process webhook: ", error);
            res.status(500).json({ error: "Failed to process webhook: ", error });
        });
});

module.exports = router;
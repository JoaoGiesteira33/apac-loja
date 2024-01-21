const express = require('express');
const router = express.Router();
const controllerPayment = require('../controllers/payment');
const middleware = require('./myMiddleware');

// ***************************************
// *              PayPal                 *
// ***************************************

// POST Paypel Request
router.post('/paypal/orders', function (req, res) {
    console.log("Creating Paypal order=", req.body);

    // use the cart information passed from the front-end to calculate the order amount detals
    controllerPayment.createPaypalOrder(req.body)
        .then(rep => res.status(rep.httpStatusCode).json(rep.jsonResponse))
        .catch(error => {
            console.log("Failed to create order: ", error);
            res.status(500).jsonp({ error: "Failed to create order: ", error });
        });
});

router.post("/paypal/orders/:paypalOrderId/capture", function (req, res) {
    capturePaypalOrder(req.params.paypalOrderId)
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
router.post('/eupago/mbway/orders', function (req, res) {
    console.log("Creating EuPago order=", req.body);

    controllerPayment.createEuPagoMBWayOrder(req.body, 0.25)
    .then(response => res.status(response.httpStatusCode).json(response.jsonResponse))
    .catch(error => {
        console.log("Failed to create order: ", error);
        res.status(500).json({ error: "Failed to create order: ", error });
    });
});

// POST EuPago Credit Card Request
router.post('/eupago/creditCard/orders', function (req, res) {
    console.log("Creating EuPago Credit Card order=", req.body);

    controllerPayment.createEuPagoCreditCardOrder(req.body)
        .then(response => res.status(response.httpStatusCode).json(response.jsonResponse))
        .catch(error => {
            console.log("Failed to create order: ", error);
            res.status(500).json({ error: "Failed to create order: ", error });
        });
});

// EuPago webhook payment confirmation
router.get('/eupago/webhook', function (req, res) {
    console.log("Received EuPago Webhook: ", req.query);

    controllerPayment.receiveEuPagoWebhook(req.query)
        .then(response => res.status(response.httpStatusCode).json(response.jsonResponse))
        .catch(error => {
            console.log("Failed to process webhook: ", error);
            res.status(500).json({ error: "Failed to process webhook: ", error });
        });
});

module.exports = router;
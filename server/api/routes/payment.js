const express = require('express');
const router = express.Router();
const controllerPayment = require('../controllers/payment');
const middleware = require('./myMiddleware');

// POST Paypel Request
router.post('/paypal/orders', function (req, res) {
    // TODO check server owned token

    // TODO send pay request to paypal
    // use the cart information passed from the front-end to calculate the order amount detals
    controllerPayment.createOrder(req.body.cart)
        .then((rep) => { res.status(rep.httpStatusCode).json(rep.jsonResponse); })
        .catch((error) => {
            console.error("Failed to create order:", error);
            res.status(500).json({ error: "Failed to create order." });
        });
});

router.post("/paypal/orders/:paypalOrderId/capture", function (req, res) {
    captureOrder(req.body.paypalOrderId)
        .then((rep) => { res.status(rep.httpStatusCode).json(rep.jsonResponse); })
        .catch ((error) => {
            console.error("Failed to create order:", error);
            res.status(500).json({ error: "Failed to capture order." });
        });

    // TODO atualizar order status (paypalOrderId != orderId)
});

// POST EuPago Request
router.post('/eupago', function (req, res, next) {

});

module.exports = router;
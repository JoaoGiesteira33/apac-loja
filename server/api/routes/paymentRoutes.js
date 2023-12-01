const express = require('express');
const router = express.Router();

const paypalPaymentService = require('../paymentServices/paypalPayment')

router.post('/paypal/create-order', (req, res) => {
    paypalPaymentService.createOrder(req, res);
})

// TODO ver para que é que isto serve
router.post('/pay', async (req, res) => {
    try {

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// TODO ver para que é que isto serve
router.post('/webhook', async (req, res) => {
    try {
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

module.exports = router;

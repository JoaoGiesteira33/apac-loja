const paypalPaymentService = require('../paymentServices/paypalPayment');
const eupagoPaymentService = require('../paymentServices/eupagoPayment');
const mbwayPaymentService = require('../paymentServices/mbwayPayment');
const skrillPaymentService = require('../paymentServices/skrillPayment');
const stripPaymentService = require('../paymentServices/stripPayment');

async function initiatePayment(req, res) {
    try {
        const { method, amount, otherPaymentDetails } = req.body;

        let paymentService;
        switch (method) {
            case 'PayPal':
                paymentService = paypalPaymentService;
                break;
            case 'MBWay':
                paymentService = eupagoPaymentService;
                break;
            case 'EuPago':
                paymentService = mbwayPaymentService;
                break;
            case 'Skrill':
                paymentService = skrillPaymentService;
                break;
            case 'Strip':
                paymentService = stripPaymentService;
                break;
            default:
                return res.status(400).json({ success: false, message: 'Invalid payment method' });
        }

        const paymentResult = await paymentService.initiatePayment(amount, otherPaymentDetails);

        if (paymentResult.success) {
            return res.status(200).json({ success: true, paymentResult });
        } else {
            return res.status(500).json({ success: false, message: paymentResult.message });
        }
    } catch (error) {
        console.error('Payment initiation error:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

module.exports = {
    initiatePayment,
};

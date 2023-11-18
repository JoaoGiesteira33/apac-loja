// FIXME CORRIGIR PÁGINA NO GERAL, APENA EXEMPLO DE ESTRUTURA

const paypal = require('paypal-sdk'); // TODO - isto é só exemplo

async function initiatePayPalPayment(amount, otherPaymentDetails) {
    try {
        const paypalClient = paypal.configure({
            clientId: 'YOUR_PAYPAL_CLIENT_ID',
            clientSecret: 'YOUR_PAYPAL_CLIENT_SECRET',
            environment: 'sandbox', // Change to 'live' for production
        }); // TODO - ver o que é sandbox

        // Set up the payment details
        const paymentDetails = {
            intent: 'sale',
            payer: {
                payment_method: 'paypal',
            },
            transactions: [
                {
                    amount: {
                        total: amount.toString(),
                        currency: 'USD',
                    },
                    description: 'Payment for art purchase',
                },
            ],
            // TODO - adicionar mais cenas de acordo com o preciso
        };

        // Create a PayPal payment
        const createPaymentResponse = await paypalClient.payment.create(paymentDetails);

        // Redirect the user to PayPal for payment approval
        const approvalUrl = createPaymentResponse.links.find(link => link.rel === 'approval_url').href;

        return { success: true, approvalUrl };
    } catch (error) {
        console.error('PayPal payment error:', error.message);
        return { success: false, message: 'PayPal payment initiation failed' };
    }
}

module.exports = {
  initiatePayPalPayment,
};

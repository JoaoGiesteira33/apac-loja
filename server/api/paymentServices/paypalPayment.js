// FIXME CORRIGIR PÁGINA NO GERAL, APENA EXEMPLO DE ESTRUTURA

//const endpointURL = environment === 'sandbox' ? proccess.env.PAYPAL_SANDBOX_URL : proccess.env.PAYPAL_URL
const clientId = proccess.env.PAYPAL_CLIENT_ID;
const clientSecret = proccess.env.PAYPAL_CLIENT_SECRET_KEY;
const Environment = 
    proccess.env.PAYPAL_ENVIRONMENT === 'sandbox'
        ? paypal.core.LiveEnvironment
        : paypal.core.SandboxEnvironment;

const paypal = require('@paypal/checkout-server-sdk');
const paypalClient = new paypal.core.PayPalHttpClient(
    new Environment(clientId, clientSecret)
);

async function createOrder (req, res) {
    const request = paypal.orders.OrdersCreateRequest();
    const total = req.body.items.reduce((sum, item) => {
        return sum + storeItems.get(item.id).price * item.quantity // FIXME storeItems = serviço catálogo
    }, 0);
    request.prefer('return=representation');
    request.requestBody({
        intent: 'CAPTURE',
        purchase_units: [
            {
                amount: {
                    currency_code: 'EUR', // TODO confirmar código
                    value: total,
                    breakdown: {
                        // TODO ver como adicionar tax total ou shipment total aqui
                        item_total: {
                            currency_code: 'EUR',
                            value: total
                        }
                    }
                },
                items: req.body.items.map(item => {
                    const storeItem = storeItems.get(item.id) // FIXME storeItems = serviço catálogo
                    return {
                        name: storeItem.name,
                        unit_amount: {
                            currency_code: 'EUR',
                            value: item.price
                        },
                        quantity: item.quantity
                    }
                })
            }
        ]
    });

    try {
        const order = await paypalClient.execute(request);
        console.log(order);
        res.status(200).json({ id: order.result.id });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}

module.exports.createOrder = createOrder;
var secrets = require('docker-secret').secrets;

const utils = require('../utils/utils');
const Orders = require('../controllers/order');
const Products = require('../controllers/product');
const paypalBaseUrl = PAYPAL_ENVIRONMENT == "sandbox" 
    ? PAYPAL_SANDBOX_URL
    : PAYPAL_LIVE_URL;
const eupagoBaseUrl = EUPAGO_ENVIRONMENT == "sandbox" 
    ? EUPAGO_SANDBOX_URL
    : EUPAGO_LIVE_URL;

// ***************************************
// *              PayPal                 *
// ***************************************

/**
* Generate an OAuth 2.0 access token for authenticating with PayPal REST APIs.
* @see https://developer.paypal.com/api/rest/authentication/
*/
const generatePaypalAccessToken = async function() {
    try {
        if (!secrets.PAYPAL_CLIENT_ID || !secrets.PAYPAL_CLIENT_SECRET) {
            throw new Error("MISSING_API_CREDENTIALS");
        }
        const auth = Buffer.from(
            secrets.PAYPAL_CLIENT_ID + ":" + secrets.PAYPAL_CLIENT_SECRET,
        ).toString("base64");
        const response = await fetch(`${paypalBaseUrl}/v1/oauth2/token`, {
            method: "POST",
            body: "grant_type=client_credentials",
            headers: {
                Authorization: `Basic ${auth}`,
            },
        });
        const data = await response.json();
        return data.access_token;
    } catch (error) {
        console.log("Failed to generate Access Token:", error);
    }
};

/**
* Create an order to start the transaction.
* @see https://developer.paypal.com/docs/api/orders/v2/#orders_create
*/
module.exports.createPaypalOrder = async function(cart, currency) {
    // use the cart information passed from the front-end to calculate the purchase unit details
    if (!cart || !Array.isArray(cart)) {
        return res.status(400).json({ error: 'Invalid JSON body' });
    }

    let cartValue = 0;
    calculateCartValue(cart)
        .then(value => { cartValue = value; })
        .catch(error => { throw error; });

    const accessToken = await generatePaypalAccessToken();
    const url = `${paypalBaseUrl}/v2/checkout/orders`;
    const payload = {
        intent: "CAPTURE",
        purchase_units: [
            {
                amount: {
                    currency_code: currency, // 'EUR'
                    value: cartValue,
                },
            },
        ],
    };

    const res = fetch(url, 
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
                // Uncomment one of these to force an error for negative testing (in sandbox mode only). Documentation:
                // https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/
                // "PayPal-Mock-Response": '{"mock_application_codes": "MISSING_REQUIRED_PARAMETER"}'
                // "PayPal-Mock-Response": '{"mock_application_codes": "PERMISSION_DENIED"}'
                // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
            },
            method: "POST",
            body: JSON.stringify(payload),
        })
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));

    return res;
};

/**
* Capture payment for the created order to complete the transaction.
* @see https://developer.paypal.com/docs/api/orders/v2/#orders_capture
*/
module.exports.capturePaypalOrder = async function(paypalOrderId) {
    const accessToken = await generatePaypalAccessToken();
    const url = `${paypalBaseUrl}/v2/checkout/orders/${paypalOrderId}/capture`;
    
    const res = fetch(url, 
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
                // Uncomment one of these to force an error for negative testing (in sandbox mode only). Documentation:
                // https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/
                // "PayPal-Mock-Response": '{"mock_application_codes": "INSTRUMENT_DECLINED"}'
                // "PayPal-Mock-Response": '{"mock_application_codes": "TRANSACTION_REFUSED"}'
                // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
            },
        })
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));

    return res;
};

// ***************************************
// *               EuPago                *
// ***************************************

module.exports.createEuPagoMBWayOrder(currency, cart, customer) = async function(cart) {
    let cartValue = 0;
    calculateCartValue(data.cart)
        .then(value => { cartValue = value; })
        .catch(error => { throw error; });
    // TODO gerar api key
    const options = {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          Authorization: '' // TODO api key
        },
        body: JSON.stringify({
            payment: {
                amount: {
                    currency: data.currency, 
                    value: cartValue
                },
                identifier: data.identifier,
                customerPhone: data.customer.phone,
                countryCode: data.customer.countryCode
            }
        })
    };

    const res = fetch(`${eupagoBaseUrl}/api/v1.02/mbway/create`, options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
    
    return res;
}

module.exports.createEuPagoCreditCardOrder(data) = async function(cart) {
    let cartValue = 0;
    calculateCartValue(data.cart)
        .then(value => { cartValue = value; })
        .catch(error => { throw error; });
    // TODO gerar api key
    const options = {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: '' // TODO api key
        },
        body: JSON.stringify({
            payment: {
                amount: {
                    currency: data.currency, 
                    value: cartValue
                },
                lang: data.lang, // 'PT'
                identifier: data.identifier,
                successUrl: data.successUrl,
                failUrl: data.failUrl,
                backUrl: data.backUrl
            },
            customer: {
                notify: data.customer.notify,
                email: data.customer.email
            }
        })
    };

    const res = fetch(`${eupagoBaseUrl}/api/v1.02/creditcard/create`, options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));

    return res;
}

function calculateCartValue(cart) {
    let cartValue = 0;
    cart.forEach((item) => {
        Products.getProductInfo(item.id)
        .then((info) => {
            console.log(info);
            cartValue += (info.price * item.amount) || 0;
        })
        .catch((error) => {
            throw new Error("Error getting product prices: " + error);
        });
    });
    return cartValue;
}

// host static files
// TODO for reference app.use(express.static("client"));
// serve index.html
//app.get("/", (req, res) => {
//    res.sendFile(path.resolve("./client/checkout.html"));
//});
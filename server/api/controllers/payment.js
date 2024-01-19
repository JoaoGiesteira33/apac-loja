var secrets = require('docker-secret').secrets;

const utils = require('../utils/utils');
const Orders = require('../controllers/order');
const Products = require('../controllers/product');
const shipment = require('../models/shipment');
const paypalBaseUrl = secrets.PAYPAL_ENVIRONMENT == "sandbox" 
    ? secrets.PAYPAL_SANDBOX_URL
    : secrets.PAYPAL_LIVE_URL;
const eupagoBaseUrl = secrets.EUPAGO_ENVIRONMENT == "sandbox" 
    ? secrets.EUPAGO_SANDBOX_URL
    : secrets.EUPAGO_LIVE_URL;

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
module.exports.createPaypalOrder = async function(data) {
    // use the cart information passed from the front-end to calculate the purchase unit details
    if (data.cart && Array.isArray(data.cart)) {
        let tmpValue = 0;
        for (const item of data.cart) {
            try {
                const product = await Products.getProductInfo(item._product);
                const value = await product.price;
                tmpValue += value * item.amount;
            } catch (error) {
                throw new Error("Error getting product prices: " + error);
            }
        }
        let percentage = data.reservation == true ? 0.25 : 0.75;
        let cartValue = (Math.round(tmpValue * percentage * 100) / 100).toFixed(2);
        console.log("Total cart value: " + cartValue);

        try {
            const accessToken = await generatePaypalAccessToken();
            const url = `${paypalBaseUrl}/v2/checkout/orders`;
            const payload = {
                intent: "CAPTURE",
                purchase_units: [
                    {
                        amount: {
                            currency_code: data.currency, // 'EUR'
                            value: cartValue,
                        },
                    },
                ],
            };

            const response = await fetch(url, 
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
                });

            return handlePaypalResponse(response, data);
        } catch (err) {
            throw new Error("Error on request to Paypal: ", err);
        }
    } else {
        throw new Error("Error: Empty or invalid cart");
    }
};

/**
* Capture payment for the created order to complete the transaction.
* @see https://developer.paypal.com/docs/api/orders/v2/#orders_capture
*/
module.exports.capturePaypalOrder = async function(paypalOrderId) {
    try {
        const accessToken = await generatePaypalAccessToken();
        const url = `${paypalBaseUrl}/v2/checkout/orders/${paypalOrderId}/capture`;
        
        const response = await fetch(url, 
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
            });
    
        return handlePaypalResponse(response);
    } catch (err) {
        throw err;
    }
};

// ***************************************
// *               EuPago                *
// ***************************************

module.exports.createEuPagoMBWayOrder = async function(data) {
    if (data.cart && Array.isArray(data.cart)) {
        let tmpValue = 0;
        for (const item of data.cart) {
            try {
                const product = await Products.getProductInfo(item._product);
                const value = await product.price;
                tmpValue += value * item.amount;
            } catch (error) {
                throw new Error("Error getting product prices: " + error);
            }
        }
        let percentage = data.reservation == true ? 0.25 : 0.75;
        let cartValue = (Math.round(tmpValue * percentage * 100) / 100).toFixed(2);
        console.log("Total cart value: " + cartValue);

        try {
            const options = {
                method: 'POST',
                headers: {
                  accept: 'application/json',
                  'content-type': 'application/json',
                  Authorization: `ApiKey ${secrets.EUPAGO_API_KEY}`
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
            const response = await fetch(`${eupagoBaseUrl}/api/v1.02/mbway/create`, options);
            return handleEuPagoResponse(response, data);      
        } catch (err) {
            throw err;
        }
    } else {
        throw new Error("Error: Empty or invalid cart");
    }
}

module.exports.createEuPagoCreditCardOrder = async function(data) {
    if (data.cart && Array.isArray(data.cart)) {
        let tmpValue = 0;
        for (const item of data.cart) {
            try {
                const product = await Products.getProductInfo(item._product);
                const value = await product.price;
                tmpValue += value * item.amount;
            } catch (error) {
                throw new Error("Error getting product prices: " + error);
            }
        }
        let percentage = data.reservation == true ? 0.25 : 0.75;
        let cartValue = (Math.round(tmpValue * percentage * 100) / 100).toFixed(2);
        console.log("Total cart value: " + cartValue);

        try {
            const options = {
                method: 'POST',
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    Authorization: `ApiKey ${secrets.EUPAGO_API_KEY}`
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

            const response = await fetch(`${eupagoBaseUrl}/api/v1.02/creditcard/create`, options);
            return handleEuPagoResponse(response, data);
        } catch (err) {
            throw err;
        }
    } else {
        throw new Error("Error: Empty or invalid cart");
    }
}

// Utils

async function handlePaypalResponse(response, data) {
    try {
        var jsonResponse = await response.json();
        var status = response.status;
        if (200 <= status <= 299) {
            try {
                await Orders.createOrderWithShipments({
                    shipments: data.shipments.map(shipment => ({
                        ...shipment,
                        "states": [{}],
                    })),
                    payment: {
                        transactionId: jsonResponse.id,
                        method: 'paypal'
                    },
                    "_client": data._client
                })
            } catch (error) {
                status = 500;
                jsonResponse = { "error": "Could not create Paypal order" };
            }
        }
        return {
            jsonResponse,
            httpStatusCode: status,
        };
    } catch (err) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    }
}

async function handleEuPagoResponse(response, data) {
    try {
        var jsonResponse = await response.json();
        var status = jsonResponse.transactionStatus == "Success"
            ? 200
            : 401
        if (status == 200) {
            try {
                await Orders.createOrderWithShipments({
                    shipments: data.shipments.map(shipment => ({
                        ...shipment,
                        "states": [{}],
                    })),
                    payment: {
                        transactionId: jsonResponse.transactionId,
                        method: 'eupago'
                    },
                    "_client": data._client
                })
            } catch (error) {
                status = 500;
                jsonResponse = { "error": "Could not create EuPago order" };
            }
        }
        return {
            jsonResponse,
            httpStatusCode: status,
        };
    } catch (err) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    }
}

//const generateEuPagoBearerToken = async function() {
//    if (!secrets.EUPAGO_CLIENT_ID || !secrets.EUPAGO_CLIENT_SECRET) {
//        throw new Error("MISSING_API_CREDENTIALS");
//    }
//
//    const options = {
//        method: 'POST',
//        headers: {
//            accept: 'application/json',
//            'content-type': 'application/json'
//        },
//        body: JSON.stringify({
//            grant_type: 'client_credentials',
//            client_id: secrets.EUPAGO_CLIENT_ID,
//            client_secret: secrets.EUPAGO_CLIENT_SECRET,
//            username: secrets.EUPAGO_USERNAME,
//            password: secrets.EUPAGO_PASSWORD
//        })
//    };
//    try {
//        const res = await fetch('https://sandbox.eupago.pt/api/auth/token', options);
//        const data = await res.json();
//        console.log(data)
//        return data.access_token;
//    } catch (error) {
//        console.log("Failed to generate Access Token:", error);
//    }
//}

// host static files
// TODO for reference app.use(express.static("client"));
// serve index.html
//app.get("/", (req, res) => {
//    res.sendFile(path.resolve("./client/checkout.html"));
//});
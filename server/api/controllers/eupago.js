var secrets = require('docker-secret').secrets;

const Orders = require('../controllers/order');
const Products = require('../controllers/product');
const Shipments = require('../controllers/shipment');
const eupagoBaseUrl = secrets.EUPAGO_ENVIRONMENT == "sandbox" 
    ? secrets.EUPAGO_SANDBOX_URL
    : secrets.EUPAGO_LIVE_URL;

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

module.exports.receiveEuPagoWebhook = async function(data) {
    try {
        const shipmentsArray = await Shipments.getShipments(
            {"payments.transactionId": data.transactionId}, 
            {}, 0, 0, '');
        console.log("Shipments=", shipmentsArray);
        for (const shipment of shipmentsArray.results) {
            console.log("ShipmentId=", shipment._id);
            const len = shipment.states.length - 1;
            const oldState = shipment.states[len];
            if (oldState.value != 'unpaid' && oldState.value != 'reserved') {
                return {
                    httpStatusCode: 500,
                    jsonResponse: {
                        errorMessage: "Could not process webhook"
                    },
                };
            }
            const updatedState = oldState.value == 'unpaid' ? 'pending' : 'paid';
    
            await Shipments.updateShipmentState({ '_id': shipment._id }, updatedState);
        }
        return {
            httpStatusCode: 200,
            jsonResponse: {
                message: "Processed EuPago webhook successfully!",
                transactionId: data.transactionId,
            },
        };
    } catch {
        return {
            httpStatusCode: 500,
            jsonResponse: {
                errorMessage: "Could not process webhook"
            },
        };
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
                if (data.reservation) {
                    await Orders.createOrderWithShipments({
                        shipments: data.shipments.map(shipment => ({
                            ...shipment,
                            "states": [{}],
                            payments: [
                                {
                                    transactionId: jsonResponse.transactionID,
                                    method: "eupago",
                                    reference: jsonResponse.reference
                                }
                            ]
                        })),
                        "_client": data._client
                    });
                } else {
                    for(const element of data.cart) {
                        await Shipments.addPaymentInfo(
                            { _product: element._product },
                            {
                                transactionId: jsonResponse.transactionID,
                                method: 'eupago',
                                reference: jsonResponse.reference
                            }
                        );
                    }
                }
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
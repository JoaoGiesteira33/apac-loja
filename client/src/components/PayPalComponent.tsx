import React from 'react';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';

// This value is from the props in the UI
const style = { layout: 'vertical' };

function createOrder() {
    // replace this url with your server
    return fetch(
        'http://localhost:11000/payment/paypal/orders?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluQGdtYWlsLmNvbSIsImxldmVsIjoiYWRtaW4iLCJfaWQiOiI2NWExOTUwZTVhYzYyYzRlNDI4ZGQyOTMiLCJpYXQiOjE3MDU5NzE3OTUsImV4cCI6MTcwNjA1ODE5NX0.I5_sR-b756KyYQbUgJ0yHfO0flv1vHe5hKqN4ndFB1g',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            // use the "body" param to optionally pass additional order information
            // like product ids and quantities
            body: JSON.stringify({
                reservation: 'true',
                currency: 'EUR',
                cart: [
                    {
                        _product: '65a1950e5ac62c4e428dd293', // test
                        amount: 1,
                    },
                ],
                _client: '65a1950e5ac62c4e428dd293',
                address: {
                    postal_code: '4710-111',
                    city: 'Braga',
                    country: 'Portugal',
                    street: 'Rua dos Peos',
                },
                shipments: [
                    {
                        _product: '65a5243ba5028940d4e50aac',
                        _seller: '65a522f06db87428b203c172',
                    },
                ],
            }),
        }
    )
        .then((response) => response.json())
        .then((order) => {
            // Your code here after create the order
            return order.id;
        });
}
function onApprove(data) {
    // replace this url with your server
    return fetch(
        'https://react-paypal-js-storybook.fly.dev/api/paypal/capture-order',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                orderID: data.orderID,
            }),
        }
    )
        .then((response) => response.json())
        .then((orderData) => {
            // Your code here after capture the order
            alert('Order Approved!');
        });
}

// Custom component to wrap the PayPalButtons and show loading spinner
const ButtonWrapper = ({ showSpinner }) => {
    const [{ isPending }] = usePayPalScriptReducer();

    return (
        <>
            {showSpinner && isPending && <div className="spinner" />}
            <PayPalButtons
                style={style}
                disabled={false}
                forceReRender={[style]}
                fundingSource={'paypal'}
                createOrder={createOrder}
                onApprove={onApprove}
            />
        </>
    );
};

const PayPalComponent = () => {
    return (
        <div>
            <ButtonWrapper showSpinner={false} />
        </div>
    );
};

export default PayPalComponent;

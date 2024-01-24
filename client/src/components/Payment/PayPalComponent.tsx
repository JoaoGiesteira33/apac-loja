import { PayPalButtons } from '@paypal/react-paypal-js';
import { OrderType } from '../../types/order';
import { Address, User } from '../../types/user';
import { API_URL_PAY } from '../../fetchers';
import { useState } from 'react';
import useCart from '../../hooks/useCart';

// This value is from the props in the UI
const style = {
    color: 'silver',
    layout: 'horizontal',
    height: 48,
    tagline: false,
};

const PayPalComponent = () => {
    const { cart } = useCart();
    const user = JSON.parse(localStorage.getItem('user') as string) as User;
    if (user === null) {
        return <div>Utilizador não encontrado</div>;
    }
    const address = user.client_fields?.demographics.address as Address;
    const [paidFor, setPaidFor] = useState(false);
    const token = localStorage.getItem('token');

    /**
     * This function is called when the user clicks on the PayPal button
     */
    const handleCreateOrder = () => {
        return fetch(`${API_URL_PAY}/paypal/orders?token=${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            // use the "body" param to optionally pass additional order information
            // like product ids and quantities
            body: JSON.stringify({
                reservation: 'true',
                currency: 'EUR',
                cart: cart.map((product) => ({
                    id: product._id,
                    amount: 1,
                })),
                _client: user._id,
                address: {
                    postal_code: address.postal_code,
                    city: address.city,
                    country: address.country,
                    street: address.street,
                },
                shipments: cart.map((product) => ({
                    _product: product._id,
                    _seller: product._seller,
                })),
            }),
        })
            .then((response) => response.json())
            .then((order) => {
                // Your code here after create the order
                console.log('order: ', order);
                return order.id;
            });
    };

    /**
     * This function is called when the user approves the transaction on PayPal
     */
    const handleOnApprove = (data: any) => {
        const order: OrderType = data;

        return fetch(
            `${API_URL_PAY}/paypal/orders/${order._id}/capture?token=${token}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    intent: 'CAPTURE',
                    orderID: order._id,
                }),
            }
        )
            .then((response) => response.json())
            .then((orderData) => {
                console.log('orderData: ', orderData);
                setPaidFor(true);
                // Your code here after capture the order
                alert('Pagamento realizado com sucesso!');
            });
    };

    /**
     * This function is called when there is an error on PayPal
     */
    const handleError = (error: any) => {
        // Your code here
        console.log('error: ', error);
        alert('Erro no processo de pagamento!');
    };

    /**
     * This function is called when the user cancels the transaction on PayPal
     */
    const handleCancel = (data: any) => {
        // Your code here
        console.log('cancel: ', data);
        alert('Pagamento cancelado!');
    };

    return (
        <>
            {/* {showSpinner && isPending && <div className="spinner" />} */}
            <PayPalButtons
                style={{
                    color: 'silver',
                    layout: 'horizontal',
                    height: 48,
                    tagline: false,
                }}
                disabled={paidFor}
                forceReRender={[style]}
                fundingSource={'paypal'}
                createOrder={handleCreateOrder}
                onApprove={handleOnApprove}
                onError={handleError}
                onCancel={handleCancel}
            />
        </>
    );
};

export default PayPalComponent;

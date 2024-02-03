import React from 'react';
import { MuiTelInput, matchIsValidTel } from 'mui-tel-input';
import { Box, Button, Typography } from '@mui/material';
import useCart from '../../hooks/useCart';
import { Address, User } from '../../types/user';
import { API_URL_PAY } from '../../fetchers';
import { useTranslation } from 'react-i18next';

const MBWayComponent = () => {
    const { t } = useTranslation();
    const { cart } = useCart();
    const user = JSON.parse(localStorage.getItem('user') as string) as User;
    const address = user.client_fields?.demographics.address as Address;
    const token = localStorage.getItem('token');
    const [valuePhone, setValuePhone] = React.useState('+351');
    const [pending, setPending] = React.useState(false);

    const handleChangePhone = (newValue: string) => {
        setValuePhone(newValue);
    };

    function createOrder(countryCode: string, phoneNumber: string) {
        // create order
        // use the "body" param to optionally pass additional order information
        // like product ids and quantities
        fetch(`${API_URL_PAY}/eupago/mbway/orders?token=${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
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
                phone: {
                    country_code: countryCode,
                    phone_number: phoneNumber,
                },
            }),
        })
            .then((response) => response.json())
            .then((order) => {
                // Your code here after create the order
                setPending(true);
                console.log('order: ', order);
                return order.id;
            });
    }

    // set a timer for 5 min to turn off pending
    React.useEffect(() => {
        if (pending) {
            setTimeout(
                () => {
                    setPending(false);
                },
                5 * 60 * 1000
            );
        }
    }, [pending]);

    const handlePay = () => {
        // validate phone number
        // parse phone number
        const countryCode = valuePhone.substring(0, 4);
        const phoneNumber = valuePhone.substring(5);

        // create order
        createOrder(countryCode, phoneNumber);
    };

    return (
        <Box
            component="div"
            sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                marginTop: 2,
            }}>
            {pending && (
                <Typography
                    component="p"
                    variant="body2"
                    style={{ color: 'black' }}>
                    {t('checkout.payment.mbway-pending')}
                </Typography>
            )}
            {!pending && (
                <>
                    <Box component="div" sx={{ display: 'flex', gap: 1 }}>
                        <MuiTelInput
                            value={valuePhone}
                            onChange={handleChangePhone}
                            required
                            {...(!matchIsValidTel(valuePhone) && {
                                error: true,
                                helperText: t('errors.register.phone-number'),
                            })}
                            variant="standard"
                            inputProps={{ maxLength: 16 }}
                        />
                        <Button
                            variant="outlined"
                            onClick={handlePay}
                            disabled={!matchIsValidTel(valuePhone)}>
                            {t('checkout.payment.pay')}
                        </Button>
                    </Box>
                    <Typography
                        component="p"
                        variant="caption"
                        style={{ color: 'gray' }}>
                        {t('checkout.payment.mbway-max-amaount')}
                    </Typography>
                </>
            )}
        </Box>
    );
};

export default MBWayComponent;

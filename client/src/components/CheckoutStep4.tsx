import { Box, Button, Divider, Paper, Typography } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PayPalComponent from './Payment/PayPalComponent';
import useCart from '../hooks/useCart';
import { User } from '../types/user';
import MBWayComponent from './Payment/MBWayComponent';

const CheckoutStep4 = () => {
    const { t } = useTranslation();
    const { cart } = useCart();
    const user = localStorage.getItem('user') as Object as User;

    const [mbway, setMbway] = useState(false);

    return (
        <Box
            component="div"
            style={{
                paddingBottom: 10,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'white',
                color: 'black',
            }}>
            <Paper elevation={0}>
                <Typography
                    component="h1"
                    variant="h5"
                    style={{ margin: '20px 0', color: 'black' }}>
                    {t('checkout.payment.title')}
                </Typography>
                <Box component="div" sx={{ width: '100%' }}>
                    <PayPalComponent cart={cart} user={user} />

                    <Divider sx={{ margin: '20px 0' }} />

                    <Box component="div">
                        <Button
                            variant="contained"
                            className="w-full h-12"
                            onClick={() => {setMbway(!mbway)}}>
                            <img src="/public/eupago.png" alt="MBWay" />
                            <img
                                src="/public/logo-mbway.png"
                                alt="MBWay"
                                className="h-12"
                            />
                        </Button>
                        {mbway && (
                            <MBWayComponent />
                        )}
                    </Box>

                    <Divider sx={{ margin: '20px 0' }} />

                    <Box component="div">
                        <Button variant="contained" className="w-full h-12">
                            <img src="/public/eupago.png" alt="MBWay" />
                            <img
                                src="/public/multibanco-logo.png"
                                alt="MBWay"
                                className="h-10 ml-2"
                            />
                        </Button>
                        *Maximum amount: 3999€
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
};

export default CheckoutStep4;

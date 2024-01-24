import { Box, Divider, Paper, Stack, Typography } from '@mui/material';
import useCart from '../hooks/useCart';
import { useTranslation } from 'react-i18next';

export const CheckoutStep3 = () => {
    const { t } = useTranslation();
    const { subTotalPrice, cart } = useCart();

    return (
        <Box
            component="div"
            style={{
                paddingLeft: '10%',
                paddingRight: '10%',
                paddingBottom: 10,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'left',
                background: 'white',
                color: 'black',
            }}>
            <Paper
                elevation={0}
                style={{
                    paddingLeft: '10%',
                    paddingRight: '10%',
                    paddingBottom: 10,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'left',
                    background: 'white',
                    color: 'black',
                }}>
                <Typography
                    component="h1"
                    variant="h5"
                    style={{ margin: '20px 0', color: 'black' }}>
                    {t('checkout.review.title')}
                </Typography>
                <form style={{ width: '100%' }}>
                    <Stack spacing={{ xs: 1, sm: 2 }}>
                        <Box
                            component="div"
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}>
                            <Typography
                                component="h3"
                                variant="h6"
                                color="black">
                                {t('checkout.stepper.item')}
                            </Typography>
                            <Typography
                                component="h3"
                                variant="h6"
                                color="black">
                                {t('checkout.review.value')}
                            </Typography>
                        </Box>
                        <Divider />
                        {cart.map((item) => (
                            <Box
                                component="div"
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}>
                                <Typography
                                    component="p"
                                    variant="body1"
                                    color="black">
                                    {item.title}
                                </Typography>
                                <Typography
                                    component="p"
                                    variant="body1"
                                    color="black"
                                    className="font-poppins">
                                    {new Intl.NumberFormat('pt-PT', {
                                        style: 'currency',
                                        currency: 'EUR',
                                    }).format(item.price)}
                                </Typography>
                            </Box>
                        ))}
                        <Divider />
                        <Box
                            component="div"
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}>
                            <Typography
                                component="h3"
                                variant="h6"
                                color="black">
                                {t('cart.subtotal')}
                            </Typography>
                            <Typography
                                component="h3"
                                variant="h6"
                                color="black">
                                {subTotalPrice}
                            </Typography>
                        </Box>
                        <Divider />
                        <Box
                            component="div"
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}>
                            <Typography
                                component="h3"
                                variant="h6"
                                color="black">
                                {t('checkout.review.shipping')}
                            </Typography>
                            <Typography
                                component="h3"
                                variant="h6"
                                color="black">
                                {new Intl.NumberFormat('pt-PT', {
                                    style: 'currency',
                                    currency: 'EUR',
                                }).format(5)}
                            </Typography>
                        </Box>
                        <Divider />
                    </Stack>
                    <Box
                        component="div"
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}>
                        <Typography component="h3" variant="h5" color="black">
                            {t('cart.total')}
                        </Typography>
                        <Typography component="h3" variant="h6" color="black">
                            {new Intl.NumberFormat('pt-PT', {
                                style: 'currency',
                                currency: 'EUR',
                            }).format(3000)}
                        </Typography>
                    </Box>
                    <Typography
                        component="p"
                        variant="caption"
                        color="primary"
                        className="font-poppins">
                        *{t('checkout.stepper.includedVAT')}
                    </Typography>
                </form>
            </Paper>
        </Box>
    );
};

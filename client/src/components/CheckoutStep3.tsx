import { Box, Divider, Paper, Stack, Typography } from '@mui/material';
import React from 'react';
import useCart from '../hooks/useCart';

export const CheckoutStep3 = () => {
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
                    Resumo da encomenda
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
                                color="black"
                                >
                                Item
                            </Typography>
                            <Typography
                                component="h3"
                                variant="h6"
                                color="black">
                                Valor
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
                                Subtotal
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
                                Envio
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
                        <Typography
                            component="h3"
                            variant="h5"
                            color="black">
                            Total
                        </Typography>
                        <Typography
                            component="h3"
                            variant="h6"
                            color="black">
                            {new Intl.NumberFormat('pt-PT', {
                                style: 'currency',
                                currency: 'EUR',
                            }).format(3000)}
                        </Typography>
                    </Box>
                    <Typography
                        component="p"
                        variant="caption"
                        color="gray"
                        className="font-poppins">
                        *IVA incluíodo
                    </Typography>
                </form>
            </Paper>
        </Box>
    );
};

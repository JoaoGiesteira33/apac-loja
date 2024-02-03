import {
    Box,
    Button,
    Divider,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { useState } from 'react';
import useCart from '../hooks/useCart';
import { useNavigate } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import { ProductType } from '../types/product';
import { checkLink } from '../fetchers';

const CartDetails = () => {
    const { t } = useTranslation();
    const { dispatch, totalItems, subTotalPrice, cart, REDUCER_ACTIONS } =
        useCart();
    const products = cart;
    const navigate = useNavigate();

    const [shippingCost, setShippingCost] = useState(0);
    const [subtotal, setSubtotal] = useState(parseFloat(subTotalPrice));
    const [tax, setTax] = useState(0.23);

    const total = (subtotal + tax * subtotal + shippingCost) * 0.75;

    const handleCheckout = () => {
        // TODO handle checkout
        navigate('/checkout');
        //dispatch({ type: REDUCER_ACTIONS.SUBMIT });
    };

    const handleClearCart = () => {
        dispatch({ type: REDUCER_ACTIONS.CLEAR });
    };

    const handleRemoveProduct = (product: ProductType) => {
        dispatch({ type: REDUCER_ACTIONS.REMOVE, payload: product });
    };

    return (
        <Box component="div">
            <Grid
                container
                spacing={2}
                sx={{
                    justifyContent: 'space-between',
                    width: '100%',
                }}>
                <Grid xs={12} sm={12} md={8}>
                    <Box component="div" className="flex justify-between my-4">
                        <Typography variant="h5" className="font-poppins">
                            {t('cart.cart')}
                        </Typography>
                        <Typography variant="h5" className="font-poppins">
                            {totalItems} {t('cart.items')}
                        </Typography>
                    </Box>

                    {/* Products table */}
                    <TableContainer component={Paper}>
                        <Table
                            sx={{ minWidth: 600 }}
                            aria-label="product table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Obra</TableCell>
                                    <TableCell align="right">
                                        {t('cart.price')}
                                    </TableCell>
                                    <TableCell align="right">
                                        <Button
                                            title="Clear all"
                                            variant="text"
                                            color="error"
                                            onClick={handleClearCart}>
                                            X
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {/* {products.map((product) => (
                                    <TableRow
                                        key={product._id}
                                        sx={{
                                            '&:last-child td, &:last-child th':
                                                { border: 0 },
                                        }}>
                                        <TableCell component="th" scope="row">
                                            <Grid container spacing={2}>
                                                <Grid xs={3}>
                                                    <img
                                                        src={checkLink(product.photos[0])}
                                                        alt={product.title}
                                                        className="object-cover w-16 h-16 rounded-sm"
                                                    />
                                                </Grid>
                                                <Grid
                                                    xs={8}
                                                    sx={{
                                                        display: 'flex',
                                                        //
                                                        alignItems: 'center',
                                                    }}>
                                                    {product.title}
                                                </Grid>
                                            </Grid>
                                        </TableCell>
                                        <TableCell align="right">
                                            {product.price}€
                                        </TableCell>
                                        <TableCell align="right">
                                            <button
                                                onClick={() =>
                                                    handleRemoveProduct(product)
                                                }>
                                                <DeleteRoundedIcon
                                                    sx={{ fontSize: 20, mx: 3 }}
                                                />
                                            </button>
                                        </TableCell>
                                    </TableRow>
                                ))} */}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid
                    xs={12}
                    sm={12}
                    md={4}
                    className="dark:bg-gray-800 rounded-md ">
                    <Box component="div" className="p-5">
                        <Divider sx={{ marginY: '1rem' }} />

                        <Box component="div" className="flex justify-between">
                            <Typography
                                variant="body2"
                                className="font-poppins"
                                sx={{ marginBottom: '1rem' }}>
                                {t('cart.subtotal')}:
                            </Typography>
                            <Typography
                                variant="body2"
                                className="font-poppins"
                                sx={{ marginBottom: '1rem' }}>
                                {subTotalPrice}
                            </Typography>
                        </Box>

                        <Box component="div" className="flex justify-between">
                            <Typography
                                variant="body2"
                                className="font-poppins"
                                sx={{ marginBottom: '1rem' }}>
                                {t('cart.tax')}(23%):
                            </Typography>
                            <Typography
                                variant="body2"
                                className="font-poppins"
                                sx={{ marginBottom: '1rem' }}>
                                {new Intl.NumberFormat('pt-PT', {
                                    style: 'currency',
                                    currency: 'EUR',
                                }).format(tax * subtotal)}
                            </Typography>
                        </Box>
                        <Box component="div" className="flex justify-between">
                            <Typography
                                variant="body2"
                                className="font-poppins"
                                sx={{ marginBottom: '0.5rem' }}>
                                {t('cart.shipping')}:
                            </Typography>
                            <Typography
                                variant="body2"
                                className="font-poppins"
                                sx={{ marginBottom: '1rem' }}>
                                {new Intl.NumberFormat('pt-PT', {
                                    style: 'currency',
                                    currency: 'EUR',
                                }).format(shippingCost)}
                            </Typography>
                        </Box>

                        <Divider sx={{ marginY: '1rem' }} />

                        <Typography
                            variant="body1"
                            className="font-poppins"
                            fontWeight={700}
                            sx={{ marginBottom: '2rem' }}>
                            {t('cart.total')}(75%):{' '}
                            {new Intl.NumberFormat('pt-PT', {
                                style: 'currency',
                                currency: 'EUR',
                            }).format(total)}
                        </Typography>

                        <Button
                            variant="contained"
                            className="w-full mb-4"
                            onClick={handleCheckout}>
                            {t('cart.checkout')}
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default CartDetails;

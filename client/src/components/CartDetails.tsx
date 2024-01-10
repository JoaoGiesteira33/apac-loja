import {
    Box,
    Button,
    Divider,
    MenuItem,
    Paper,
    Select,
    SelectChangeEvent,
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
import { CartProductType } from '../types/cart';
import useCart from '../hooks/useCart';

const CartDetails = () => {
    const { dispatch, totalItems, subTotalPrice, cart, REDUCER_ACTIONS } =
        useCart();
    const products = cart;

    const [shipping, setShipping] = useState('Standard');
    const [subtotal, setSubtotal] = useState(100);
    const [tax, setTax] = useState(15); // %

    const total =
        subtotal + (tax / 100) * subtotal + (shipping === 'STANDARD' ? 5 : 10);

    const handleShipping = (event: SelectChangeEvent) => {
        setShipping(event.target.value as string);
    };

    const handleCheckout = () => {
        // TODO handle checkout

        dispatch({ type: REDUCER_ACTIONS.SUBMIT });
    };

    const handleClearCart = () => {
        dispatch({ type: REDUCER_ACTIONS.CLEAR });
    };

    const handleRemoveProduct = (product: CartProductType) => {
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
                            Carrinho de compras
                        </Typography>
                        <Typography variant="h5" className="font-poppins">
                            {totalItems} Itens
                        </Typography>
                    </Box>

                    {/* Products table */}
                    <TableContainer component={Paper}>
                        <Table
                            sx={{ minWidth: 600 }}
                            aria-label="product table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Produto</TableCell>
                                    <TableCell align="right">Preço</TableCell>
                                    <TableCell align="right">Total</TableCell>
                                    <TableCell align="right">
                                        <button onClick={handleClearCart}>
                                            Clear
                                        </button>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {products.map((product) => (
                                    <TableRow
                                        key={product.id}
                                        sx={{
                                            '&:last-child td, &:last-child th':
                                                { border: 0 },
                                        }}>
                                        <TableCell component="th" scope="row">
                                            <Grid container spacing={2}>
                                                <Grid xs={3}>
                                                    <img
                                                        src={
                                                            product.thumbnailPhoto
                                                        }
                                                        alt={product.title}
                                                        className="object-cover w-16 h-16 rounded-sm"
                                                    />
                                                </Grid>
                                                <Grid xs={8}>
                                                    {product.title}
                                                </Grid>
                                            </Grid>
                                        </TableCell>
                                        <TableCell align="right">
                                            {product.price}€
                                        </TableCell>
                                        <TableCell align="right">
                                            {product.price * product.quantity}€
                                        </TableCell>
                                        <TableCell align="right">
                                            <button
                                                onClick={() =>
                                                    handleRemoveProduct(product)
                                                }>
                                                <DeleteRoundedIcon
                                                    sx={{ fontSize: 20 }}
                                                />
                                            </button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid
                    xs={12}
                    sm={12}
                    md={4}
                    className="dark:bg-gray-800 rounded-md ">
                    <Typography
                        variant="h6"
                        className="font-poppins"
                        sx={{ marginY: '1rem' }}>
                        Resumo da encomenda
                    </Typography>
                    <Box component="div" className="p-5">
                        <Divider sx={{ marginY: '1rem' }} />

                        <Typography
                            variant="body2"
                            className="font-poppins"
                            sx={{ marginBottom: '1rem' }}>
                            Subtotal: {subTotalPrice}
                        </Typography>
                        <Typography
                            variant="body2"
                            className="font-poppins"
                            sx={{ marginBottom: '0.5rem' }}>
                            Shipping:
                        </Typography>
                        <Select
                            id="shipping-method"
                            value={shipping}
                            onChange={handleShipping}
                            size="small"
                            fullWidth
                            sx={{ marginBottom: '1rem' }}>
                            <MenuItem value={'STANDARD'}>
                                <Typography
                                    variant="body2"
                                    className="font-poppins">
                                    Standard Shipping-5€
                                </Typography>
                            </MenuItem>
                            <MenuItem value={'EXPRESSO'}>
                                <Typography
                                    variant="body2"
                                    className="font-poppins">
                                    Expresso-10€
                                </Typography>
                            </MenuItem>
                        </Select>

                        <Typography variant="body2" className="font-poppins">
                            Tax(15%): {tax}€
                        </Typography>

                        <Divider sx={{ marginY: '1rem' }} />

                        <Typography
                            variant="body1"
                            className="font-poppins"
                            fontWeight={700}
                            sx={{ marginBottom: '2rem' }}>
                            Total:{' '}
                            {new Intl.NumberFormat('pt-PT', {
                                style: 'currency',
                                currency: 'EUR',
                            }).format(total)}
                        </Typography>
                        <Button
                            variant="contained"
                            className="w-full mb-4"
                            onClick={handleCheckout}>
                            checkout
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default CartDetails;

import React from 'react';
import { Box, Button, Divider, Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useNavigate } from 'react-router-dom';

function createData(
    product: string,
    quantity: number,
    price: number,
    total: number,
) {
    return { product, quantity, price, total};
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24),
    createData('Ice cream sandwich', 237, 9.0, 37),
    createData('Eclair', 262, 16.0, 24),
    createData('Cupcake', 305, 3.7, 67),
    createData('Gingerbread', 356, 16.0, 49),
];

const Cart = () => {
    const navigate = useNavigate();

    return (
        <Box component="div">
            <Grid
                container
                spacing={2}
                sx={{
                    justifyContent: 'space-between',
                    width: '100%',
                    paddingX: '1rem',
                }}>
                <Grid xs={12} sm={8}>
                    <Box component="div" className="flex justify-between">
                        <Typography variant="h5" className="font-poppins">
                            Carrinho de compras
                        </Typography>
                        <Typography variant="h5" className="font-poppins">
                            3 Itens
                        </Typography>
                    </Box>
                    <Divider />

                    {/* Products table */}
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        Produto
                                    </TableCell>
                                    <TableCell align="right">
                                        Quantidade
                                    </TableCell>
                                    <TableCell align="right">
                                        Preço
                                    </TableCell>
                                    <TableCell align="right">
                                        Total
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow
                                        key={row.product}
                                        sx={{
                                            '&:last-child td, &:last-child th':
                                                { border: 0 },
                                        }}>
                                        <TableCell component="th" scope="row">
                                            {row.product}
                                        </TableCell>
                                        <TableCell align="right">
                                            {row.quantity}
                                        </TableCell>
                                        <TableCell align="right">
                                            {row.price}
                                        </TableCell>
                                        <TableCell align="right">
                                            {row.total}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Link
                        component="button"
                        variant="body2"
                        onClick={() => {
                            navigate(-1);
                        }}>
                        <KeyboardBackspaceIcon sx={{ fontSize: 20 }} />
                        Continue shopping
                    </Link>
                </Grid>
                <Grid xs={12} sm={4}>
                    <Typography variant="h6" className="font-poppins">
                        Resumo da encomenda
                    </Typography>
                    <Divider />
                    <Typography variant="body2" className="font-poppins">
                        Subtotal: 100€
                    </Typography>
                    <Typography variant="body2" className="font-poppins">
                        Shipping: 10€
                    </Typography>
                    <Typography variant="body2" className="font-poppins">
                        Tax(15%): 15€
                    </Typography>
                    <Divider />
                    <Typography
                        variant="body1"
                        className="font-poppins"
                        fontWeight={700}>
                        Total: 125€
                    </Typography>
                    <Button variant="contained" className="w-full mb-4">
                        checkout
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Cart;

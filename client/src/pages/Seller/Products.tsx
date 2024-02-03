import React, { useContext, useEffect } from 'react';

import { Link } from 'react-router-dom';
import {
    Box,
    Button,
    CircularProgress,
    Stack,
    Typography,
} from '@mui/material';
import AddCircleOutlineSharpIcon from '@mui/icons-material/AddCircleOutlineSharp';
import useProductSearch from '../../hooks/useProductSearch';
import ProductPaper from '../../components/Seller/ProductPaper';
import { useTranslation } from 'react-i18next';
import AddIcon from '@mui/icons-material/Add';
import { CurrentAccountContext } from '../../contexts/currentAccountContext';
import { decodeToken } from 'react-jwt';

export default function Products() {
    const { t } = useTranslation();
    const { tokenLevel } = useContext(CurrentAccountContext);
    const [productQuery, setProductQuery] = React.useState({});
    const [productPage, setProductPage] = React.useState(1);
    const { hasMore, loading, error, products } = useProductSearch(
        productQuery,
        productPage
    );

    useEffect(() => {
        if (tokenLevel === 'seller') {
            const token = localStorage.getItem('token');
            if (!token) return;
            const decodedToken = decodeToken(token);
            if (!decodedToken) return;
            const sellerId = decodedToken._id;
            if (!sellerId) return;
            setProductQuery({
                expand: '_seller',
                _seller: sellerId,
            });
        }
    }, [tokenLevel]);

    return (
        <Box
            component="div"
            sx={{
                paddingY: '2rem',
                paddingX: {
                    xs: '2rem',
                    sm: '4rem',
                    md: '6rem',
                    lg: '20%',
                },
            }}>
            <Stack
                direction="column"
                spacing={4}
                alignItems={'center'}
                justifyContent={'flex-start'}>
                <Typography variant="h3">{t('artist.your-pieces')}</Typography>
                <Button
                    component={Link}
                    color="secondary"
                    to="/profile/new-product"
                    sx={{ alignSelf: 'flex-end' }}
                    startIcon={<AddIcon />}
                    variant="contained">
                    {t('artist.new-piece')}
                </Button>
                {products &&
                    products.map(
                        (product, index) =>
                            product._seller instanceof Object && (
                                <Link
                                    key={index}
                                    to={`/product/${product._id}`}
                                    state={product}>
                                    <ProductPaper product={product} />
                                </Link>
                            )
                    )}
                {error && <div>{t('errors.title')}</div>}
                {loading && (
                    <Box
                        component="div"
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginY: '2rem',
                        }}>
                        <CircularProgress />
                    </Box>
                )}
                {hasMore && (
                    <Button
                        startIcon={<AddCircleOutlineSharpIcon />}
                        variant="outlined"
                        onClick={() => {
                            setProductPage(
                                (prevPageNumber) => prevPageNumber + 1
                            );
                        }}>
                        {t('global.load-more')}
                    </Button>
                )}
            </Stack>
        </Box>
    );
}

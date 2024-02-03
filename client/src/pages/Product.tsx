import { useState, useEffect } from 'react';

import ProductDetails from '../components/Product/ProductDetails';

import { useParams } from 'react-router-dom';
import { Box, Divider, Typography, Grid } from '@mui/material';
import { useLocation } from 'react-router-dom';

import { getProduct } from '../fetchers';
import useProductSearch from '../hooks/useProductSearch';
import ProductThumbnail from '../components/pintar_o_7/ProductThumbnail';
import { useTranslation } from 'react-i18next';
//import { CurrentChatContext } from '../contexts/chatContext';

const Product = (props) => {
    const { t } = useTranslation();
    const location = useLocation();
    const [product, setProduct] = useState(location.state);
    const { product_id } = useParams();

    //const { setSelectedUser, users } = useContext(CurrentChatContext);

    const { loggedIn } = props;

    const checkProduct = () => {
        if (product && product._id != product_id) {
            return false;
        }
        if (!product && product_id) {
            return false;
        }
        return true;
    };

    const [productQuery, setProductQuery] = useState(() => {
        if (product)
            return {
                'piece_info.state': 'available',
                _seller: product._seller,
                limit: 2,
                '_id[ne]': product._id,
            };
        else
            return {
                'piece_info.state': 'available',
                _seller: '',
                limit: 2,
                '_id[ne]': '',
            };
    });
    const [productPage, setProductPage] = useState(1);

    const { hasMore, loading, error, products } = useProductSearch(
        productQuery,
        productPage
    );

    useEffect(() => {
        console.log('product_id', product_id);
        if (!checkProduct())
            getProduct(product_id)
                .then((product) => {
                    setProduct(product);
                    setProductQuery({
                        'piece_info.state': 'available',
                        _seller: product._seller,
                        limit: 2,
                        '_id[ne]': product._id,
                    });
                    // get selected user from users
                    //let selectedUser = users.find((user) => user.username === product._seller);
                    //setSelectedUser(selectedUser)
                })
                .catch((error) => {
                    console.log(error);
                });
        //else{
        //    // get selected user from users
        //    //let selectedUser = users.find((user) => user.username === product._seller);
        //    //setSelectedUser(selectedUser)
        //}
    });
    return (
        <Box
            component="div"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                paddingX: {
                    xs: '2rem',
                    sm: '4rem',
                    md: '6rem',
                    lg: '8rem',
                },
                my: 5,
            }}>
            {product && (
                <ProductDetails product={product} loggedIn={loggedIn} />
            )}

            <Divider />
            <Typography variant="h6">{t('product.more')}</Typography>
            {/* OUTRAS OBRAS DO ARTISTA */}
            <Grid container sx={{ marginTop: 2 }}>
                {products &&
                    products.map((product, index) => (
                        <Grid
                            key={index}
                            display={'flex'}
                            justifyContent={'center'}
                            alignItems={'flex-start'}
                            sm={12}
                            md={6}
                            lg={4}>
                            <ProductThumbnail product={product} />
                        </Grid>
                    ))}
                {products && products.length === 0 && !loading && (
                    <Typography variant="subtitle1" align="center">
                        {t('product.no_more')}
                    </Typography>
                )}
            </Grid>
        </Box>
    );
};

export default Product;

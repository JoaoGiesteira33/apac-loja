import React, { useState, useEffect } from 'react';

import ProductDetails from '../components/Product/ProductDetails';
import products from '../data/product.json';
import { ProductType } from '../types/product';
import MyBreadCrumb from '../components/MyBreadCrumb';

import { useParams } from 'react-router-dom';
import { Box, Divider, Typography, Grid } from '@mui/material';
import { useLocation } from 'react-router-dom';

import { getProduct } from '../fetchers';
import useProductSearch from '../hooks/useProductSearch';
import ProductThumbnail from '../components/pintar_o_7/ProductThumbnail';

const Product = () => {
    const location = useLocation();
    const [product, setProduct] = useState(location.state);
    const { product_id } = useParams();

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
        productPage,
        'subtitute'
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
                })
                .catch((error) => {
                    console.log(error);
                });
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
            {/* <MyBreadCrumb />*/}
            {/* <ProductDetails product={product1}/> */}
            {product && <ProductDetails product={product} />}

            <Divider />
            <Typography variant="h6">
                Outras obras de arte do artista
            </Typography>
            {/* OUTRAS OBRAS DO ARTISTA */}
            <Grid
                container
                sx={{
                    justifyContent: {
                        xs: 'center',
                        sm:
                            products && products.length === 0
                                ? 'center'
                                : 'space-between',
                    },
                }}
                spacing={{ xs: 2, md: 4, lg: 8 }}>
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
                        Este artista não tem mais obras disponíveis.
                    </Typography>
                )}
            </Grid>
        </Box>
    );
};

export default Product;

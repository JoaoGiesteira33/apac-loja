import React, { useEffect, useState } from 'react';

import Hero from '../../components/pintar_o_7/Hero';
import SelectTypes from '../../components/pintar_o_7/SelectType';
import SelectPrice from '../../components/pintar_o_7/SelectPrice';

import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/system/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import AddCircleOutlineSharpIcon from '@mui/icons-material/AddCircleOutlineSharp';

import useProductSearch from '../../hooks/useProductSearch';
import ProductThumbnail from '../../components/pintar_o_7/ProductThumbnail';
import { useTranslation } from 'react-i18next';
import { getMaxPrice } from '../../fetchers';

export default function Home() {
    const [t] = useTranslation();

    const [productQuery, setProductQuery] = useState({
        'piece_info.state': 'available',
    });

    const [productPage, setProductPage] = useState(1);

    const [maxPrice, setMaxPrice] = useState(9999);

    const [featuredProducts, setFeaturedProducts] = useState({
        'piece_info.state': 'available',
        featured: true,
    });

    const [selectedTypes, setSelectedTypes] = React.useState<string[]>([]);
    const [selectedPrice, setSelectedPrice] = React.useState<number[]>([
        0,
        maxPrice,
    ]);

    const all = useProductSearch(productQuery, productPage);

    const featured = useProductSearch(featuredProducts, productPage);

    // get featured products
    const [randomFeaturedProduct, setRandomFeaturedProduct] = useState(null);

    useEffect(() => {
        if (featured.products && featured.products.length > 0)
            setRandomFeaturedProduct(
                featured.products[
                    Math.floor(Math.random() * featured.products.length)
                ]
            );
    }, [featured.products]);

    useEffect(() => {
        getMaxPrice()
            .then((res) => {
                console.log('MaxPrice:', res);
                setSelectedPrice([0, res]);
                setMaxPrice(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <Box
            component="div"
            sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
            }}>
            <Hero
                title={'Pintar o 7'}
                subtitle={
                    t('home.iniciative') +
                    ' Associação Portuguesa das Artes e da Cultura'
                }
                img={randomFeaturedProduct && randomFeaturedProduct.photos[0]}
                color={'#FF3D00'}
            />
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-evenly"
                sx={{ paddingY: '2rem', maxWidth: 'xl', width: '100%' }}>
                <Box
                    component="div"
                    sx={{
                        flexGrow: '1',
                        paddingX: {
                            xs: '2rem',
                            sm: '4rem',
                            md: '6rem',
                            lg: '8rem',
                        },
                        display: 'flex',
                        alignItems: 'center',
                    }}>
                    <SelectTypes
                        values={selectedTypes}
                        setValues={setSelectedTypes}
                        onClose={() => {
                            setProductQuery({
                                ...productQuery,
                                'piece_info.technique[in]':
                                    selectedTypes.join(','),
                            });
                        }}
                        isMultiple={true}
                    />
                </Box>
                <SelectPrice
                    maxPrice={maxPrice}
                    value={selectedPrice}
                    changeValue={setSelectedPrice}
                    mouseUpFunc={() => {
                        setProductQuery({
                            ...productQuery,
                            'price[gte]': selectedPrice[0],
                            'price[lte]': selectedPrice[1],
                        });
                    }}
                />
            </Stack>
            <Divider variant="middle" />

            <Box
                component="div"
                sx={{
                    paddingX: {
                        xs: '2rem',
                        sm: '4rem',
                        md: '6rem',
                        lg: '8rem',
                    },
                    paddingY: '3rem',
                    display: 'flex',
                    justifyContent: 'center',
                }}>
                <Grid
                    container
                    sx={{
                        justifyContent: { xs: 'center', sm: 'space-between' },
                        maxWidth: 'xl',
                    }}
                    spacing={{ xs: 2, md: 4, lg: 8 }}>
                    {all &&
                        all.products &&
                        all.products.map((product, index) => (
                            <Grid
                                key={index}
                                display={'flex'}
                                justifyContent={'center'}
                                alignItems={'flex-start'}
                                xs={12}
                                sm={6}
                                md={4}
                                lg={3}>
                                <ProductThumbnail product={product} />
                            </Grid>
                        ))}
                </Grid>
            </Box>

            {all && all.error && <div>Error</div>}
            {all && all.loading && (
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
            {all && all.hasMore && (
                <Button
                    startIcon={<AddCircleOutlineSharpIcon />}
                    variant="outlined"
                    onClick={() => {
                        setProductPage((prevPageNumber) => prevPageNumber + 1);
                    }}>
                    {t('global.load-more')}
                </Button>
            )}
            <Divider variant="middle" />
        </Box>
    );
}

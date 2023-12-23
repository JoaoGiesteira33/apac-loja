import React, { useState } from 'react';

import Hero from '../../components/pintar_o_7/Hero';
import MultipleSelectTypes from '../../components/pintar_o_7/MultipleSelectTypes';

import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/system/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import AddCircleOutlineSharpIcon from '@mui/icons-material/AddCircleOutlineSharp';

import useProductSearch from '../../hooks/useProductSearch';
import ProductThumbnail from '../../components/pintar_o_7/ProductThumbnail';

export default function Home() {
    const [productQuery, setProductQuery] = useState('');
    const [productPage, setProductPage] = useState(1);
    const [selectedTypes, setSelectedTypes] = React.useState<string[]>([]);

    const { MockData, hasMore, loading, error } = useProductSearch(
        productQuery,
        productPage
    );

    return (
        <Box component="div">
            <Hero />
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-evenly"
                className="p-12 font-normal">
                <MultipleSelectTypes
                    values={selectedTypes}
                    setValues={setSelectedTypes}
                />
                <Box component="div" className="w-20 flex justify-center">
                    preço
                </Box>
                <Box component="div" className="w-20 flex justify-center">
                    batatas
                </Box>
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
                    paddingTop: '3rem',
                }}>
                <Grid
                    container
                    sx={{
                        justifyContent: { xs: 'center', sm: 'space-between' },
                    }}
                    spacing={{ xs: 2, md: 4, lg: 8 }}>
                    {MockData &&
                        MockData.map((product, index) => (
                            <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                                <ProductThumbnail product={product} />
                            </Grid>
                        ))}
                </Grid>
            </Box>

            {error && <div>Error</div>}
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
                        setProductPage((prevPageNumber) => prevPageNumber + 1);
                    }}>
                    Load More
                </Button>
            )}
            <Divider variant="middle" />
        </Box>
    );
}

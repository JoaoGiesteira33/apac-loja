import React, { useState } from 'react';

import Hero from '../../components/pintar_o_7/Hero';
import MultipleSelectTypes from '../../components/pintar_o_7/MultipleSelectTypes';

import Divider from '@mui/material/Divider';
import Box from '@mui/system/Box';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';

import useProductSearch from '../../hooks/useProductSearch';

export default function Home() {
    const [productQuery, setProductQuery] = useState('');
    const [productPage, setProductPage] = useState(1);
    const [selectedTypes, setSelectedTypes] = React.useState<string[]>([]);

    const { products, hasMore, loading, error } = useProductSearch(
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
            <Grid container spacing={4}>
                {products &&
                    products.map((product, index) => (
                        <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                            <>{product}</>
                        </Grid>
                    ))}
                {error && <div>Error</div>}
                {loading && <div>Loading...</div>}
                {hasMore && (
                    <button
                        onClick={() => {
                            setProductPage((prevPageNumber) => prevPageNumber + 1);
                        }}>
                        Load More
                    </button>
                )}
            </Grid>
            <Divider variant="middle" />
        </Box>
    );
}

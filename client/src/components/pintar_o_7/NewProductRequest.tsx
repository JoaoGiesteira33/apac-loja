import { Box, Paper, Skeleton, Stack } from '@mui/material';
import React from 'react';
import { ProductType } from '../../types/product';

export default function NewProductRequest() {
    const [product, setProduct] = React.useState<ProductType>({
        _id: '123',
        title: 'O Sol',
        description: 'Retrato do pintor.',
        price: 33,
        author: 'Joao',
        product_type: 'Pintura',
        piece_info: {
            state: 'Pendente',
            material: 'Couro',
            year: 2023,
            technique: 'Oleo',
            dimensions: {
                height: 123,
                width: 123,
                depth: 123,
                measure: 'cm',
            },
        },
        photos: ['https://picsum.photos/1600/1200'],
        book_info: null,
    });
    const [artist, setArtist] = React.useState('');
    const [publishedDate, setPublishedDate] = React.useState<Date>(new Date());

    return (
        <Paper className="w-full">
            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                className="h-full"
                alignItems={'stretch'}>
                <Box component={'div'} className="sm:shrink-0">
                    {product ? (
                        <img
                            className="h-48 w-full object-cover sm:h-full sm:w-48"
                            src={product.photos[0]}></img>
                    ) : (
                        <Skeleton variant="rectangular">
                            <img className="h-48 w-full object-cover sm:h-full sm:w-48"></img>
                        </Skeleton>
                    )}
                </Box>
                <Box component={'div'}>AS</Box>
                <Box component={'div'}>asda</Box>
            </Stack>
        </Paper>
    );
}

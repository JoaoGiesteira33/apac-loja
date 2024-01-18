import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Box from '@mui/system/Box';
import Grid from '@mui/material/Unstable_Grid2';

export default function ProductThumbnail(props) {
    useEffect(() => {
        console.log(props.product);
    });
    return (
        <Box component="div" sx={{ flexGrow: 1 }}>
            <Link to={`/product/${props.product._id}`} state={props.product}>
                <Box component="div" className="w-full aspect-square">
                    <img
                        className="w-full h-full aspect-square object-cover"
                        src={props.product.photos[0]}></img>
                </Box>
            </Link>
            <Grid
                container
                columnSpacin={2}
                rowSpacing={1}
                sx={{
                    justifyContent: 'space-between',
                    width: '100%',
                }}>
                <Grid item xs={8}>
                    {props.product.title}{' '}
                </Grid>
                <Grid item xs={4} sx={{ textAlign: 'right' }}>
                    {props.product.price}€
                </Grid>
                <Grid item xs={12}>
                    {props.product.description}
                </Grid>
            </Grid>
        </Box>
    );
}

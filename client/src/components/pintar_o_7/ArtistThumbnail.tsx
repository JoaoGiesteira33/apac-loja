import { useState } from 'react';
import { Link } from 'react-router-dom';

import Box from '@mui/system/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { Divider, Typography } from '@mui/material';


// TO DO - TROCAR DE PRODUCT PARA ARTIST

export default function ArtistThumbnail(props) {

    return (
        <Box component="div">
            <Typography variant="subtitle1">
                {props.product.name}
            </Typography>
            <Typography variant="h2" fontWeight="bold">
                {props.product.name}
            </Typography>
            <Link to={`/artist/${props.product.id}`}>
                <Box component="div" className="w-full aspect-square">
                    <img
                        className="w-full h-full aspect-square object-cover"
                        src={props.product.image}></img>
                </Box>
            </Link>
            <Box component="div">
                <Grid
                    container
                    spacing={2}
                    sx={{
                        justifyContent: 'space-between',
                        marginTop: 0,
                    }}>
                    <Grid xs={12}>{props.product.description + 
                                   props.product.description + 
                                   props.product.description + 
                                   props.product.description + 
                                   props.product.description + 
                                   props.product.description + 
                                   props.product.description}
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Box from '@mui/system/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { Divider, Typography } from '@mui/material';

// TO DO - TROCAR DE PRODUCT PARA ARTIST

export default function ArtistThumbnail(props) {
    return (
        <Box component="div">
            <Typography variant="subtitle1">
                {props.artist.seller_fields.demographics.name.split(' ')[0]}
            </Typography>
            <Typography variant="h2" fontWeight="bold">
                {props.artist.seller_fields.demographics.name.split(' ')[1]}
            </Typography>
            <Link to={`/artists/${props.artist._id}`} state={props.artist}>
                <Box component="div" className="w-full aspect-square">
                    <img
                        className="w-full h-full aspect-square object-cover"
                        src={props.artist.seller_fields.profile_picture}
                    />
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
                    <Grid item xs={12}>
                        {props.artist.seller_fields.about}
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

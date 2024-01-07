import { useState } from 'react';
import { Link } from 'react-router-dom';

import Box from '@mui/system/Box';
import Grid from '@mui/material/Unstable_Grid2';

export default function ProductThumbnail(props) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Box component="div">
            <Link to={`/product/${props.product.id}`}>
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
                        width: '100%',
                        maxWidth: '350px',
                    }}>
                    <Grid item xs={8}>
                        {props.product.name}
                    </Grid>
                    <Grid item xs={4} sx={{ textAlign: 'right' }}>
                        {props.product.price}€
                    </Grid>
                    <Grid item xs={12}>
                        {props.product.description}
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

import { Link } from 'react-router-dom';

import Box from '@mui/system/Box';
import Grid from '@mui/material/Unstable_Grid2';

import { checkLink } from '../../fetchers';

export default function ProductThumbnail(props) {
    return (
        <Box component="div" sx={{ flexGrow: 1 }}>
            <Link to={`/product/${props.product.id}`} state={props.product}>
                <Box component="div" className="w-full aspect-square">
                    <img
                        className="w-full h-full aspect-square object-cover"
                        src={checkLink(props.product.photos[0])}
                    />
                </Box>
            </Link>
            <Grid
                container
                columnSpacing={2}
                rowSpacing={1}
                sx={{
                    justifyContent: 'space-between',
                    width: '100%',
                }}>
                <Grid xs={8}>{props.product.title}</Grid>
                <Grid xs={4} sx={{ textAlign: 'right' }}>
                    {' '}
                    {props.product.price}€{' '}
                </Grid>
                <Grid xs={12}>{props.product.description}</Grid>
            </Grid>
        </Box>
    );
}

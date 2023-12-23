import { Divider } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import Box from '@mui/system/Box';
import Grid from '@mui/material/Unstable_Grid2';

export default function ProductThumbnail(props) {
    const theme = useTheme();

    return (
        <Box component="div">
            <Box
                component="div"
                sx={{
                    backgroundColor:
                        theme.palette.mode === 'dark' ? '#000000' : '#F4F4F4',
                    borderRadius: '0.125rem',
                    position: 'relative',
                    overflow: 'hidden',
                    width: '100%',
                    maxWidth: '350px',
                    paddingTop: 'min(100%, 350px)',
                }}>
                <img
                    className="max-h-[95%] max-w-[95%] rounded-sm w-auto h-auto absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] object-cover"
                    src={props.product.image}></img>
            </Box>
            <Box component="div">
                <Grid
                    container
                    spacing={2}
                    sx={{
                        justifyContent: 'space-between',
                        width: '100%',
                        maxWidth: '350px',
                    }}>
                    <Grid xs={8}>{props.product.name}</Grid>
                    <Grid xs={4} sx={{ textAlign: 'right' }}>
                        {props.product.price}€
                    </Grid>
                    <Grid xs={12}>{props.product.description}</Grid>
                </Grid>
            </Box>
        </Box>
    );
}

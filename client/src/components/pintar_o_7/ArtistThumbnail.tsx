import { Link } from 'react-router-dom';
import Box from '@mui/system/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { Typography } from '@mui/material';
import { checkLink } from '../../fetchers';

// TO DO - TROCAR DE PRODUCT PARA ARTIST

export default function ArtistThumbnail(props) {
    const name = props.artist.seller_fields.demographics.name;
    const length = name.split(' ').length;

    const lastName = name.split(' ')[length - 1];
    const otherNames = name
        .split(' ')
        .slice(0, length - 1)
        .join(' ');
    return (
        <Box component="div">
            <Typography variant="subtitle1">{otherNames}</Typography>
            <Typography variant="h2" fontWeight="bold">
                {lastName}
            </Typography>
            <Link to={`/artists/${props.artist._id}`} state={props.artist}>
                <Box component="div" className="w-full aspect-square">
                    <img
                        className="w-full h-full aspect-square object-cover"
                        src={checkLink(props.artist.seller_fields.profile_picture)}
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
                    <Grid xs={12}>
                        {props.artist.seller_fields.about}
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

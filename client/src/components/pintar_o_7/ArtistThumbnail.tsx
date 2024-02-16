import { Link } from 'react-router-dom';
import Box from '@mui/system/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { Typography } from '@mui/material';
import { checkLink } from '../../fetchers';
import { Seller } from '../../types/user';

type ArtistThumbnailProps = {
  artist: Seller
}

export default function ArtistThumbnail(props: ArtistThumbnailProps) {
  const seller: Seller = props.artist;
  const name = seller.name;
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
      <Link to={`/artists/${seller.id}`} state={seller}>
        <Box component="div" className="w-full aspect-square">
          <img
            className="w-full h-full aspect-square object-cover"
            src={checkLink(seller.profilePicture)}
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
          <Grid xs={12}>{seller.about}</Grid>
        </Grid>
      </Box>
    </Box>
  );
}

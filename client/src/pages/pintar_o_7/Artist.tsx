import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Divider, Typography, Avatar } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/system/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import AddCircleOutlineSharpIcon from '@mui/icons-material/AddCircleOutlineSharp';

import ProductThumbnail from '../../components/pintar_o_7/ProductThumbnail';
import useProductSearch from '../../hooks/useProductSearch';
import { useTranslation } from 'react-i18next';
import { checkLink } from '../../fetchers';
import { ProductQuery } from '../../types/query';
import { Seller } from '../../types/user';

export default function ArtistPage() {
  const { t } = useTranslation();
  const location = useLocation();
  const artist: Seller = location.state;

  const [productQuery] = useState<ProductQuery>({
    available: true,
    seller: artist.id,
  });

  const { hasMore, loading, error, products } = useProductSearch(productQuery);

  //const handleArchive = async () => {
  //    const newArtist = { ...artist };
  //    newArtist.seller_fields.status = 'inactice';
  //   // await updateUser(newArtist);
  //    navigate('/artists');
  //}

  return (
    <Box component="div">
      <Box
        component="div"
        sx={{
          paddingX: {
            xs: '2rem',
            sm: '4rem',
            md: '6rem',
            lg: '8rem',
          },
        }}>
        <Divider />

        {/* FULL WIDTH */}
        <Grid
          container
          sx={{ display: { xs: 'none', sm: 'flex' }, my: 10 }}>
          <Grid xs={2}>
            <Avatar
              src={checkLink(
                artist.profilePicture
              )}
              sx={{ width: '15vw', height: '15vw' }}
            />
          </Grid>
          <Grid xs={10}>
            <Box
              component="div"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'left',
                justifyContent: 'center',
                height: '100%',
                // align center vertically
              }}>
              <Typography
                variant="h4"
                fontWeight="bold"
                // align center vertically
                sx={{
                  paddingLeft: '2rem',
                }}>
                {artist.name.toUpperCase()}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  paddingLeft: '2rem',
                }}>
                {artist.about}
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* MOBILE */}
        <Grid
          container
          sx={{ display: { xs: 'flex', sm: 'none' }, my: 1 }}>
          <Grid xs={12}>
            <Avatar
              sx={{
                width: '8rem',
                height: '8rem',
                margin: '1rem auto',
              }}
              src={checkLink(
                artist.profilePicture
              )}
            />
          </Grid>
          <Grid xs={12}>
            <Typography
              variant="h4"
              fontWeight="bold"
              align="center">
              {artist.name.toUpperCase()}
            </Typography>
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              align="center">
              {artist.about}
            </Typography>
          </Grid>
        </Grid>
        <Divider />

        <Typography variant="h5" fontWeight="bold" my={2}>
          {t('artist.pieces')}
        </Typography>
        <Grid
          container
          sx={{
            justifyContent: {
              xs: 'center',
              sm:
                products && products.length === 0
                  ? 'center'
                  : 'space-between',
            },
            my: '1rem',
          }}
          spacing={{ xs: 2, md: 4, lg: 8 }}>
          {products &&
            products.map((product, index) => (
              <Grid
                key={index}
                display={'flex'}
                justifyContent={'center'}
                alignItems={'flex-start'}
                sm={12}
                md={6}
                lg={4}>
                <ProductThumbnail product={product} />
              </Grid>
            ))}
          {products && products.length === 0 && !loading && (
            <Typography variant="subtitle1" align="center">
              {t('artist.no-pieces')}
            </Typography>
          )}
        </Grid>
      </Box>

      {error && <div>{t('errors.title')}</div>}
      {loading && (
        <Box
          component="div"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginY: '2rem',
          }}>
          <CircularProgress />
        </Box>
      )}
      {hasMore && (
        <Button
          startIcon={<AddCircleOutlineSharpIcon />}
          variant="outlined"
          onClick={() => {
            // setProductPage((prevPageNumber) => prevPageNumber + 1);
          }}>
          {t('global.load-more')}
        </Button>
      )}
    </Box>
  );
}

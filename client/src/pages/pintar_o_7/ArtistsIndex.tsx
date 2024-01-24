import React, { useState } from 'react';

import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/system/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import AddCircleOutlineSharpIcon from '@mui/icons-material/AddCircleOutlineSharp';

import useArtistSearch from '../../hooks/useArtistSearch';
import ArtistThumbnail from '../../components/pintar_o_7/ArtistThumbnail';
import { useTranslation } from 'react-i18next';

export default function ArtistsIndexPage() {
    const [t] = useTranslation();
    const [artistPage, setArtistPage] = useState(1);
    const [artistQuery, setArtistQuery] = useState({});

    const { hasMore, loading, error, artists } = useArtistSearch(
        artistQuery,
        artistPage
    );

    return (
        <Box component="div" sx={{ alignItems: "center", display: "flex", flexDirection: "column"}}>
            <Box
                component="div"
                sx={{
                    paddingX: {
                        xs: '2rem',
                        sm: '4rem',
                        md: '6rem',
                        lg: '8rem',
                    },
                    my: 5,
                }}>
                <Grid
                    container
                    sx={{
                        justifyContent: { xs: 'center', sm: 'space-between' },
                    }}
                    spacing={{ xs: 2, md: 4, lg: 8 }}>
                    {artists &&
                        artists.map((artist, index) => (
                            <Grid key={index} xs={12} sm={6} md={4} lg={3}>
                                <ArtistThumbnail artist={artist} />
                            </Grid>
                        ))}
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
                    sx={{ marginBottom: '2rem' }}
                    onClick={() => {
                        setArtistPage((prevPageNumber) => prevPageNumber + 1);
                    }}>
                    {t('global.load-more')}
                </Button>
            )}
        </Box>
    );
}

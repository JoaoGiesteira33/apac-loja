import React, { useContext, useState } from 'react';

import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/system/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import AddCircleOutlineSharpIcon from '@mui/icons-material/AddCircleOutlineSharp';

import useArtistSearch from '../../hooks/useArtistSearch';
import ArtistThumbnail from '../../components/pintar_o_7/ArtistThumbnail';
import { useTranslation } from 'react-i18next';
import { CurrentAccountContext } from '../../contexts/currentAccountContext';
import { TextField } from '@mui/material';

export default function ArtistsIndexPage() {
    const [t] = useTranslation();
    const [artistPage, setArtistPage] = useState(1);
    const [artistFilter, setArtistFilter] = useState('');
    const [artistQuery, setArtistQuery] = useState({});

    // const { hasMore, loading, error, artists } = {
    //     hasMore: false,
    //     loading: false,
    //     error: false,
    //     artists: [
    //         {
    //             _id: 1,
    //             email: 'joao@gmail.com',
    //             role: 'artist',
    //             tags: [],
    //             active_chat_id: [],
    //             seller_fields: {
    //                 about: 'Pintor de quadros abstratos',
    //                 seller_type: 'artista',
    //                 profile_picture: 'https://picsum.photos/400/400',
    //                 demographics: {
    //                     name: 'Joao Giesteira',
    //                     birth_date: new Date(),
    //                     phone: '927426347',
    //                     address: {
    //                         street: 'Largo do Beco',
    //                         postal_code: '4500-450',
    //                         city: 'Braga',
    //                         country: 'Portugal',
    //                     },
    //                 },
    //             },
    //         },
    //         {
    //             _id: 2,
    //             email: 'maria@gmail.com',
    //             role: 'artist',
    //             tags: [],
    //             active_chat_id: [],
    //             seller_fields: {
    //                 profile_picture: 'https://picsum.photos/400/400',
    //                 demographics: { name: 'Maria Oliveira' },
    //             },
    //         },
    //     ],
    // };
    const { hasMore, loading, error, artists } = useArtistSearch(
        artistQuery,
        artistPage
    );

    const artistFilterUpdate = (value: string) => {
        setArtistFilter(value);
        setArtistPage(1);
        if (value === '') {
            let newArtistQuery = { ...artistQuery };
            delete newArtistQuery['seller_fields.demographics.name[regex]'];
            delete newArtistQuery['seller_fields.demographics.name[options]'];

            setArtistQuery(newArtistQuery);
        } else {
            setArtistQuery({
                ...artistQuery,
                'seller_fields.demographics.name[regex]': value,
                'seller_fields.demographics.name[options]': 'i',
            });
        }
    };

    return (
        <Box
            component="div"
            sx={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
            }}>
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
                <TextField
                    variant="standard"
                    margin="normal"
                    label={t('artist.title')}
                    type="text"
                    fullWidth
                    value={artistFilter}
                    onChange={(e) => artistFilterUpdate(e.target.value)}
                />
                <Grid
                    container
                    sx={{
                        mt: 2,
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

import { useContext, useState } from 'react';

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
import { SellerQuery } from '../../types/query';

export default function ArtistsIndexPage() {
    const [t] = useTranslation();
    const { tokenLevel } = useContext(CurrentAccountContext);
    const [artistPage, setArtistPage] = useState(1);
    const [artistFilter, setArtistFilter] = useState('');
    const [artistQuery, setArtistQuery] = useState<SellerQuery>(() => ({
        limit: 12,
        role: 'seller',
    }));
    //   if (tokenLevel === 'admin') return {};
    //   else
    //     return {
    //       'seller_fields.status': 'active',
    //     };
    // });

    const { hasMore, loading, error, sellers, loadMore } =
        useArtistSearch(artistQuery);

    const artistFilterUpdate = (value: string) => {
        setArtistFilter(value);
        setArtistPage(1);
        if (value === '') {
            const newArtistQuery = { ...artistQuery };
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
                    {sellers &&
                        sellers.map((seller) => (
                            <Grid key={seller.id} xs={12} sm={6} md={4} lg={3}>
                                <ArtistThumbnail artist={seller} />
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
                        loadMore();
                    }}>
                    {t('global.load-more')}
                </Button>
            )}
        </Box>
    );
}

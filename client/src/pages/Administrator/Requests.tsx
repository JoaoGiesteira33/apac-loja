import React, { useEffect } from 'react';

import {
    Box,
    Button,
    CircularProgress,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import AddCircleOutlineSharpIcon from '@mui/icons-material/AddCircleOutlineSharp';
import SelectTypes from '../../components/pintar_o_7/SelectType';
import NewProductRequest from '../../components/pintar_o_7/NewProductRequest';
import useProductSearch from '../../hooks/useProductSearch';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

export default function Requests() {
    const { t } = useTranslation();

    const [productQuery, setProductQuery] = React.useState({
        'piece_info.state': 'submitted',
        'author[regex]': '',
        'author[options]': 'i',
        'published_date[lte]': dayjs(new Date()).format('YYYY-MM-DD'),
        expand: '_seller',
    });
    const [productPage, setProductPage] = React.useState(1);
    const { hasMore, loading, error, products, setProducts } = useProductSearch(
        productQuery,
        productPage
    );

    // Filters
    const [selectedTypes, setSelectedTypes] = React.useState<string[]>([]);
    const [artist, setArtist] = React.useState<string>('');
    const [dateFilter, setDateFilter] = React.useState<Date | null>(null);

    const artistFilterUpdate = (value: string) => {
        setArtist(value);

        if (value === '') {
            setProductQuery({
                ...productQuery,
                'author[regex]': '',
            });
        } else {
            setProductQuery({
                ...productQuery,
                'author[regex]': value,
            });
        }
    };

    const dateFilterUpdate = (value: Date | null) => {
        setDateFilter(value);

        if (value === null) {
            setProductQuery({
                ...productQuery,
                'published_date[lte]': dayjs(new Date())
                    .add(1, 'day')
                    .format('YYYY-MM-DD'),
            });
        } else {
            setProductQuery({
                ...productQuery,
                'published_date[lte]': dayjs(value)
                    .add(1, 'day')
                    .format('YYYY-MM-DD'),
            });
        }
    };

    const onChangeProductState = (productId: string) => {
        console.log(productId);
        setProducts(products.filter((product) => product._id !== productId));
    };

    let first = 0;

    useEffect(() => {
        if (first === 0) {
            first++;
        } else {
            if (selectedTypes.length === 0) {
                const newQuery = { ...productQuery };
                delete newQuery['piece_info.technique[in]'];
                setProductQuery({
                    ...newQuery,
                });
            } else {
                setProductQuery({
                    ...productQuery,
                    'piece_info.technique[in]': selectedTypes.join(','),
                });
            }
        }
    }, [selectedTypes]);

    return (
        <Box
            component="div"
            sx={{
                paddingY: '2rem',
                paddingX: {
                    xs: '2rem',
                    sm: '4rem',
                    md: '6rem',
                    lg: '20%',
                },
            }}>
            <Stack
                direction="column"
                spacing={4}
                alignItems={'center'}
                justifyContent={'flex-start'}>
                <Typography variant="h3">
                    {t('profile.requests.title')}
                </Typography>
                <Box component={'div'} className="w-full">
                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        alignItems={{ xs: 'flex-start', sm: 'center' }}
                        spacing={{ xs: 1, sm: 2, md: 4 }}
                        justifyContent="space-between"
                        sx={{
                            paddingY: '2rem',
                            width: '100%',
                        }}>
                        <Box
                            component={'div'}
                            display={'flex'}
                            alignItems={'center'}>
                            <SelectTypes
                                values={selectedTypes}
                                setValues={setSelectedTypes}
                                isMultiple={true}
                            />
                        </Box>
                        <TextField
                            variant="standard"
                            margin="normal"
                            label={t('artist.title')}
                            type="text"
                            fullWidth
                            value={artist}
                            onChange={(e) => artistFilterUpdate(e.target.value)}
                        />
                        <DatePicker
                            disableFuture
                            openTo="day"
                            views={['year', 'month', 'day']}
                            format="DD/MM/YYYY"
                            label={t('profile.beforeAt')}
                            value={dateFilter}
                            sx={{ width: '100%' }}
                            slotProps={{
                                textField: {
                                    variant: 'standard',
                                    name: 'date',
                                    margin: 'normal',
                                },
                            }}
                            onChange={(value: Date) => dateFilterUpdate(value)}
                        />
                    </Stack>
                </Box>
                {products &&
                    products.map(
                        (product, index) =>
                            product._seller instanceof Object && (
                                <NewProductRequest
                                    key={index}
                                    product={product}
                                    onChangeProductState={onChangeProductState}
                                />
                            )
                    )}
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
                {!loading && (!products || products.length === 0) && (
                    <div>{t('errors.no-results')}</div>
                )}
                {hasMore && (
                    <Button
                        startIcon={<AddCircleOutlineSharpIcon />}
                        variant="outlined"
                        onClick={() => {
                            setProductPage(
                                (prevPageNumber) => prevPageNumber + 1
                            );
                        }}>
                        {t('global.load-more')}
                    </Button>
                )}
            </Stack>
        </Box>
    );
}

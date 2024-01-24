import React, { useEffect } from 'react';

import { Link } from 'react-router-dom';
import {
    Box,
    Button,
    CircularProgress,
    Stack,
    Typography,
} from '@mui/material';
import AddCircleOutlineSharpIcon from '@mui/icons-material/AddCircleOutlineSharp';
import useProductSearch from '../../hooks/useProductSearch';
import dayjs from 'dayjs';
import ProductPaper from '../../components/Seller/ProductPaper';
import { useTranslation } from 'react-i18next';
import AddIcon from '@mui/icons-material/Add';

export default function Products() {
    const { t } = useTranslation();
    const [productQuery, setProductQuery] = React.useState({
        expand: '_seller',
        _seller: '123',
        'published_date[lte]': dayjs(new Date()).format('YYYY-MM-DD'),
    });
    const [productPage, setProductPage] = React.useState(1);
    const { MockData, hasMore, loading, error, products } = useProductSearch(
        productQuery,
        productPage
    );

    // Filters
    const [selectedTypes, setSelectedTypes] = React.useState<string[]>([]);
    const [dateFilter, setDateFilter] = React.useState<Date | null>(null);

    const dateFilterUpdate = (value: Date | null) => {
        setDateFilter(value);
        setProductPage(1);

        if (value === null) {
            setProductQuery({
                ...productQuery,
                'published_date[lte]': dayjs(new Date()).format('YYYY-MM-DD'),
            });
        } else {
            setProductQuery({
                ...productQuery,
                'published_date[lte]': dayjs(value).format('YYYY-MM-DD'),
            });
        }
    };

    useEffect(() => {
        setProductPage(1);
        if (selectedTypes.length === 0) {
            setProductQuery({
                ...productQuery,
                //'piece_info.type': '',
            });
        } else {
            setProductQuery({
                ...productQuery,
                //'piece_info.type': selectedTypes.join(','),
            });
        }
    }, [productQuery, selectedTypes]);

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
                <Typography variant="h3">{t('artist.your-pieces')}</Typography>
                <Button
                    component={Link}
                    color="secondary"
                    to="/profile/new-product"
                    sx={{ alignSelf: 'flex-end' }}
                    startIcon={<AddIcon />}
                    variant="contained">
                    {t('artist.new-piece')}
                </Button>
                {MockData &&
                    MockData.map(
                        (product, index) =>
                            product._seller instanceof Object && (
                                <ProductPaper key={index} product={product} />
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

import React, { useEffect } from 'react';

import {
    Box,
    Button,
    CircularProgress,
    Stack,
    Typography,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import AddCircleOutlineSharpIcon from '@mui/icons-material/AddCircleOutlineSharp';
import MultipleSelectTypes from '../../components/pintar_o_7/MultipleSelectTypes';
import NewProductRequest from '../../components/pintar_o_7/NewProductRequest';
import useProductSearch from '../../hooks/useProductSearch';
import dayjs from 'dayjs';
import ProductPaper from '../../components/Seller/ProductPaper';

export default function Products() {
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

    const [ordersQuery, setOrdersQuery] = React.useState({});
    const [ordersPage, setOrdersPage] = React.useState(1);
    const {
        MockData: MockOrders,
        hasMore: hasMoreOrders,
        loading: loadingOrders,
        error: errorOrders,
        products: orders,
    } = useProductSearch(ordersQuery, ordersPage);

    // Filters
    const [selectedTypes, setSelectedTypes] = React.useState<string[]>([]);
    const [dateFilter, setDateFilter] = React.useState<Date | null>(null);

    const dateFilterUpdate = (value: Date | null) => {
        setDateFilter(value);

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
                <Typography variant="h3">New Requests</Typography>
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
                            <MultipleSelectTypes
                                values={selectedTypes}
                                setValues={setSelectedTypes}
                            />
                        </Box>
                        <DatePicker
                            disableFuture
                            openTo="day"
                            views={['year', 'month', 'day']}
                            format="DD/MM/YYYY"
                            label="Antes de"
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
                {MockData &&
                    MockData.map(
                        (product, index) =>
                            product._seller instanceof Object && (
                                <ProductPaper key={index} product={product} />
                            )
                    )}
                {error && <div>Error</div>}
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
                        Load More
                    </Button>
                )}
            </Stack>
        </Box>
    );
}

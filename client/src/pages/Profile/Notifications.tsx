import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import {
    Alert,
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
import { NotificationType } from '../../types/notification';
import NotificationPaper from '../../components/Profile/NotificationPaper';
import { getNotifications } from '../../fetchers';

/* const MockData: NotificationType[] = [
    {
        _user: '123',
        title: 'New Order',
        message: 'You have a new order! This is a very long message to test the overflow of the notification paper. More text here. More text here. More text here. More text here. More text here.',  
        date: new Date(),
        link: '/profile/order-history',
    },
    {
        _user: '123',
        title: 'New Order',
        message: 'You have a new order!',
        date: new Date('2024-01-21'),
        link: '/profile/order-history',
    },
    {
        _user: '123',
        title: 'New Order',
        message: 'You have a new order!',
        date: new Date('2024-01-20'),
        link: '/profile/order-history',
    },
    {
        _user: '123',
        title: 'New Order',
        message: 'You have a new order!',
        date: new Date('2023-12-21'),
        link: '/profile/order-history',
    },
    {
        _user: '123',
        title: 'New Order',
        message: 'You have a new order!',
        date: new Date('2022-01-21'),
        link: '/profile/order-history',
    },
]; */

export default function Notifications() {
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [notifications, setNotifications] = useState<NotificationType[]>([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const fetchData = async () => {
                setIsLoading(true);

                try {
                    const data = await getNotifications(token);
                    if (data) {
                        console.log('Notifications:', data);
                        setNotifications(data);
                    }
                } catch (e: any) {
                    setError(e.message);
                } finally {
                    setIsLoading(false);
                }
            };
            fetchData();
        }
    }, []);

    //const { MockData, hasMore, loading, error, products } = useProductSearch();

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
                    {t('profile.notifications.title')}
                </Typography>
                {/* <Button
                    component={Link}
                    color="secondary"
                    to="/profile/new-product"
                    sx={{ alignSelf: 'flex-end' }}
                    startIcon={<AddIcon />}
                    variant="contained">
                    {t('artist.new-piece')}
                </Button> */}
                {notifications &&
                    notifications.map((notification, index) => (
                        <NotificationPaper
                            key={index}
                            notification={notification}
                        />
                    ))}
                {error !== '' && <Alert severity="error">{error}</Alert>}
                {isLoading && (
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
                {/* {hasMore && (
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
                )} */}
            </Stack>
        </Box>
    );
}

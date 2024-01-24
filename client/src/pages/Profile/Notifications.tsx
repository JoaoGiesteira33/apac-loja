import React, { useEffect, useState } from 'react';

import { Alert, Box, CircularProgress, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
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
            </Stack>
        </Box>
    );
}

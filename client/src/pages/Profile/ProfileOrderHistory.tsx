import { useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import Order from '../../components/pintar_o_7/Order';
import { title } from 'process';

export default function ProfileOrderHistory() {
    const [orders, setOrders] = useState([
        {
            id: '1231454d2-1231-1231-1231-123123123123',
            date: '2021-10-01',
            total: 1000,
        },
        {
            id: '1231454d2-1231-1231-1231-123123123123',
            date: '2021-10-01',
            total: 1000,
        },
        {
            id: '1231454d2-1231-1231-1231-123123123123',
            date: '2021-10-01',
            total: 1000,
        },
        {
            id: '1231454d2-1231-1231-1231-123123123123',
            date: '2021-10-01',
            total: 1000,
        },
        {
            id: '1231454d2-1231-1231-1231-123123123123',
            date: '2021-10-01',
            total: 1000,
        },
    ]);

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
                <Typography variant="h3">Order History</Typography>
                {orders.map((order) => {
                    return <Order key={order.id} order={order}></Order>;
                })}
            </Stack>
        </Box>
    );
}

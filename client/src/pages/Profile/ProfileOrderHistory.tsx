import { useEffect, useState, useContext } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import Order from '../../components/pintar_o_7/Order';
import { OrderType, ShipmentType, StateType } from '../../types/order';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { getOrders } from '../../fetchers';
import { decodeToken } from 'react-jwt';
import { CurrentAccountContext } from '../../contexts/currentAccountContext';

const createRandomOrder = (): OrderType => {
    const _id = Math.floor(Math.random() * 1000).toString();
    const client_id = Math.floor(Math.random() * 1000).toString();
    const date = dayjs().toDate();
    const shipments: ShipmentType[] = [];

    const number_of_shipments = Math.floor(Math.random() * 3) + 1;
    for (let i = 0; i < number_of_shipments; i++) {
        const evaluation = {
            rating: Math.floor(Math.random() * 5),
            comment: 'mui bom',
        };
        const states: StateType[] = [
            {
                value: 'processing',
                date: new Date(),
            },
            {
                value: 'delivering',
                date: new Date(),
            },
            {
                value: 'delivered',
                date: new Date(),
            },
        ];
        shipments.push({
            seller_id: Math.floor(Math.random() * 1000).toString(),
            product_id: Math.floor(Math.random() * 1000).toString(),
            shipping_proof: 'proof',
            evaluation: evaluation,
            states: states,
        });
    }
    return {
        _id: _id,
        client_id: client_id,
        date: date,
        shipments: shipments,
    };
};
const createRandomOrders = (): OrderType[] => {
    const orders = [];
    const number_of_orders = Math.floor(Math.random() * 3) + 2;
    for (let i = 0; i < number_of_orders; i++) {
        orders.push(createRandomOrder());
    }
    return orders;
};

export default function ProfileOrderHistory() {
    const [orders, setOrders] = useState<OrderType[]>([]);

    const { _id } = useContext(CurrentAccountContext);
    useEffect(() => {
        //const MOCK_ORDERS = createRandomOrders();
        //setOrders(MOCK_ORDERS);

        console.log('ID:', _id);
        const token = localStorage.getItem('token');
        const decodedToken = decodeToken(token);
        getOrders(token, decodedToken._id)
            .then((orders) => {
                setOrders(orders);
            })
            .catch((e) => {
                console.log('error', e);
            });
    }, []);

    const { t } = useTranslation();

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
                    {t('profile.order_history')}
                </Typography>
                {orders.map((order) => {
                    return <Order key={order._id} order={order}></Order>;
                })}
            </Stack>
        </Box>
    );
}

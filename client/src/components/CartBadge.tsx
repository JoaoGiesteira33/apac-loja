import * as React from 'react';
import { Badge, IconButton, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';
import SpeedDial from '@mui/material/SpeedDial';

import useCart from '../hooks/useCart';

export default function CustomizedBadges() {
    const navigate = useNavigate();

    const [badge, setBadge] = React.useState(false);

    const { cart, totalItems } = useCart();

    React.useEffect(() => {
        if (totalItems > 0) {
            setBadge(true);
        } else {
            setBadge(false);
        }
    }, [totalItems]);

    return (
        <SpeedDial
            ariaLabel="Icon fixo para chat"
            sx={{ position: 'fixed', bottom: 16, left: 16 }}
            icon={
                <Badge
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    variant={badge ? 'dot' : ''}
                    color="secondary">
                    <ShoppingCartIcon sx={{ color: 'black' }} />
                </Badge>
            }
            onClick={() => navigate('/cart')}
        />
    );
}

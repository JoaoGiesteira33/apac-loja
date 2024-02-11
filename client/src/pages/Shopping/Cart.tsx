import { Box, Link } from '@mui/material';
import CartDetails from '../../components/CartDetails';
import { useNavigate } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useTranslation } from 'react-i18next';
import { ReservationDetails } from '../../components/ReservationDetails';

const Cart = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <Box
            component="div"
            sx={{
                paddingX: {
                    xs: '2rem',
                    sm: '4rem',
                    md: '6rem',
                    lg: '8rem',
                },
                paddingY: '3rem',
            }}>
            <ReservationDetails />

            <Link
                component="button"
                variant="body2"
                onClick={() => {
                    navigate(-1);
                }}
                sx={{ marginY: '1rem' }}>
                <KeyboardBackspaceIcon sx={{ fontSize: 20 }} />
                {t('cart.continue-shopping')}
            </Link>

            <CartDetails />
        </Box>
    );
};

export default Cart;

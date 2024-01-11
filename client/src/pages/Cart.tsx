import { Box, Link } from '@mui/material';
import CartDetails from '../components/CartDetails';
import { useNavigate } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const Cart = () => {
    const navigate = useNavigate();

    return (
        <Box component="div" sx={{ paddingX: '1rem' }}>
            <CartDetails />

            <Link
                component="button"
                variant="body2"
                onClick={() => {
                    navigate(-1);
                }}
                sx={{marginY: '1rem'}}>
                <KeyboardBackspaceIcon sx={{ fontSize: 20 }} />
                Continue shopping
            </Link>
        </Box>
    );
};

export default Cart;

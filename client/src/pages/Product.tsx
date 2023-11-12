import { Box, Divider } from '@mui/material';
import ProductDetails from '../components/product';

const Product = () => {
    return (
        <Box
            component="div"
            sx={{
                flexGrow: 1,
                margin: '15px',
            }}>
            <div>Page header Eg.(Navigation stuffs)</div>
            <ProductDetails />
            <div>
                <Divider />
                Other artworks of the artist
            </div>
            <div>
                <Divider />
                You may also like these artworks{' '}
            </div>
        </Box>
    );
};

export default Product;

import { Box, Divider } from '@mui/material';
import ProductDetails from '../components/Product/ProductDetails';
import products from '../data/product.json';
import { ProductType } from '../types/product';

const Product = () => {
    // fetch pruduct data from backend or pass it as props from parent component
    const product1: ProductType = products[1];

    return (
        <Box
            component="div"
            sx={{
                flexGrow: 1,
                margin: '15px',
            }}>
            <div>Page header Eg.(Navigation stuffs)</div>
            <ProductDetails product={product1}/>
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

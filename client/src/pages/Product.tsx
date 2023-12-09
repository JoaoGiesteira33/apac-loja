import ProductDetails from '../components/Product/ProductDetails';
import products from '../data/product.json';
import { ProductType } from '../types/product';
import MyBreadCrumb from '../components/MyBreadCrumb';

const Product = () => {
    // fetch pruduct data from backend or pass it as props from parent component
    const product1: ProductType = products[0];
    const product2: ProductType = products[1];

    return (
        <div className="flex flex-col container mx-auto">
            <MyBreadCrumb />
            {/* <ProductDetails product={product1}/> */}
            <ProductDetails product={product2}/>

            <div>
                <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />
                <h2 className="font-poppins text-xl">
                    Other artworks of the artist
                </h2>
            </div>
            <div>
                <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />
                <h2 className="font-poppins text-xl">
                    You may also like these artworks
                </h2>
            </div>
        </div>
    );
};

export default Product;

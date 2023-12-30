import { Typography } from '@material-tailwind/react';
import { ProductType } from '../../types/product';
import { useState } from 'react';
import ProductAccordion from './ProductAccordion';
import { ImageLightBox } from './ImageLightBox';
import { useNavigate } from 'react-router-dom';

const ProductDetails = (data: { product: ProductType }) => {
    const product = data.product;
    const navigate = useNavigate();

    const [selectedImage, setSelectedImage] = useState(product.photos[0]);
    const [lightboxStatus, setLightboxStatus] = useState(false);

    const handleLightbox = () => {
        setLightboxStatus(!lightboxStatus);
    };

    const handleBuyNow = () => {
        navigate('/cart')
    }

    return (
        <div className="grid gap-4 lg:gap-8 grid-cols-1 lg:grid-cols-12">
            {/* LIGHTBOX */}
            <div
                className={`fixed top-0 left-0 z-50 w-full h-full bg-black bg-opacity-50 ${
                    lightboxStatus ? 'block' : 'hidden'
                }`}>
                <ImageLightBox
                    status={lightboxStatus}
                    statusFunc={setLightboxStatus}
                    images={product.photos}
                />
            </div>
            {/* THUMBNAIL AREA */}
            <div className="col-span-1">
                <div className="flex flex-row lg:flex-col space-x-2 lg:space-x-0 lg:space-y-2">
                    {product.photos.map((photo) => (
                        <div className="aspect-w-1 aspect-h-1">
                            <img
                                src={photo}
                                alt={product.title}
                                className="object-cover w-14 h-14 rounded-sm cursor-pointer hover:opacity-80"
                                onClick={() => setSelectedImage(photo)}
                            />
                        </div>
                    ))}
                </div>
            </div>
            {/* MAIN AREA */}
            <div className="col-span-1 lg:col-start-2 lg:col-span-6 order-first lg:order-none">
                <div className="flex flex-col space-y-2">
                    <div className="w-full h-96 sm:h-128 md:h-176">
                        <img
                            src={selectedImage}
                            alt={product.title}
                            className="object-cover w-full h-full rounded-md cursor-pointer object-center  "
                            onClick={handleLightbox}
                        />
                    </div>
                </div>
            </div>
            {/* ACTION AREA */}
            <div className="col-span-1 lg:col-start-8 lg:col-span-5">
                <div className="flex flex-col space-y-2">
                    <div className="flex flex-col space-y-2">
                        <div className="flex flex-col space-y-1">
                            <Typography className="font-poppins mb-4" variant="h2">
                                {product.author}
                            </Typography>

                            <Typography className="font-poppins" variant="h4">
                                {product.title}, {product.piece_info?.year}
                            </Typography>
                        </div>
                        <div className="flex flex-row items-center justify-between">
                            <Typography className="font-poppins mt-8 mb-4" variant="h4">
                                {product.price.amount['EUR']}€
                            </Typography>

                            <Typography className="font-poppins" variant="h6">
                                {product.stock} left in stock
                            </Typography>
                            
                        </div>
                        <div className="flex flex-col space-y-1">
                        <button
                            type="button"
                            className="text-white bg-gradient-to-r from-gray-700 to-gray-900 hover:bg-gradient-to-br font-poppins rounded-lg text-md px-5 py-2.5 text-center mb-4 mx-4"
                            onClick={handleBuyNow}
                            >
                                BUY NOW
                            </button>
                        </div>
                        <div className="flex flex-col space-y-1 mx-4">
                            <ProductAccordion product={product} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;

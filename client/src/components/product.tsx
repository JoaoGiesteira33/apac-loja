import { Button, Grid, ImageList, ImageListItem } from '@mui/material';
import products from '../data/product.json';
import { ProductType } from '../types/product';
import { useState } from 'react';

import ReactImageMagnify from 'react-image-magnify';
import Lightbox from "react-awesome-lightbox";
// You need to import the CSS only once
import "react-awesome-lightbox/build/style.css";


export default function ProductDetails() {
    // fetch pruduct data from backend or pass it as props from parent component
    const product: ProductType = products[0];

    const [selectedImage, setSelectedImage] = useState(product.photos[0]);

    const [lightboxOpen, setLightboxOpen] = useState(false);

    const openLightbox = () => {
        setLightboxOpen(true);
    };

    return (
        <Grid container>
            <Grid item xs={12} sm={12} md={6}>
                <Grid container>
                    <Grid item xs={12} sm={12} md={10} order={{ md: 2 }}>
                    <ReactImageMagnify  {... {
                        smallImage: {
                            alt: 'Wristwatch by Ted Baker London',
                            isFluidWidth: true,
                            src: selectedImage,
                        },
                        largeImage: {
                            src: selectedImage,
                            width: 1200,
                            height: 1800,
                        },
                        shouldUsePositiveSpaceLens: true,
                        enlargedImageContainerDimensions: {
                            width: '150%',
                            height: '100%'
                        }
                    }} />
                        {/* <img
                            src={selectedImage}
                            alt={product.title}
                            style={{ border: '1px solid #999999' }}
                        /> */}
                    </Grid>
                    <Grid item xs={12} sm={12} md={2} order={{ md: 1 }}>
                        {lightboxOpen ?
                        <Lightbox
                            images={product.photos.map((item) => ({
                                url: item,
                            }))}
                            title={product.title}
                            onClose={() => setLightboxOpen(false)}
                            isOpen={lightboxOpen}
                        /> : null
                        }
                        <ImageList
                            sx={{
                                width: '70px',
                                height: '300px',
                                margin: '0px 40px 0px 0px',
                                justifyContent: 'flex-start',
                            }}
                            cols={1}
                            rowHeight={50}>
                            {product.photos.map((item) => (
                                <ImageListItem
                                    key={item}
                                    sx={{
                                        '&:hover': {
                                            border: '2px solid #0ea6e9',
                                        },
                                    }}>
                                    <button
                                        type="button"
                                        onMouseOver={()=>setSelectedImage(item)}
                                        onClick={openLightbox}
                                        >   
                                        
                                        <img
                                            srcSet={`${item}?w=70&h=50&fit=crop&auto=format&dpr=2 2x`}
                                            src={`${item}?w=70&h=50&fit=crop&auto=format`}
                                            alt={product.title}
                                            loading="lazy"
                                        />
                                    </button>
                                </ImageListItem>
                            ))}
                        </ImageList>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                <div>
                    <h3>{product.author}</h3>
                    <br />
                    <h1>{product.title}</h1>
                </div>
                <div>
                    <h6>{product.price}$</h6>{' '}
                    {product.stock > 0 ? ( // if stock is greater than 0, show stock, else show out of stock
                        <span style={{ color: 'green' }}>In Stock</span>
                    ) : (
                        <span style={{ color: 'red' }}>Out of Stock</span>
                    )}
                    <br />
                    <Button variant="contained">BUY NOW</Button>
                    <Button variant="contained">CONTACT US</Button>
                </div>
                <div>
                    <p>{product.description}</p>
                </div>
            </Grid>
        </Grid>
    );
}

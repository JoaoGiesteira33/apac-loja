import { Box, ImageList, ImageListItem, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
//import Grid from '@mui/material/Unstable_Grid2'; 
import { ProductType } from '../../types/product';
import { useState } from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ImageMagnifier from './ImageMagnifier';
import { ImageLightBox } from './ImageLightBox';

import { Button } from '@material-tailwind/react';




const ProductDetails = (data: { product: ProductType}) => {
    const product = data.product;

    const [selectedImage, setSelectedImage] = useState(product.photos[0]);
    const [isInStock, setIsInStock] = useState(product.stock > 0); 

    const [lightboxStatus, setLightboxStatus] = useState(false);

    const handleLightbox = () => { setLightboxStatus (!lightboxStatus) };   

    return (
        <Grid container component='div' columnSpacing={2} justifyContent="center" alignItems="flex-start">
            <Grid xs={12} sm={12} md={6}>
                <Grid container component='div' direction={{xs:'column', sm:'column', md:'column', lg:'row'}} alignContent='center'>
                    <Grid sm={12} md={12} order={{ lg: 2 }} sx={{}} >
                        <Box component='div'sx={{ 
                            width: '100%', // Set the width to 100% to ensure responsiveness within its container
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            }}>
                            <img
                                src={selectedImage}
                                alt={product.title}
                                style={{ border: '1px solid #999999', maxHeight:'700px', maxWidth:'650px', cursor:'pointer'}}
                                onClick={() => handleLightbox()}
                            />
                            {/* <ImageMagnifier src={selectedImage} alt={product.title} width={500 } height={700} magnifierHeight={200} magnifierWidth={200} zoomLevel={1.5} /> */}
                            <ImageLightBox status={lightboxStatus} statusFunc={setLightboxStatus} images={product.photos}/>
                        </Box>
                    </Grid>
                    <Grid  sm={12} md={12} order={{ lg: 1 }}>
                        <Stack spacing={2} direction={{xs:'row', sm:'row', md:'row', lg:'column' }} sx={{ mt: {xs:2, lg:0}, mb: 2, mr:2}}>
                            
                                <ImageList key={0} sx={{ width: 50, height: 50, overflow: 'hidden', borderRadius: '5px', cursor: 'pointer', border: '1px solid #999999'}} variant="woven" cols={1}>
                                    <ImageListItem key={0} onClick={() => setSelectedImage(product.photos[0])}>
                                        <img
                                            src={product.photos[0]}
                                            alt={product.title}
                                            loading="lazy"
                                            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center'}}
                                            onMouseOver={() => setSelectedImage(product.photos[0])}
                                        />
                                    </ImageListItem>
                                </ImageList>
                                <ImageList key={1} sx={{ width: 50, height: 50, overflow: 'hidden', borderRadius: '5px', cursor: 'pointer', border: '1px solid #999999'}} variant="woven" cols={1}>
                                    <ImageListItem key={1} onClick={() => setSelectedImage(product.photos[1])}>
                                        <img
                                            src={product.photos[1]}
                                            alt={product.title}
                                            loading="lazy"
                                            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center'}}
                                            onMouseOver={() => setSelectedImage(product.photos[1])}
                                        />
                                    </ImageListItem>
                                </ImageList>
                                <ImageList key={2} sx={{ width: 50, height: 50, overflow: 'hidden', borderRadius: '5px', cursor: 'pointer', border: '1px solid #999999'}} variant="woven" cols={1}>
                                    <ImageListItem key={2} onClick={() => setSelectedImage(product.photos[2])}>
                                        <img
                                            src={product.photos[2]}
                                            alt={product.title}
                                            loading="lazy"
                                            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center'}}
                                            onMouseOver={() => setSelectedImage(product.photos[2])}
                                        />
                                    </ImageListItem>
                                </ImageList>
                                <ImageList key={3} sx={{ width: 50, height: 50, overflow: 'hidden', borderRadius: '5px', cursor: 'pointer', border: '1px solid #999999'}} variant="woven" cols={1}>
                                    <ImageListItem key={3} onClick={() => setSelectedImage(product?.photos[3])} sx={{backgroundColor:'#e8e8e8'}}>
                                        <MoreHorizIcon fontSize='small' sx={{width:'100%' }} />
                                    </ImageListItem>
                                </ImageList>
                            
                        </Stack>
                    </Grid>
                </Grid>
            </Grid>
            <Grid xs={12} sm={12} md={6} sx={{maxWidth: '600px'}}>
                <Box component='div'>
                    <Box component='div'>
                        <Typography variant="h3" sx={{ margin: 1}}>
                            {product.author}
                        </Typography>
                        <Typography variant="h4" sx={{ margin: 1}}>
                            {product.title}, {product.piece_info?.year}
                        </Typography>
                    </Box>
                    <Box component='div'>
                        <Typography variant="h5" sx={{ margin: 1, display: 'flex', justifyContent: 'space-between'}}>
                            €{product.price.amount['EUR']} 
                        
                            {isInStock ? ( // if stock is greater than 0, show stock, else show out of stock
                            <span style={{ color: 'green' }}>In Stock</span>
                        ) : (
                            <span style={{ color: 'red' }}>Out of Stock</span>
                        )}
                        </Typography>
    
                        <Button variant="gradient" disabled={!isInStock} fullWidth>
                            <Typography variant="button" sx={{ margin: 0.5}}>
                                Compre Já!
                            </Typography>
                        </Button>
                        
                    </Box>
                    <Box component='div' sx={{mt: 3}}>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="details-content"
                                id="details-header"
                            >
                            <Typography variant="h6">
                                Detalhes da Obra:
                            </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography variant="body1" sx={{ margin: 0.5}}>
                                    Tecnica:  {product.piece_info?.technique}
                                </Typography>
                                <Typography variant="body1" sx={{ margin: 0.5}}> 
                                    Dimensões: {product.piece_info?.dimensions.width} x {product.piece_info?.dimensions.height} x {product.piece_info?.dimensions.depth} {product.piece_info?.dimensions.measure} 
                                </Typography>
                                <Typography variant="body1" sx={{ margin: 0.5}}>     
                                    Material: {product.piece_info?.material}
                                </Typography> 
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="description-content"
                                id="description-header"
                            >
                            <Typography variant="h6">
                                Descrição:
                            </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography variant="body1" >
                                    {product.description}
                                </Typography> 
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="deliveries-content"
                                id="deliveries-header"
                            >
                            <Typography variant="h6">
                                Entregas:
                            </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography variant="body1" >
                                    {product.description}
                                </Typography> 
                            </AccordionDetails>
                        </Accordion>
                    </ Box> 
                </Box>
            </Grid>
        </Grid>
    );
};

export default ProductDetails;

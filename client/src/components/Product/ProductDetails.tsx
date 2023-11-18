import { Box, Button, ImageList, ImageListItem, Typography } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Grid from '@mui/material/Unstable_Grid2'; 
import { ProductType } from '../../types/product';
import { useState } from 'react';


const ProductDetails = (data: { product: ProductType}) => {
    const product = data.product;

    const [selectedImage, setSelectedImage] = useState(product.photos[0]);
    const [isInStock, setIsInStock] = useState(product.stock > 0); 

    const [lightboxOpen, setLightboxOpen] = useState(false);

    const openLightbox = () => {
        setLightboxOpen(true);
    };

    return (
        <Grid container component='div' columnSpacing={2}>
            <Grid  xs={12} sm={12} md={6}>
                <Grid container component='div'>
                    <Grid xs={12} sm={12} md={10} order={{ md: 2 }}>
                        
                        <img
                            src={selectedImage}
                            alt={product.title}
                            style={{ border: '1px solid #999999',  maxHeight: '700px', maxWidth: '500px',}}
                        />

                    </Grid>
                    <Grid xs={12} sm={12} md={2} order={{ md: 1 }}>
                        <ImageList
                            sx={{
                                width: '72px',
                                height: '300px',
                                mr: '20px',
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
            <Grid xs={12} sm={12} md={6}>
                <Box component='div'>
                    <Box component='div'>
                        <Typography variant="h3" sx={{ margin: 1}}>
                            {product.author}
                        </Typography>
                        <Typography variant="h4" sx={{ maxWidth: '650px', margin: 1}}>
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
    
                        <Button variant="contained" disabled={!isInStock} sx={{ width: '100%'}}>
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

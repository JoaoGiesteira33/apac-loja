import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton,
    Typography,
    Slide,
    Box,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ImageMagnifier from './ImageMagnifier';
import Carousel from 'react-material-ui-carousel';

export function ImageLightBox(data) {
    const { status, statusFunc, images } = data;

    const handleClose = () => {
        statusFunc(false);
    };

    return (
        <Dialog
            open={status}
            onClose={handleClose}
            TransitionComponent={Slide}
            fullScreen
            PaperProps={{
                style: {
                    backgroundColor: 'gray',
                    opacity: '0.95',
                },
            }}>
            <DialogTitle>
                <Box
                    component="div"
                    sx={{ display: 'flex', flexDirection: 'row' }}>
                    <Typography variant="h6">
                        Click on the image to see the artwork in detail.
                    </Typography>
                    <IconButton
                        color="inherit"
                        onClick={handleClose}
                        edge="end"
                        sx={{ ml: 'auto' }}>
                        <CloseIcon />
                    </IconButton>
                </Box>
            </DialogTitle>
            <DialogContent>
                <Carousel animation="slide" autoPlay={false}>
                    {images.map((image, index) => (
                        <Box
                            component="div"
                            key={index}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            <ImageMagnifier src={image} />
                        </Box>
                    ))}
                </Carousel>
            </DialogContent>
        </Dialog>
    );
}

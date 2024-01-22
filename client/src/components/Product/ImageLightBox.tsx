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
import { useTranslation } from 'react-i18next';
import { checkLink } from '../../fetchers';

export function ImageLightBox(data) {
    const { t } = useTranslation();
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
                        {t('product.magnifier')}
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
                <Carousel
                    animation="slide"
                    autoPlay={false}
                    navButtonsAlwaysVisible
                    index={data.selectedIndex}>
                    {images.map((image, index) => (
                        <Box
                            component="div"
                            key={index}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            <ImageMagnifier src={checkLink(image)} />
                        </Box>
                    ))}
                </Carousel>
            </DialogContent>
        </Dialog>
    );
}

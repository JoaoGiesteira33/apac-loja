import {
    Dialog,
    DialogHeader,
    DialogBody,
    Carousel,
    IconButton,
    Typography,
} from '@material-tailwind/react';
import ImageMagnifier from './ImageMagnifier';
import CloseIcon from '@mui/icons-material/Close';

export function ImageLightBox(data: {
    status: boolean;
    statusFunc: any;
    images: string[];
}) {
    const { status, statusFunc, images } = data;

    return (
        <>
            <Dialog
                open={status}
                handler={statusFunc}
                size="xxl"
                animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0.9, y: -100 },
                }}
                className="bg-gray-900 bg-opacity-95">
                <DialogHeader className="flex justify-between">
                    <Typography color="white" variant="h6">
                        Click on the image to see the artwork in detail.
                    </Typography>

                    <IconButton
                        size="sm"
                        color="white"
                        variant="outlined"
                        onClick={() => statusFunc(false)}>
                        <CloseIcon />
                    </IconButton>
                </DialogHeader>
                <DialogBody className="flex flex-col items-center justify-center">
                    <Carousel
                        className="flex aspect-w-1 aspect-h-1 w-auto max-h-160 sm:max-h-176 lg:max-h-192"
                        transition={{ type: 'spring', duration: 1 }}
                        loop={true}>
                        {images.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={'image ' + index}
                                className="w-full h-full object-contain"
                            />
                        ))}

                        {/* <ImageMagnifier src={image}/> */}
                    </Carousel>
                </DialogBody>
            </Dialog>
        </>
    );
}

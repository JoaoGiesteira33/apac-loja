import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Typography,
} from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import CheckoutStep4 from './CheckoutPaymentStep';

export const ReserveModal = () => {
    const { t } = useTranslation();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <React.Fragment>
                <Button
                    variant="contained"
                    className="w-full mb-4"
                    onClick={handleClickOpen}>
                    {t('cart.reservation-button')}
                </Button>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                        component: 'form',
                        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                            event.preventDefault();
                            const formData = new FormData(event.currentTarget);
                            const formJson = Object.fromEntries(
                                (formData as any).entries()
                            );
                            const email = formJson.email;
                            console.log(email);
                            handleClose();
                        },
                    }}>
                    <DialogTitle>{t('cart.reservation.title')}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <Typography
                                component="p"
                                variant="body1"
                                className="font-poppins">
                                {t('cart.reservation.text')}
                            </Typography>
                        </DialogContentText>
                        <CheckoutStep4 />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>
                            {t('cart.reservation.cancel-button')}
                        </Button>
                        {/* <Button type="submit">Subscribe</Button> */}
                    </DialogActions>
                    <Typography
                        component="p"
                        variant="body1"
                        fontSize="0.75rem"
                        className="font-poppins p-2">
                        * {t('cart.reservation.info')}
                        <br />* {t('cart.reservation.info2')}
                    </Typography>
                </Dialog>
            </React.Fragment>
        </div>
    );
};

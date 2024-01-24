import InfoOutlined from '@mui/icons-material/InfoOutlined';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Divider,
    FormControl,
    FormLabel,
    InputAdornment,
    TextField,
    Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

const MultibancoComponent = () => {
    const { t } = useTranslation();

    return (
        <div>
            <Card
                variant="elevation"
                sx={{
                    maxHeight: 'max-content',
                    maxWidth: '100%',
                    mx: 'auto',
                    // to make the demo resizable
                    overflow: 'auto',
                    resize: 'horizontal',
                }}>
                <Typography
                    component="h3"
                    variant="h5"
                    sx={{ marginY: '1rem', marginLeft: '1rem' }}>
                    <InfoOutlined /> {t('checkout.payment.credit-card')}
                </Typography>
                <Divider variant="middle" />
                <CardContent
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, minmax(80px, 1fr))',
                        gap: 2,
                    }}>
                    <FormControl sx={{ gridColumn: '1/-1' }}>
                        <FormLabel>
                            {t('checkout.payment.card-number')}
                        </FormLabel>
                        <TextField
                            placeholder="0000 0000 0000 0000"
                            variant="standard"
                            fullWidth
                            type="text"
                            id="card-number"
                            autoComplete="cc-number"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="start">
                                        <CreditCardIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>
                            {t('checkout.payment.card-expiration')}
                        </FormLabel>
                        <TextField
                            placeholder="MM/YYYY"
                            variant="standard"
                            fullWidth
                            type="text"
                            id="expiry-date"
                            autoComplete="cc-exp"
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>{t('checkout.payment.card-cvc')}</FormLabel>
                        <TextField
                            placeholder="000"
                            variant="standard"
                            fullWidth
                            type="text"
                            id="cvc"
                            autoComplete="cc-csc"
                        />
                    </FormControl>
                    <FormControl sx={{ gridColumn: '1/-1' }}>
                        <FormLabel>
                            {t('checkout.payment.card-holder')}
                        </FormLabel>
                        <TextField
                            placeholder={t('checkout.payment.full-name')}
                            variant="standard"
                            fullWidth
                            type="text"
                            id="card-holder-name"
                            autoComplete="cc-name"
                        />
                    </FormControl>

                    <CardActions sx={{ gridColumn: '1/-1' }}>
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{ width: '100%', marginX: '15%' }}>
                            {t('checkout.payment.pay')}
                        </Button>
                    </CardActions>
                </CardContent>
            </Card>
            <Typography
                component="p"
                variant="caption"
                style={{ color: 'gray' }}>
                O valor máximo para pagamento com MBWay é de 3999€.
            </Typography>
        </div>
    );
};

export default MultibancoComponent;

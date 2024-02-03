import {
    Box,
    Divider,
    Paper,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { Dispatch, SetStateAction, useState } from 'react';
import CountrySelect from './pintar_o_7/CountrySelect';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import { useTranslation } from 'react-i18next';
import { CountryType } from '../types/country';

interface CheckoutStep2Props {
    validate: boolean;
    setValidFunc: Dispatch<SetStateAction<boolean>>;
}

const CheckoutStep2 = ({ validate, setValidFunc }: CheckoutStep2Props) => {
    const { t } = useTranslation();

    const [countryInput, setCountryInput] = useState('');
    const [country, setCountry] = useState<CountryType>({
        code: 'PT',
        label: 'Portugal',
        phone: '+351',
    });

    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [postalCode, setPostalCode] = useState('');

    const [showCountryAlert, setShowCountryAlert] = useState(false);

    const [showCityError, setShowCityError] = useState(false);
    const [showAddressError, setShowAddressError] = useState(false);
    const [showPostalCodeError, setShowPostalCodeError] = useState(false);

    const checkPostalCode = (postalCode: string) => {
        const re = /^[0-9]{4}-[0-9]{3}$/;
        return re.test(postalCode);
    };

    const disableAlerts = () => {
        setShowCityError(false);
        setShowAddressError(false);
        setShowPostalCodeError(false);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        disableAlerts();

        if (city === '') {
            setShowCityError(true);
            return;
        }

        if (address === '') {
            setShowAddressError(true);
            return;
        }

        if (!checkPostalCode(postalCode) && postalCode !== '') {
            setShowPostalCodeError(true);
            return;
        }

        setValidFunc(true);
    };

    return (
        <Box
            component="div"
            style={{
                paddingLeft: '10%',
                paddingRight: '10%',
                paddingBottom: 10,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'left',
                background: 'white',
                color: 'black',
            }}>
            <Paper
                elevation={0}
                style={{
                    paddingLeft: '10%',
                    paddingRight: '10%',
                    paddingBottom: 10,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'left',
                    background: 'white',
                    color: 'black',
                }}>
                <Typography
                    component="h1"
                    variant="h5"
                    style={{ margin: '20px 0', color: 'black' }}>
                    {t('checkout.shipping.title')}
                </Typography>
                <form style={{ width: '100%' }} onSubmit={handleSubmit}>
                    {/* ----------- ADDRESS ---------------- */}
                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={{ xs: 1, sm: 2 }}
                        sx={{ marginTop: 2 }}>
                        <CountrySelect
                            selection={country}
                            setSelection={setCountry}
                            selectionInput={countryInput}
                            setSelectionInput={setCountryInput}
                            showCountryAlert={showCountryAlert}
                            sx={{ marginTop: '1rem', flex: 1 }}
                        />
                        <TextField
                            variant="standard"
                            margin="normal"
                            label={t('checkout.shipping.city')}
                            type="text"
                            id="city"
                            name="client_fields.demographics.address.city"
                            error={showCityError}
                            helperText={
                                showCityError
                                    ? t('checkout.shipping.city-error')
                                    : ' '
                            }
                            autoComplete="city"
                            value={city}
                            sx={{ maxWidth: { sx: '100%', sm: '40%' } }}
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </Stack>
                    <Box component="div">
                        <Stack
                            direction={{ xs: 'column', sm: 'row' }}
                            spacing={{ xs: 1, sm: 2 }}
                            sx={{ marginBottom: 1, marginTop: 2 }}>
                            <TextField
                                variant="standard"
                                margin="normal"
                                label={t('checkout.shipping.address')}
                                type="text"
                                name="client_fields.demographics.address.street"
                                fullWidth
                                error={showAddressError}
                                helperText={
                                    showAddressError
                                        ? t('checkout.shipping.address-error')
                                        : ' '
                                }
                                id="address"
                                autoComplete="address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                            <TextField
                                variant="standard"
                                margin="normal"
                                label={t('checkout.shipping.postal-code')}
                                type="text"
                                name="client_fields.demographics.address.postal_code"
                                error={showPostalCodeError}
                                helperText={
                                    showPostalCodeError
                                        ? t(
                                              'checkout.shipping.postal-code-error'
                                          )
                                        : ' '
                                }
                                id="postalCode"
                                autoComplete="postalCode"
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                            />
                        </Stack>
                        <TextField
                            variant="standard"
                            margin="normal"
                            fullWidth
                            name="adress2"
                            label={t('checkout.shipping.address2')}
                            type="text"
                            id="afress2"
                        />
                    </Box>
                    {/* ----------- Shipping ---------------- */}
                    <Stack
                        direction="column"
                        spacing={{ xs: 1, sm: 2 }}
                        sx={{ marginBottom: 1, marginTop: 2 }}>
                        <Typography
                            variant="h6"
                            color="black"
                            className="font-poppins">
                            {t('checkout.shipping.shipping-cost')}
                        </Typography>
                        <Typography
                            variant="body1"
                            color="black"
                            className="font-poppins">
                            {new Intl.NumberFormat('pt-PT', {
                                style: 'currency',
                                currency: 'EUR',
                            }).format(13.99)}
                        </Typography>
                        <Divider />
                        <Typography
                            fontSize="small"
                            color="primary"
                            className="font-poppins">
                            <InfoRoundedIcon className="h-4 w-4" />
                            {t('checkout.shipping.shipping-info')}
                        </Typography>
                    </Stack>
                </form>
            </Paper>
        </Box>
    );
};

export default CheckoutStep2;

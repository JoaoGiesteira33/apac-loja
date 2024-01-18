import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    SelectChangeEvent,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { useState } from 'react';
import CountrySelect from './pintar_o_7/CountrySelect';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';

const CheckoutStep2 = () => {
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [shipping, setShipping] = useState('');

    const [showCountryAlert, setShowCountryAlert] = useState(false);

    const [showCityError, setShowCityError] = useState(false);
    const [showAddressError, setShowAddressError] = useState(false);
    const [showPostalCodeError, setShowPostalCodeError] = useState(false);

    const handleChange = (event: SelectChangeEvent) => {
        setShipping(event.target.value);
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
                    Dados de entrega
                </Typography>
                <form style={{ width: '100%' }}>
                    {/* ----------- ADDRESS ---------------- */}
                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={{ xs: 1, sm: 2 }}
                        sx={{ marginTop: 2 }}>
                        <CountrySelect
                            selection={country}
                            setSelection={setCountry}
                            sx={{ marginTop: '1rem', flex: 1 }}
                            showCountryAlert={showCountryAlert}
                        />
                        <TextField
                            variant="standard"
                            margin="normal"
                            label="Cidade"
                            type="text"
                            id="city"
                            name="client_fields.demographics.address.city"
                            error={showCityError}
                            helperText={showCityError ? 'Cidade Inválida' : ' '}
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
                                label="Morada"
                                type="text"
                                name="client_fields.demographics.address.street"
                                fullWidth
                                error={showAddressError}
                                helperText={
                                    showAddressError ? 'Morada Inválida' : ' '
                                }
                                id="address"
                                autoComplete="address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                            <TextField
                                variant="standard"
                                margin="normal"
                                label="Código Postal"
                                type="text"
                                name="client_fields.demographics.address.postal_code"
                                error={showPostalCodeError}
                                helperText={
                                    showPostalCodeError
                                        ? 'Código Postal Inválido'
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
                            label="Apartamento, bloco, lote, prédio, andar, etc."
                            type="text"
                            id="afress2"
                        />
                    </Box>
                    {/* ----------- Shipping ---------------- */}
                    <Stack direction="column" spacing={{ xs: 1, sm: 2 }} sx={{ marginBottom: 1, marginTop: 2 }}>
                        <Typography
                            variant="h6"
                            color="black"
                            className="font-poppins">
                            Selecione o método de entrega:
                        </Typography>
                        <FormControl
                            variant="standard"
                            sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="Shippinglabel">
                                Método de entrega
                            </InputLabel>
                            <Select
                                labelId="Shippinglabel"
                                id="shipping-select-standard"
                                value={shipping}
                                onChange={handleChange}
                                label="Método de entrega">
                                <MenuItem value={'STANDARD'}>Standard - 5€</MenuItem>
                                <MenuItem value={'EXPRESSO'}>Expresso - 10€</MenuItem>
                                <MenuItem value={'CUSTOM'}>
                                    Depende da localização do utilizador
                                </MenuItem>
                            </Select>
                            <Typography
                                fontSize="small"
                                color="gray"
                                className="font-poppins">
                                <InfoRoundedIcon className="h-4 w-4" /> Todas as
                                obras são transportadas com seguro de envio.
                            </Typography>
                        </FormControl>
                    </Stack>
                </form>
            </Paper>
        </Box>
    );
};

export default CheckoutStep2;

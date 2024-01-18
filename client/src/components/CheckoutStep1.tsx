import {
    Alert,
    Box,
    Paper,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { useState } from 'react';
import CountrySelect from './pintar_o_7/CountrySelect';

const CheckoutStep1 = () => {
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [phone, setPhone] = useState('');

    const [showCountryAlert, setShowCountryAlert] = useState(false);
    const [showPhoneAlert, setShowPhoneAlert] = useState(false);

    const [showCityError, setShowCityError] = useState(false);
    const [showAddressError, setShowAddressError] = useState(false);
    const [showPostalCodeError, setShowPostalCodeError] = useState(false);

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
                    style={{ margin: '20px 0', color: 'black', }}>
                    Dados de faturação
                </Typography>
                <form style={{ width: '100%' }}>
                    {/* ----------- NAME ---------------- */}
                    <TextField
                        variant="standard"
                        margin="normal"
                        required
                        fullWidth
                        name="client_fields.demographics.name"
                        label="Primeiro e último nome"
                        type="text"
                        id="name"
                        autoComplete="name"
                    />
                    {/* ----------- NIF ---------------- */}
                    <TextField
                        variant="standard"
                        margin="normal"
                        required
                        fullWidth
                        name="nif"
                        label="Nº de Contribuinte"
                        type="number"
                        id="nif"
                    />
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
                    {/* ----------- PHONE NUMBER ---------------- */}
                    {showPhoneAlert && (
                        <Alert
                            onClose={() => {
                                setShowPhoneAlert(false);
                            }}
                            variant="filled"
                            severity="error">
                            Número de telefone inválido!
                        </Alert>
                    )}
                    <TextField
                        variant="standard"
                        margin="normal"
                        fullWidth
                        name="client_fields.demographics.phone"
                        label="Número de Telefone"
                        type="text"
                        id="phone"
                        autoComplete="phoneNumber"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    <Typography
                    variant="caption"
                    color='gray'>
                    Pode ser usado para auxiliar a entrega
                </Typography>
                    
                </form>
            </Paper>
        </Box>
    );
};

export default CheckoutStep1;

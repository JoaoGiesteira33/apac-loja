import React, { useState } from 'react';
import {
    Box,
    TextField,
    Button,
    Typography,
    Paper,
    CssBaseline,
    Grid,
    Alert,
    Stack,
} from '@mui/material';
import { registerUser } from '../../fetchers';
import { useNavigate } from 'react-router-dom';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import CountrySelect from '../../components/pintar_o_7/CountrySelect';

const Register = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [name, setName] = useState('');
    const [birth_date, setBirthDate] = useState('');
    const [phone, setPhone] = useState('');

    const [country, setCountry] = useState('');
    const [address, setAddress] = useState('');
    const [postlaCode, setPostalCode] = useState('');
    const [city, setCity] = useState('');

    const [showEmailAlert, setShowEmailAlert] = useState(false);
    const [showPassAlert, setShowPassAlert] = useState(false);
    const [showPass2Alert, setShowPass2Alert] = useState(false);
    const [showPhoneAlert, setShowPhoneAlert] = useState(false);
    const [showOver18Alert, setShowOver18Alert] = useState(false);
    const [showError, setShowError] = useState(false);

    const [showCityError, setShowCityError] = useState(false);
    const [showAddressError, setShowAddressError] = useState(false);
    const [showPostalCodeError, setShowPostalCodeError] = useState(false);
    const [showCountryAlert, setShowCountryAlert] = useState(false);

    const checkEmail = (email: string) => {
        // eslint-disable-next-line no-useless-escape
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    const handleChangePassword = (pass: string) => {
        setPassword2(pass);
        if (pass !== password) {
            setShowPass2Alert(true);
        } else {
            setShowPass2Alert(false);
        }
    };

    const checkOver18 = (date: string) => {
        const today = new Date();
        const birthDate = new Date(date);

        const age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();

        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            return age - 1;
        }
        return age;
    };

    const checkPostalCode = (postalCode: string) => {
        const re = /^[0-9]{4}-[0-9]{3}$/;
        return re.test(postalCode);
    };

    const disableAlerts = () => {
        setShowEmailAlert(false);
        setShowPassAlert(false);
        setShowPass2Alert(false);
        setShowPhoneAlert(false);
        setShowOver18Alert(false);
        setShowCityError(false);
        setShowAddressError(false);
        setShowPostalCodeError(false);
    };

    const handleRegisto = async (e) => {
        e.preventDefault();
        disableAlerts();

        console.log('Register clicked');
        if (!checkEmail(email)) {
            setShowEmailAlert(true);
            return;
        } else if (password.length < 6) {
            setShowPassAlert(true);
            return;
        } else if (phone.length !== 9) {
            setShowPhoneAlert(true);
            return;
        } else if (checkOver18(birth_date) < 18) {
            setShowOver18Alert(true);
            return;
        } else if (city === '') {
            setShowCityError(true);
            return;
        } else if (address === '') {
            setShowAddressError(true);
            return;
        } else if (checkPostalCode(postlaCode)) {
            setShowPostalCodeError(true);
            return;
        } else if (country === '') {
            setShowCountryAlert(true);
            return;
        } else {
            disableAlerts();
            let data = new FormData(e.target);
            console.log('Body:', data);
            data.set('client_fields.demographics.address.country', country);

            try {
                const response = await registerUser(data);
                navigate('/login');
            } catch (error) {
                console.log(error);
            }

            // TO DO - verificar formatacao dos campos + fazer ligacao com backend
        }
    };

    return (
        <Box component="div" maxWidth="xs">
            <CssBaseline />
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
                    Registar
                </Typography>
                <form onSubmit={handleRegisto} style={{ width: '100%' }}>
                    {/* ----------- EMAIL ---------------- */}
                    {showEmailAlert && (
                        <Alert
                            onClose={() => {
                                setShowEmailAlert(false);
                            }}
                            variant="filled"
                            severity="error">
                            Email Inválido!
                        </Alert>
                    )}
                    <TextField
                        variant="standard"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        variant="standard"
                        id="role"
                        name="role"
                        value={'client'}
                        sx={{ display: 'none' }}
                    />
                    {/* ----------- PASSWORD ---------------- */}
                    {showPassAlert && (
                        <Alert
                            onClose={() => {
                                setShowPassAlert(false);
                            }}
                            variant="filled"
                            severity="error">
                            Palavra-passe deve ter pelo menos 6 caracteres!
                        </Alert>
                    )}
                    <TextField
                        variant="standard"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Palavra-passe"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {/* ----------- PASSWORD2 ---------------- */}
                    {showPass2Alert && (
                        <Alert variant="filled" severity="warning">
                            Palavras-passe não coincidem!
                        </Alert>
                    )}
                    <TextField
                        variant="standard"
                        margin="normal"
                        required
                        fullWidth
                        name="password2"
                        label="Palavra-passe"
                        type="password"
                        id="password2"
                        autoComplete="current-password"
                        value={password2}
                        onChange={(e) => handleChangePassword(e.target.value)}
                    />
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
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    {/* ----------- DATE OF BIRTH ---------------- */}
                    {showOver18Alert && (
                        <Alert
                            onClose={() => {
                                setShowOver18Alert(false);
                            }}
                            variant="filled"
                            severity="error">
                            Deve ter mais de 18 anos!
                        </Alert>
                    )}
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            disableFuture
                            openTo="day"
                            views={['year', 'month', 'day']}
                            format="DD/MM/YYYY"
                            label="Data de Nascimento"
                            value={birth_date}
                            slotProps={{
                                textField: {
                                    variant: 'standard',
                                    fullWidth: true,
                                    required: true,
                                    name: 'client_fields.demographics.birth_date',
                                    margin: 'normal',
                                },
                            }}
                            onChange={(value) => setBirthDate(value)}
                        />
                    </LocalizationProvider>
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
                            value={postlaCode}
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
                    {/* ----------- SUBMIT ---------------- */}
                    {showError && (
                        <Alert
                            onClose={() => {
                                setShowError(false);
                            }}
                            variant="filled"
                            severity="error">
                            Erro ao registar, contacte o suporte!
                        </Alert>
                    )}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        style={{
                            margin: '20px 0',
                            backgroundColor: 'black',
                            color: 'white',
                        }}>
                        Registar
                    </Button>
                    * Campos obrigatórios
                </form>
            </Paper>
        </Box>
    );
};

export default Register;

import {
    Alert,
    Box,
    Button,
    CssBaseline,
    Paper,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import CountrySelect from '../../components/pintar_o_7/CountrySelect';
import { newCustomer } from '../../types/user';
import { saveUserInfo } from '../../utils/db';
import { auth } from '../../utils/firebase';

const Register = () => {
    const [t] = useTranslation();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [name, setName] = useState('');
    const [birth_date, setBirthDate] = useState('');
    const [phone, setPhone] = useState('');

    const [country, setCountry] = useState('');
    const [address, setAddress] = useState('');
    const [postalCode, setPostalCode] = useState('');
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

    const handleRegister = async (e) => {
        e.preventDefault();
        disableAlerts();

        console.log('Register clicked');
        if (!checkEmail(email)) {
            setShowEmailAlert(true);
            return;
        } else if (password.length < 6) {
            setShowPassAlert(true);
            return;
        } else if (phone.length !== 9 && phone.length !== 0) {
            setShowPhoneAlert(true);
            return;
        } else if (checkOver18(birth_date) < 18) {
            setShowOver18Alert(true);
            return;
        } else if (postalCode !== '' && !checkPostalCode(postalCode)) {
            setShowPostalCodeError(true);
            return;
        } else {
            disableAlerts();
            // Use Firebase registration function
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    const customer = newCustomer(
                        user.uid,
                        email,
                        name,
                        new Date(birth_date),
                        phone,
                        {
                            street: address,
                            postalCode: postalCode,
                            city: city,
                            country: country,
                        }
                    );

                    saveUserInfo(customer);
                    navigate('/gallery');
                    return;
                })
                .catch((error) => {
                    // const errorCode = error.code;
                    // const errorMessage = error.message;
                    // ..
                    setShowError(true);
                    console.log(error);
                });
        }
    };

    return (
        <Box component="div" maxWidth="xs">
            <CssBaseline />
            <Paper
                elevation={0}
                sx={{
                    px: { md: '30%', xs: '10%' },
                    py: '3%',
                }}
                style={{
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
                    {t('global.register')}
                </Typography>
                <form onSubmit={handleRegister} style={{ width: '100%' }}>
                    {/* ----------- EMAIL ---------------- */}
                    {showEmailAlert && (
                        <Alert
                            onClose={() => {
                                setShowEmailAlert(false);
                            }}
                            variant="filled"
                            severity="error">
                            {t('errors.register.email')}
                        </Alert>
                    )}
                    <TextField
                        variant="standard"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label={t('forms.email')}
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
                            {t('errors.register.password')}
                        </Alert>
                    )}
                    <TextField
                        variant="standard"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label={t('forms.password')}
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {/* ----------- PASSWORD2 ---------------- */}
                    {showPass2Alert && (
                        <Alert variant="filled" severity="warning">
                            {t('errors.register.password-no-match')}
                        </Alert>
                    )}
                    <TextField
                        variant="standard"
                        margin="normal"
                        required
                        fullWidth
                        name="password2"
                        label={t('forms.password')}
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
                        label={t('forms.first-last-name')}
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
                            {t('errors.register.age')}
                        </Alert>
                    )}
                    <DatePicker
                        disableFuture
                        openTo="day"
                        views={['year', 'month', 'day']}
                        format="DD/MM/YYYY"
                        label={t('forms.birth-date')}
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
                    {/* ----------- ADDRESS ---------------- */}
                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={{ xs: 1, sm: 2 }}
                        sx={{ marginTop: 2 }}>
                        <CountrySelect
                            selection={country}
                            setSelection={setCountry}
                            selectionInput={country}
                            setSelectionInput={setCountry}
                            sx={{ marginTop: '1rem', flex: 1 }}
                            showCountryAlert={showCountryAlert}
                        />
                        <TextField
                            variant="standard"
                            margin="normal"
                            label={t('forms.city')}
                            type="text"
                            id="city"
                            name="client_fields.demographics.address.city"
                            error={showCityError}
                            helperText={
                                showCityError ? t('errors.register.city') : ' '
                            }
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
                            label={t('forms.address')}
                            type="text"
                            name="client_fields.demographics.address.street"
                            fullWidth
                            error={showAddressError}
                            helperText={
                                showAddressError
                                    ? t('errors.register.address')
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
                            label={t('forms.postal-code')}
                            type="text"
                            name="client_fields.demographics.address.postal_code"
                            error={showPostalCodeError}
                            helperText={
                                showPostalCodeError
                                    ? t('errors.register.postal-code')
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
                            {t('errors.register.phone-number')}
                        </Alert>
                    )}
                    <TextField
                        variant="standard"
                        margin="normal"
                        fullWidth
                        name="client_fields.demographics.phone"
                        label={t('forms.phone-number')}
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
                            {t('errors.register.submit')}
                        </Alert>
                    )}
                    <Box
                        component="div"
                        sx={{
                            justifyContent: 'center',
                            display: 'flex',
                        }}>
                        <Button
                            type="submit"
                            variant="contained"
                            style={{
                                margin: '20px 0',
                                backgroundColor: 'black',
                                color: 'white',
                                width: '50%',
                            }}>
                            {t('global.register')}
                        </Button>
                    </Box>
                    {t('global.mandatory')}
                </form>
            </Paper>
        </Box>
    );
};

export default Register;

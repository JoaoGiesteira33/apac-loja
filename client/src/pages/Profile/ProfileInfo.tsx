import { useRef, useState } from 'react';

import Box from '@mui/system/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';

import { Button, Stack, Typography } from '@mui/material';

import CountrySelect from '../../components/pintar_o_7/CountrySelect';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import SaveSharpIcon from '@mui/icons-material/SaveSharp';

export default function ProfileInfo() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [country, setCountry] = useState('');
    const [address, setAddress] = useState('');
    const [postlaCode, setPostalCode] = useState('');
    const [city, setCity] = useState('');
    const [phone, setPhone] = useState('');
    const [birth_date, setBirthDate] = useState('');

    const originalName = useRef('');
    const originalEmail = useRef('');
    const originalCountry = useRef('');
    const originalAddress = useRef('');
    const originalPostalCode = useRef('');
    const originalCity = useRef('');
    const originalPhone = useRef('');
    const originalBirthDate = useRef('');

    const [profileChanged, setProfileChanged] = useState(true);

    const [showNameAlert, setShowNameAlert] = useState(false);
    const [showEmailAlert, setShowEmailAlert] = useState(false);
    const [showPhoneAlert, setShowPhoneAlert] = useState(false);
    const [showOver18Alert, setShowOver18Alert] = useState(false);
    const [showCityError, setShowCityError] = useState(false);
    const [showAddressError, setShowAddressError] = useState(false);
    const [showPostalCodeError, setShowPostalCodeError] = useState(false);
    const [showError, setShowError] = useState(false);

    const checkEmail = (email: string) => {
        // eslint-disable-next-line no-useless-escape
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
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

    const hasProfileChanged = () => {
        return (
            name !== originalName.current ||
            email !== originalEmail.current ||
            country !== originalCountry.current ||
            address !== originalAddress.current ||
            postlaCode !== originalPostalCode.current ||
            city !== originalCity.current ||
            phone !== originalPhone.current ||
            birth_date !== originalBirthDate.current
        );
    };

    return (
        <Box
            component="form"
            sx={{
                paddingY: '2rem',
                paddingX: {
                    xs: '2rem',
                    sm: '4rem',
                    md: '6rem',
                    lg: '20%',
                },
            }}>
            <Stack
                direction="column"
                spacing={4}
                alignItems={'center'}
                justifyContent={'flex-start'}>
                <Paper
                    sx={{
                        width: '100%',
                        padding: '2rem',
                    }}>
                    <Typography variant="h4">Account</Typography>
                    <TextField
                        variant="standard"
                        margin="normal"
                        required
                        fullWidth
                        label="Nome"
                        type="text"
                        id="name"
                        autoComplete="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        variant="standard"
                        margin="normal"
                        required
                        fullWidth
                        label="Email"
                        type="email"
                        id="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        variant="standard"
                        margin="normal"
                        fullWidth
                        label="Phone"
                        required
                        type="tel"
                        id="phone"
                        autoComplete="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
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
                </Paper>
                <Paper
                    sx={{
                        width: '100%',
                        padding: '2rem',
                    }}>
                    <Typography variant="h4">Address</Typography>
                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={{ xs: 1, sm: 2 }}
                        sx={{ marginBottom: 1, marginTop: 2 }}>
                        <CountrySelect
                            selection={country}
                            setSelection={setCountry}
                            sx={{ marginTop: '1rem', flex: 1 }}
                        />
                        <TextField
                            variant="standard"
                            margin="normal"
                            label="City"
                            type="text"
                            id="city"
                            required
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
                            label="Address"
                            type="text"
                            fullWidth
                            required
                            id="address"
                            autoComplete="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                        <TextField
                            variant="standard"
                            margin="normal"
                            label="Postal Code"
                            type="text"
                            required
                            id="postalCode"
                            autoComplete="postalCode"
                            value={postlaCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                        />
                    </Stack>
                </Paper>
                {profileChanged && (
                    <Button startIcon={<SaveSharpIcon />} variant="contained">
                        Guardar Alterações
                    </Button>
                )}
            </Stack>
        </Box>
    );
}

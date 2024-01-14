import { useRef, useState, useEffect } from 'react';

import Box from '@mui/system/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';

import { Button, Stack, Typography } from '@mui/material';

import CountrySelect from '../../components/pintar_o_7/CountrySelect';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import SaveSharpIcon from '@mui/icons-material/SaveSharp';
import dayjs, { Dayjs } from 'dayjs';

const TODAY_MINUS_18_YEARS: Dayjs = dayjs().subtract(18, 'year');

export default function ProfileInfo() {
    const userInfo = JSON.parse(localStorage.getItem('user') as string);

    const [name, setName] = useState(() => {
        if (userInfo) return userInfo.client_fields.demographics.name;
        else return '';
    });
    const [email, setEmail] = useState(() => {
        if (userInfo) return userInfo.email;
        else return '';
    });
    const [country, setCountry] = useState(() => {
        if (userInfo)
            return userInfo.client_fields.demographics.address.country;
        else return '';
    });
    const [address, setAddress] = useState(() => {
        if (userInfo) return userInfo.client_fields.demographics.address.street;
        else return '';
    });
    const [postalCode, setPostalCode] = useState(() => {
        if (userInfo)
            return userInfo.client_fields.demographics.address.postal_code;
        else return '';
    });
    const [city, setCity] = useState(() => {
        if (userInfo) return userInfo.client_fields.demographics.address.city;
        else return '';
    });
    const [phone, setPhone] = useState(() => {
        if (userInfo) return userInfo.client_fields.demographics.phone;
        else return '';
    });
    const [birth_date, setBirthDate] = useState(() => {
        if (userInfo) {
            return dayjs(userInfo.client_fields.demographics.birth_date);
        } else {
            return dayjs();
        }
    });

    const originalName = useRef(() => {
        if (userInfo) return userInfo.client_fields.demographics.name;
        else return '';
    });
    const originalEmail = useRef(() => {
        if (userInfo) return userInfo.email;
        else return '';
    });
    const originalCountry = useRef(() => {
        if (userInfo)
            return userInfo.client_fields.demographics.address.country;
        else return '';
    });
    const originalAddress = useRef(() => {
        if (userInfo) return userInfo.client_fields.demographics.address.street;
        else return '';
    });
    const originalPostalCode = useRef(() => {
        if (userInfo)
            return userInfo.client_fields.demographics.address.postal_code;
        else return '';
    });
    const originalCity = useRef(() => {
        if (userInfo) return userInfo.client_fields.demographics.address.city;
        else return '';
    });
    const originalPhone = useRef(() => {
        if (userInfo) return userInfo.client_fields.demographics.phone;
        else return '';
    });
    const originalBirthDate = useRef(() => {
        if (userInfo) {
            return dayjs(userInfo.client_fields.demographics.birth_date);
        } else {
            return dayjs();
        }
    });

    const [profileChanged, setProfileChanged] = useState(true);

    const [showNameAlert, setShowNameAlert] = useState(false);
    const [showEmailAlert, setShowEmailAlert] = useState(false);
    const [showPhoneAlert, setShowPhoneAlert] = useState(false);
    const [showOver18Alert, setShowOver18Alert] = useState(false);
    const [showCityError, setShowCityError] = useState(false);
    const [showAddressError, setShowAddressError] = useState(false);
    const [showPostalCodeError, setShowPostalCodeError] = useState(false);
    const [showCountryAlert, setShowCountryAlert] = useState(false);

    const checkEmail = (email: string) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    const disableAllAlerts = () => {
        setShowNameAlert(false);
        setShowEmailAlert(false);
        setShowPhoneAlert(false);
        setShowOver18Alert(false);
        setShowCityError(false);
        setShowAddressError(false);
        setShowPostalCodeError(false);
    };

    const hasProfileChanged = () => {
        return (
            name !== originalName.current ||
            email !== originalEmail.current ||
            country !== originalCountry.current ||
            address !== originalAddress.current ||
            postalCode !== originalPostalCode.current ||
            city !== originalCity.current ||
            phone !== originalPhone.current ||
            birth_date !== originalBirthDate.current
        );
    };

    const handleProfileSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        disableAllAlerts();

        if (!hasProfileChanged()) return;
        let hasErrors: boolean = false;

        if (name === '') {
            setShowNameAlert(true);
            hasErrors = true;
        }
        if (!checkEmail(email)) {
            setShowEmailAlert(true);
            hasErrors = true;
        }
        if (phone.length !== 9) {
            setShowPhoneAlert(true);
            hasErrors = true;
        }
        if (birth_date === null) {
            hasErrors = true;
        } else if (birth_date.isAfter(TODAY_MINUS_18_YEARS)) {
            hasErrors = true;
        }
        if (city === '') {
            setShowCityError(true);
            hasErrors = true;
        }
        if (address === '') {
            setShowAddressError(true);
            hasErrors = true;
        }
        if (postalCode === '') {
            setShowPostalCodeError(true);
            hasErrors = true;
        }
        if (country === '') {
            setShowCountryAlert(true);
            hasErrors = true;
        }
        if (hasErrors) return;
    };

    return (
        <Box
            onSubmit={(e) => handleProfileSubmit(e)}
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
                        fullWidth
                        error={showNameAlert}
                        helperText={showNameAlert ? 'Nome inválido' : ' '}
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
                        fullWidth
                        error={showEmailAlert}
                        helperText={showEmailAlert ? 'Email Inválido' : ' '}
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
                        error={showPhoneAlert}
                        helperText={showPhoneAlert ? 'Telemóvel Inválido' : ' '}
                        type="tel"
                        id="phone"
                        autoComplete="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    <DatePicker
                        disableFuture
                        openTo="day"
                        views={['year', 'month', 'day']}
                        format="DD/MM/YYYY"
                        maxDate={TODAY_MINUS_18_YEARS}
                        label="Data de Nascimento"
                        value={birth_date}
                        slotProps={{
                            textField: {
                                variant: 'standard',
                                fullWidth: true,
                                required: true,
                                name: 'client_fields.client_fields.demographics.birth_date',
                                margin: 'normal',
                            },
                        }}
                        onChange={(value) => setBirthDate(value)}
                    />
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
                            showCountryAlert={showCountryAlert}
                        />
                        <TextField
                            variant="standard"
                            margin="normal"
                            label="City"
                            type="text"
                            id="city"
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
                            label="Address"
                            type="text"
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
                            label="Postal Code"
                            type="text"
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
                </Paper>
                {profileChanged && (
                    <Button
                        fullWidth
                        type="submit"
                        startIcon={<SaveSharpIcon />}
                        variant="contained">
                        Guardar Alterações
                    </Button>
                )}
            </Stack>
        </Box>
    );
}

import { useState, useMemo, useContext } from 'react';

import Box from '@mui/system/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';

import { Alert, Button, Slide, Stack, Typography } from '@mui/material';

import CountrySelect from '../../components/pintar_o_7/CountrySelect';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import SaveSharpIcon from '@mui/icons-material/SaveSharp';
import dayjs, { Dayjs } from 'dayjs';
import { useTranslation } from 'react-i18next';
import { CountryType, getCountry } from '../../types/country';
import { User } from '../../types/user';
import { NestedPartial } from '../../types/nestedPartial';
import { updateUser } from '../../fetchers';
import { CurrentAccountContext } from '../../contexts/currentAccountContext';

const TODAY_MINUS_18_YEARS: Dayjs = dayjs().subtract(18, 'year');

export default function ProfileInfo() {
    const [t] = useTranslation();
    const userInfo = JSON.parse(localStorage.getItem('user') as string);
    
    const { loggedIn, setLoggedIn, tokenLevel } = useContext(CurrentAccountContext);

    let userInfoType = null;
    if (userInfo && userInfo.seller_fields) {
        userInfoType = userInfo.seller_fields;
    }
    else{
        userInfoType = userInfo.client_fields; 
    }


    const [name, setName] = useState(() => {
        if (userInfo) return userInfoType.demographics.name;
        else return '';
    });
    const [email, setEmail] = useState(() => {
        if (userInfo) return userInfo.email;
        else return '';
    });
    const [country, setCountry] = useState<CountryType | null | undefined>(
        () => {
            if (userInfo && userInfoType.demographics.address?.country) {
                const countryLabel =
                    userInfoType.demographics.address.country;
                const country = getCountry(countryLabel);
                return country;
            } else return null;
        }
    );
    const [countryInput, setCountryInput] = useState<string>(() => {
        if (userInfo && userInfoType.demographics.address?.country)
            return userInfoType.demographics.address.country;
        else return '';
    });
    const [address, setAddress] = useState(() => {
        if (userInfo && userInfoType.demographics.address?.street) return userInfoType.demographics.address.street;
        else return '';
    });
    const [postalCode, setPostalCode] = useState(() => {
        if (userInfo && userInfoType.demographics.address?.postal_code)
            return userInfoType.demographics.address.postal_code;
        else return '';
    });
    const [city, setCity] = useState(() => {
        if (userInfo && userInfoType.demographics.address?.city) return userInfoType.demographics.address.city;
        else return '';
    });
    const [phone, setPhone] = useState<string>(() => {
        if (userInfo && userInfoType.demographics.phone) {
            const phoneFromLocalStorage =
                userInfoType.demographics.phone;
            if (phoneFromLocalStorage != null) return phoneFromLocalStorage;
            else return '';
        } else return '';
    });
    const [birth_date, setBirthDate] = useState<Dayjs | null | undefined>(
        () => {
            if (userInfo) {
                if (userInfoType.demographics.birth_date == null)
                    return dayjs();
                return dayjs(userInfoType.demographics.birth_date);
            } else {
                return dayjs();
            }
        }
    );

    let originalName = '';
    if (userInfo && userInfoType.demographics.name)
        originalName = userInfoType.demographics.name;

    let originalEmail = '';
    if (userInfo && userInfo.email) originalEmail = userInfo.email;

    let originalCountry = undefined;
    if (userInfo && userInfoType.demographics.address?.country) {
        const originalCountryLabel =
            userInfoType.demographics.address.country;
        originalCountry = getCountry(originalCountryLabel);
    }

    let originalAddress = '';
    if (userInfo && userInfoType.demographics.address?.street)
        originalAddress = userInfoType.demographics.address.street;

    let originalPostalCode = '';
    if (userInfo && userInfoType.demographics.address?.postal_code)
        originalPostalCode =
            userInfoType.demographics.address.postal_code;

    let originalCity = '';
    if (userInfo && userInfoType.demographics.address?.city)
        originalCity = userInfoType.demographics.address.city;

    let originalPhone = '';
    if (userInfo && userInfoType.demographics.phone)
        originalPhone = userInfoType.demographics.phone;

    let originalBirthDate = dayjs();
    if (userInfo && userInfoType.demographics.birth_date)
        originalBirthDate = dayjs(
            userInfoType.demographics.birth_date
        );

    const [showNameAlert, setShowNameAlert] = useState(false);
    const [showEmailAlert, setShowEmailAlert] = useState(false);
    const [showPhoneAlert, setShowPhoneAlert] = useState(false);
    const [, setShowOver18Alert] = useState(false);
    const [showCityError, setShowCityError] = useState(false);
    const [showAddressError, setShowAddressError] = useState(false);
    const [showPostalCodeError, setShowPostalCodeError] = useState(false);
    const [showCountryAlert, setShowCountryAlert] = useState(false);

    const [didSaveAlert, setDidSaveAlert] = useState(false);
    const [saveErrorAlert, setSaveErrorAlert] = useState(false);

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

    const hasProfileChanged = useMemo(() => {
        return (
            name !== originalName ||
            email !== originalEmail ||
            country !== originalCountry ||
            address !== originalAddress ||
            postalCode !== originalPostalCode ||
            city !== originalCity ||
            phone !== originalPhone ||
            !originalBirthDate.isSame(birth_date)
        );
    }, [
        name,
        originalName,
        email,
        originalEmail,
        country,
        originalCountry,
        address,
        originalAddress,
        postalCode,
        originalPostalCode,
        city,
        originalCity,
        phone,
        originalPhone,
        originalBirthDate,
        birth_date,
    ]);

    const handleProfileSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        disableAllAlerts();

        if (!hasProfileChanged) return;
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
        if (birth_date == null) {
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
        if (country == null) {
            setShowCountryAlert(true);
            hasErrors = true;
        }
        if (hasErrors) return;

        const newUserInfoC: NestedPartial<User> = {
            email: email,
            client_fields: {
                demographics: {
                    address: {
                        street: address,
                        city: city,
                        postal_code: postalCode,
                        country: countryInput,
                    },
                    name: name,
                    phone: phone,
                    birth_date: birth_date.format('YYYY-MM-DD'),
                },
            },
        };

        const newUserInfoS: NestedPartial<User> = {
            email: email,
            seller_fields: {
                demographics: {
                    address: {
                        street: address,
                        city: city,
                        postal_code: postalCode,
                        country: countryInput,
                    },
                    name: name,
                    phone: phone,
                    birth_date: birth_date.format('YYYY-MM-DD'),
                },
            },
        };

        let newUserInfo = tokenLevel == 'client' ? newUserInfoC : newUserInfoS;
        const token = localStorage.getItem('token');
        if (token == null) return;

        const res = await updateUser(newUserInfo, token);
        if (res.isOk()) {
            const newUserInfoLocalStorage = { ...userInfo, ...newUserInfo };
            localStorage.setItem(
                'user',
                JSON.stringify(newUserInfoLocalStorage)
            );
            setDidSaveAlert(true);
            setSaveErrorAlert(false);
            setTimeout(() => {
                setDidSaveAlert(false);
                setSaveErrorAlert(false);
            }, 5000);
        } else {
            setSaveErrorAlert(true);
            setDidSaveAlert(false);
            setTimeout(() => {
                setSaveErrorAlert(false);
                setDidSaveAlert(false);
            }, 5000);
        }
    };

    return (
        <>
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
                            helperText={
                                showNameAlert ? t('errors.profile.name') : ' '
                            }
                            label={t('forms.first-last-name')}
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
                            helperText={
                                showEmailAlert ? t('errors.profile.email') : ' '
                            }
                            label={t('forms.email')}
                            type="email"
                            id="email"
                            autoComplete="email"
                            disabled
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            variant="standard"
                            margin="normal"
                            fullWidth
                            label={t('forms.phone-number')}
                            error={showPhoneAlert}
                            helperText={
                                showPhoneAlert
                                    ? t('errors.profile.phone-number')
                                    : ' '
                            }
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
                            label={t('forms.birth-date')}
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
                                selectionInput={countryInput}
                                setSelectionInput={setCountryInput}
                                sx={{ marginTop: '1rem', flex: 1 }}
                                showCountryAlert={showCountryAlert}
                            />
                            <TextField
                                variant="standard"
                                margin="normal"
                                label={t('forms.city')}
                                type="text"
                                id="city"
                                error={showCityError}
                                helperText={
                                    showCityError
                                        ? t('errors.profile.city')
                                        : ' '
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
                                fullWidth
                                error={showAddressError}
                                helperText={
                                    showAddressError
                                        ? t('errors.profile.address')
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
                                error={showPostalCodeError}
                                helperText={
                                    showPostalCodeError
                                        ? t('errors.profile.postal-code')
                                        : ' '
                                }
                                id="postalCode"
                                autoComplete="postalCode"
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                            />
                        </Stack>
                    </Paper>
                    {hasProfileChanged && (
                        <Button
                            type="submit"
                            color="secondary"
                            startIcon={<SaveSharpIcon />}
                            variant="contained"
                            size="large"
                            style={{
                                width: '50%',
                                alignSelf: 'center',
                            }}>
                            {t('forms.save')}
                        </Button>
                    )}
                </Stack>
            </Box>
            <Slide direction="up" in={didSaveAlert} mountOnEnter unmountOnExit>
                <Box
                    className="fixed bottom-10"
                    component={'div'}
                    width={'100vw'}
                    display={'flex'}
                    justifyContent={'center'}>
                    <Alert variant="filled" severity="success">
                        {t('forms.saved')}
                    </Alert>
                </Box>
            </Slide>
            <Slide
                direction="up"
                in={saveErrorAlert}
                mountOnEnter
                unmountOnExit>
                <Box
                    className="fixed bottom-10"
                    component={'div'}
                    width={'100vw'}
                    display={'flex'}
                    justifyContent={'center'}>
                    <Alert variant="filled" severity="error">
                        {t('forms.save-error')}
                    </Alert>
                </Box>
            </Slide>
        </>
    );
}

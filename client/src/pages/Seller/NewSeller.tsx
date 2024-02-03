import {
    Alert,
    Avatar,
    Box,
    Button,
    IconButton,
    Paper,
    Slide,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NestedPartial } from '../../types/nestedPartial';
import { createUser, uploadPhoto } from '../../fetchers';
import { User } from '../../types/user';
import { off } from 'process';

const TODAY_MINUS_18_YEARS: Dayjs = dayjs().subtract(18, 'year');

export default function NewSeller() {
    const { t } = useTranslation();

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [birth_date, setBirthDate] = useState<Dayjs | null>(null);
    const [profileImage, setProfileImage] = useState<string>('');

    const inputImageRef = useRef<HTMLInputElement>(null);

    const [showNameAlert, setShowNameAlert] = useState(false);
    const [showEmailAlert, setShowEmailAlert] = useState(false);
    const [showOver18Alert, setShowOver18Alert] = useState(false);

    const [didSaveAlert, setDidSaveAlert] = useState(false);
    const [saveErrorAlert, setSaveErrorAlert] = useState(false);

    const handleNewImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files == null) return;
        setProfileImage(URL.createObjectURL(e.target.files[0]));
    };

    const checkEmail = (email: string) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    const disableAllAlerts = () => {
        setShowNameAlert(false);
        setShowEmailAlert(false);
        setShowOver18Alert(false);
    };

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        disableAllAlerts();

        let hasErrors: boolean = false;

        if (name === '') {
            setShowNameAlert(true);
            hasErrors = true;
        }
        if (!checkEmail(email)) {
            setShowEmailAlert(true);
            hasErrors = true;
        }
        if (birth_date === null) {
            hasErrors = true;
        } else if (birth_date.isAfter(TODAY_MINUS_18_YEARS)) {
            hasErrors = true;
        }

        if (hasErrors) return;
        const userInfo: NestedPartial<User> = {
            seller_fields: {
                demographics: {
                    name: name,
                    birth_date: birth_date!.format('YYYY-MM-DD'),
                },
                seller_type: 'artist',
            },
            email: email,
            nivel: 'seller',
        };

        const token = localStorage.getItem('token');
        if (token == null) return;

        const resNewUser = await createUser(userInfo, token);
        if (resNewUser.isOk()) {
            setDidSaveAlert(true);
            setSaveErrorAlert(false);
            console.log(resNewUser.value);
            uploadAvatar(resNewUser.value._id);
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

    const uploadAvatar = async (userId: string) => {
        const token = localStorage.getItem('token');
        if (token == null) return;
        if (!inputImageRef.current?.files) return;
        if (profileImage === '') return;

        const uploadAvatarRes = await uploadPhoto(
            token,
            userId,
            inputImageRef.current.files[0]
        );
    };

    return (
        <>
            <Box
                component="form"
                onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                    handleFormSubmit(e);
                }}
                sx={{
                    paddingY: '2rem',
                    paddingX: {
                        xs: '2rem',
                        sm: '4rem',
                        md: '6rem',
                        lg: '20%',
                    },
                }}>
                {' '}
                <Stack
                    direction="column"
                    spacing={4}
                    alignItems={'center'}
                    justifyContent={'flex-start'}>
                    <Typography variant="h3">
                        {t('profile.new-seller')}
                    </Typography>
                    <Paper
                        sx={{
                            width: '100%',
                            padding: '2rem',
                        }}>
                        <Typography variant="h4">
                            {t('artist.new-artist-page.details')}
                        </Typography>
                        <Stack
                            direction={{ xs: 'column', sm: 'row' }}
                            spacing={2}>
                            <Box
                                component="div"
                                display={'flex'}
                                flexDirection={'column'}
                                justifyContent={'center'}
                                alignItems={'center'}
                                sx={{
                                    paddingTop: { xs: '2rem', sm: 0 },
                                    paddingX: { xs: 0, sm: '1rem' },
                                }}>
                                <input
                                    accept="image/*"
                                    hidden
                                    type="file"
                                    id="profile-image"
                                    onChange={(e) => handleNewImage(e)}
                                    ref={inputImageRef}
                                />
                                <label htmlFor="profile-image">
                                    <IconButton
                                        color="primary"
                                        aria-label="upload picture"
                                        component="span">
                                        <Avatar
                                            src={profileImage}
                                            sx={{
                                                width: 128,
                                                height: 128,
                                            }}></Avatar>
                                    </IconButton>
                                </label>
                            </Box>
                            <Box component="div">
                                <TextField
                                    variant="standard"
                                    margin="normal"
                                    fullWidth
                                    error={showNameAlert}
                                    helperText={
                                        showNameAlert
                                            ? t('errors.profile.name')
                                            : ' '
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
                                        showEmailAlert
                                            ? t('errors.profile.email')
                                            : ' '
                                    }
                                    label={t('forms.email')}
                                    type="email"
                                    id="email"
                                    autoComplete="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
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
                            </Box>
                        </Stack>
                    </Paper>
                    <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        color="secondary"
                        style={{
                            width: '50%',
                            alignSelf: 'center',
                        }}>
                        {t('global.submit')}
                    </Button>
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

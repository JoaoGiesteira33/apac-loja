import {
    Box,
    Button,
    Paper,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const TODAY_MINUS_18_YEARS: Dayjs = dayjs().subtract(18, 'year');

export default function NewSeller() {
    const { t } = useTranslation();

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [birth_date, setBirthDate] = useState<Dayjs | null>(null);

    const [showNameAlert, setShowNameAlert] = useState(false);
    const [showEmailAlert, setShowEmailAlert] = useState(false);
    const [showOver18Alert, setShowOver18Alert] = useState(false);

    const checkEmail = (email: string) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    const disableAllAlerts = () => {
        setShowNameAlert(false);
        setShowEmailAlert(false);
        setShowOver18Alert(false);
    };

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
        //TODO: send data to backend
    };

    return (
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
                <Typography variant="h3">{t('profile.new-seller')}</Typography>
                <Paper
                    sx={{
                        width: '100%',
                        padding: '2rem',
                    }}>
                    <Typography variant="h4">
                        {t('artist.new-artist-page.details')}
                    </Typography>
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
                </Paper>
                <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    style={{
                        width: '50%',
                        backgroundColor: 'black',
                        color: 'white',
                        alignSelf: 'center',
                    }}>
                    {t('global.submit')}
                </Button>
            </Stack>
        </Box>
    );
}

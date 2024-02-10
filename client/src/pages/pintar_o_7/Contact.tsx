import { useState } from 'react';
import {
    Box,
    TextField,
    Button,
    Typography,
    Paper,
    CssBaseline,
    Alert,
    CircularProgress,
} from '@mui/material';
import { sendEmail } from '../../fetchers';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Contact = (props) => {
    const [t] = useTranslation();
    const [from, setFrom] = useState('');
    const [subject, setSubject] = useState('');
    const [text, setText] = useState('');
    const [showLoading, setShowLoading] = useState(false);

    const [showEmailAlert, setShowEmailAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [showSuceessAlert, setShowSuccessAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();
    const checkEmail = (email: string) => {
        // eslint-disable-next-line no-useless-escape
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    const handleContact = async (e) => {
        e.preventDefault();
        setShowEmailAlert(false);
        setShowErrorAlert(false);

        console.log('Login clicked');
        if (!checkEmail(from)) {
            setShowEmailAlert(true);
            return;
        }
        console.log('Email: ', from);
        console.log('Subject: ', subject);
        console.log('Text: ', text);

        const response = await sendEmail(from, subject, text);
        if (response.status === 401) {
            setShowErrorAlert(true);
        } else {
            setShowSuccessAlert(true);
            setFrom('');
            setSubject('');
            setText('');
            setShowLoading(false);
        }
    };

    return (
        <Box component="div" maxWidth="xs" style={{}}>
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
                }}>
                <Typography
                    component="h1"
                    variant="h5"
                    style={{ margin: '20px 0', color: 'black' }}>
                    {t('global.contact')}
                </Typography>
                <form onSubmit={handleContact} style={{ width: '100%' }}>
                    {showEmailAlert && (
                        <Alert
                            onClose={() => {
                                setShowEmailAlert(false);
                            }}
                            variant="filled"
                            severity="error">
                            {t('errors.login.email')}
                        </Alert>
                    )}
                    <TextField
                        variant="standard"
                        margin="normal"
                        required
                        fullWidth
                        id="from"
                        label={t('forms.email')}
                        name="from"
                        autoComplete="email"
                        autoFocus
                        value={from}
                        sx={{ borderWidth: 10 }}
                        onChange={(e) => setFrom(e.target.value)}
                    />
                    <TextField
                        variant="standard"
                        margin="normal"
                        required
                        fullWidth
                        name="subject"
                        label={t('forms.subject')}
                        type="text"
                        id="subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                    />

                    <TextField
                        variant="standard"
                        margin="normal"
                        required
                        fullWidth
                        name="text"
                        label={t('forms.message')}
                        type="text"
                        id="text"
                        multiline
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    {showErrorAlert && (
                        <Alert
                            onClose={() => {
                                setShowErrorAlert(false);
                            }}
                            variant="filled"
                            severity="error">
                            {t('errors.login.server-error')} {errorMessage}
                        </Alert>
                    )}
                    {showSuceessAlert && (
                        <Alert
                            onClose={() => {
                                setShowSuccessAlert(false);
                            }}
                            variant="filled"
                            severity="success">
                            {t('forms.messageSuccess')}
                        </Alert>
                    )}
                    <Box
                        component="div"
                        sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            onClick={() => setShowLoading(true)}
                            style={{
                                margin: '20px 0',
                                width: '50%',
                                backgroundColor: 'black',
                                color: 'white',
                                alignSelf: 'center',
                            }}>
                            {t('global.send')}
                            {showLoading && (
                                <CircularProgress sx={{ marginLeft: 3 }} />
                            )}
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Box>
    );
};

export default Contact;

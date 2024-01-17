import React, { useEffect, useState } from 'react';
import {
    Box,
    TextField,
    Button,
    Typography,
    Paper,
    CssBaseline,
    Alert,
} from '@mui/material';
import { loginUser, fetchUser } from '../fetchers';
import { Link, useNavigate } from 'react-router-dom';
import { useJwt, decodeToken } from 'react-jwt';
import { useTranslation } from 'react-i18next';

const Contact = (props) => {
    const [t] = useTranslation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [showEmailAlert, setShowEmailAlert] = useState(false);
    const [showPassAlert, setShowPassAlert] = useState(false);
    const [showCredAlert, setShowCredAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();
    const checkEmail = (email: string) => {
        // eslint-disable-next-line no-useless-escape
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setShowEmailAlert(false);
        setShowPassAlert(false);
        setShowCredAlert(false);
        setShowErrorAlert(false);

        console.log('Login clicked');
        if (!checkEmail(email)) {
            setShowEmailAlert(true);
            return;
        }
        if (password.length < 6) {
            setShowPassAlert(true);
            return;
        }
        console.log('Email: ', email);
        console.log('Password: ', password);
        const response = await loginUser(email, password);
        if (response.status === 401) {
            setShowCredAlert(true);
        } else {
            console.log('Susexo: ', response.token);
            const decodedToken = decodeToken(response.token);
            localStorage.setItem('token', response.token);

            try {
                const user = await fetchUser(
                    decodedToken._id,
                    decodedToken.level,
                    response.token
                );
                console.log('user: ', user);
                if (user !== undefined) {
                    console.log('User: ', user);
                    // TODO - store user in local storage
                    localStorage.setItem('user', JSON.stringify(user));
                    localStorage.setItem('loggedIn', 'ok');
                    props.setLoggedIn(true);
                    navigate('/gallery');
                } else {
                    setErrorMessage('#1');
                    setShowErrorAlert(true);
                    console.log('User não encontrado');
                }
            } catch (e) {
                setErrorMessage('#2');
                setShowErrorAlert(true);
                console.log('Erro ao buscar user: ', e);
            }
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
                <form onSubmit={handleLogin} style={{ width: '100%' }}>
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
                        id="email"
                        label={t('forms.email')}
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        sx={{ borderWidth: 10 }}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {showPassAlert && (
                        <Alert
                            onClose={() => {
                                setShowPassAlert(false);
                            }}
                            variant="filled"
                            severity="error">
                            {t('errors.login.password')}
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
                    {showCredAlert && (
                        <Alert
                            onClose={() => {
                                setShowCredAlert(false);
                            }}
                            variant="filled"
                            severity="error">
                            {t('errors.login.credentials')}
                        </Alert>
                    )}
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
                    <Box
                        component="div"
                        sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            style={{
                                margin: '20px 0',
                                width: '50%',
                                backgroundColor: 'black',
                                color: 'white',
                                alignSelf: 'center',
                            }}>
                            {t('global.enter')}
                        </Button>
                        <Typography
                            fontStyle="italic"
                            sx={{
                                textDecoration: 'underline',
                                color: 'black',
                            }}
                            display="inline">
                            <Link to={'/register'}>
                                {t('forms.no-account')}
                            </Link>
                        </Typography>
                    </Box>
                </form>
            </Paper>
        </Box>
    );
};

export default Contact;

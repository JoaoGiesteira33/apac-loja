import {
    Alert,
    Box,
    Button,
    CssBaseline,
    Paper,
    TextField,
    Typography,
} from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
//import { CurrentChatContext } from '../../contexts/chatContext';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../utils/firebase';

const Login = () => {
    const [t] = useTranslation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //const { setUsernameu, setSessionID, connect } = useContext(CurrentChatContext);

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

        if (!checkEmail(email)) {
            setShowEmailAlert(true);
            return;
        }
        if (password.length < 6) {
            setShowPassAlert(true);
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                navigate('/gallery');
            })
            .catch((error) => {
                if (
                    error.code === 'auth/user-not-found' ||
                    error.code === 'auth/wrong-password'
                ) {
                    setShowCredAlert(true);
                } else {
                    setErrorMessage(error.message);
                    setShowErrorAlert(true);
                }
            });
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
                    style={{ margin: '20px 0' }}>
                    {t('global.login')}
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
                            color="secondary"
                            size="large"
                            style={{
                                margin: '20px 0',
                                width: '50%',
                                alignSelf: 'center',
                            }}>
                            {t('global.enter')}
                        </Button>
                        <Typography
                            fontStyle="italic"
                            sx={{
                                textDecoration: 'underline',
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

export default Login;

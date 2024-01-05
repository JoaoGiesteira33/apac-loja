import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, CssBaseline, Alert } from '@mui/material';
import { loginUser, fetchUser } from '../../fetchers';
import { Link, useNavigate } from 'react-router-dom';
import { useJwt, decodeToken } from "react-jwt";


const Login = () => {
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
        console.log("Email: ", email);
        console.log("Password: ", password);
        const response = await loginUser(email, password);
        if (response.status === 401){
            setShowCredAlert(true);
        }
        else{
            console.log("Susexo: ", response.token);
            const decodedToken = decodeToken(response.token);
            localStorage.setItem('token', response.token);

            try{
              const user = await fetchUser(decodedToken._id, decodedToken.level, response.token);
              console.log("user: ", user);
              if (user !== undefined){
                console.log("User: ", user);
                // TODO - store user in local storage
                localStorage.setItem('user', JSON.stringify(user));
                navigate('/');
              }else{
                setErrorMessage("#1")
                setShowErrorAlert(true);
                console.log("User não encontrado");
              }
            }
            catch(e){
              setErrorMessage("#2")
              setShowErrorAlert(true);
              console.log("Erro ao buscar user: ", e);
            }
        }
    };

    return (
      <Box component="div" maxWidth="xs">
        <CssBaseline />
          <Paper
            style={{
              paddingLeft: '10%',
              paddingRight: '10%',
              paddingBottom: 10,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'left',
              background: 'white',
              color: 'black',
            }}

          >
            <Typography component="h1" variant="h5" style={{ margin: '20px 0', color: 'black' }}>
              Login
            </Typography>
            <form onSubmit={handleLogin} style={{ width: '100%' }}>
              {showEmailAlert && <Alert onClose={() => {setShowEmailAlert(false)}} variant="filled" severity="error">
                  Email Inválido!
              </Alert>}
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
                sx={{borderWidth: 10}}
                onChange={(e) => setEmail(e.target.value)}
              />
              {showPassAlert && <Alert onClose={() => {setShowPassAlert(false)}} variant="filled" severity="error">
                  Palavra-passe deve ter pelo menos 6 caracteres!
              </Alert>}
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
              {showCredAlert && <Alert onClose={() => {setShowCredAlert(false)}} variant="filled" severity="error">
                  Credenciais inválidas!
              </Alert>}
              {showErrorAlert && <Alert onClose={() => {setShowErrorAlert(false)}} variant="filled" severity="error">
                  Erro de Servidor, contacte o suporte! {errorMessage}
              </Alert>}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                style={{
                  margin: '20px 0',
                  backgroundColor: 'black',
                  color: 'white',
                }}
              >
                Entrar
              </Button>
                <Typography fontStyle="italic" sx={{textDecoration: 'underline'}} display="inline" style={{ margin: '20px 0', color: 'black' }}>
                    <Link to={'/register'}>Não tem conta? Registe-se!</Link>
                </Typography>
            </form>
            
            
          </Paper>
      </Box>
    );
};

export default Login;

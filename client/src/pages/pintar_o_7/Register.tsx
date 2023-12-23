import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, CssBaseline, Grid, Alert } from '@mui/material';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [showEmailAlert, setShowEmailAlert] = useState(false);
    const [showPassAlert, setShowPassAlert] = useState(false);

    const checkEmail = (email: string) => {
      // eslint-disable-next-line no-useless-escape
      const re = /\S+@\S+\.\S+/;
      return re.test(email);
    };

    const handleRegisto = (e) => {
        e.preventDefault();
        setShowEmailAlert(false);
        setShowPassAlert(false);
        console.log('Login clicked');
        if (!checkEmail(email)) {
            setShowEmailAlert(true);
            return;
        }
        if (password.length < 6) {
            setShowPassAlert(true);
            return;
        }
    };

    return (
      <Box component="div" maxWidth="xs">
        <CssBaseline />
          <Paper
            elevation={3}
            style={{
              paddingLeft: '10%',
              paddingRight: '10%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'left',
              background: 'white',
              color: 'black',
            }}

          >
            <Typography component="h1" variant="h5" style={{ margin: '20px 0', color: 'black' }}>
              Registar
            </Typography>
            <form onSubmit={handleRegisto} style={{ width: '100%' }}>
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
            </form>
          </Paper>
      </Box>
    );
};

export default Login;

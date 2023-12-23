import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, CssBaseline, Grid, Alert } from '@mui/material';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [name, setName] = useState('');
    const [birth_date, setBirthDate] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');

    const [showEmailAlert, setShowEmailAlert] = useState(false);
    const [showPassAlert, setShowPassAlert] = useState(false);
    const [showPass2Alert, setShowPass2Alert] = useState(false);
    const [showPhoneAlert, setShowPhoneAlert] = useState(false);
    const [showOver18Alert, setShowOver18Alert] = useState(false);

    const checkEmail = (email: string) => {
      // eslint-disable-next-line no-useless-escape
      const re = /\S+@\S+\.\S+/;
      return re.test(email);
    };

    const handleChangePassword = (pass: string) => {
        setPassword2(pass);
        if (pass !== password) {
            setShowPass2Alert(true);
        } else {
            setShowPass2Alert(false);
        }
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

    const disableAlerts = () => {
        setShowEmailAlert(false);
        setShowPassAlert(false);
        setShowPass2Alert(false);
        setShowPhoneAlert(false);
        setShowOver18Alert(false);
    }

    const handleRegisto = (e) => {
        e.preventDefault();
        disableAlerts();

        console.log('Register clicked');
        if (!checkEmail(email)) {
            setShowEmailAlert(true);
            return;
        }
        else if (password.length < 6) {
            setShowPassAlert(true);
            return;
        }
        else if (phone.length !== 9) {
            setShowPhoneAlert(true);
            return;
        }
        else if( checkOver18(birth_date) ) {
            setShowOver18Alert(true);
            return;
        }
        else {
            disableAlerts();
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
              
              {/* ----------- EMAIL ---------------- */}
              
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

              <TextField
                variant="standard"
                id="role"
                name="role"
                value={"client"}
                sx={{ display: 'none' }}
              />
  
                {/* ----------- PASSWORD ---------------- */}

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
                
                {/* ----------- PASSWORD2 ---------------- */}

              {showPass2Alert && <Alert variant="filled" severity="warning">
                  Palavras-passe não coincidem!
              </Alert>}
              <TextField
                variant="standard"
                margin="normal"
                required
                fullWidth
                name="password2"
                label="Palavra-passe"
                type="password"
                id="password2"
                autoComplete="current-password"
                value={password2}
                onChange={(e) => handleChangePassword(e.target.value)}
              />

               {/* ----------- NAME ---------------- */}
              <TextField
                variant="standard"
                margin="normal"
                required
                fullWidth
                name="client_fields.demographics.name"
                label="Primeiro e último nome"
                type="text"
                id="name"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              {/* ----------- DATE OF BIRTH ---------------- */}
              {showOver18Alert && <Alert onClose={() => {setShowOver18Alert(false)}} variant="filled" severity="error">
                  Deve ter mais de 18 anos!
              </Alert>}
              <TextField
                variant="standard"
                margin="normal"
                required
                fullWidth
                name="client_fields.demographics.birth_date"
                label="Data de Nascimento"
                type="date"
                id="birth_date"
                autoComplete="dateOfBirth"
                InputLabelProps={{
                  shrink: true,
                }}
                value={birth_date}
                onChange={(e) => setBirthDate(e.target.value)}

              />

              {/* ----------- ADDRESS ---------------- */}
              <TextField
                variant="standard"
                margin="normal"
                required
                fullWidth
                name="client_fields.demographics.address"
                label="Morada"
                type="text"
                id="address"
                autoComplete="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              {/* ----------- PHONE NUMBER ---------------- */}
              {showPhoneAlert && <Alert onClose={() => {setShowPhoneAlert(false)}} variant="filled" severity="error">
                  Número de telefone inválido! 
              </Alert>}
              <TextField
                variant="standard"
                margin="normal"
                fullWidth
                name="client_fields.demographics.phone"
                label="Número de Telefone"
                type="text"
                id="phone"
                autoComplete="phoneNumber"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />

              {/* ----------- SUBMIT ---------------- */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                style={{
                  margin: '20px 0',
                  backgroundColor: "black",
                  color: 'white',
                }}
      
              >
                Registar
              </Button>
              * Campos obrigatórios
            </form>
          </Paper>
      </Box>
    );
};

export default Register;

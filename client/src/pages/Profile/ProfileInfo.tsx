import { useState } from 'react';

import Box from '@mui/system/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';

import { Stack, Typography } from '@mui/material';

import CountrySelect from '../../components/pintar_o_7/CountrySelect';

export default function ProfileInfo() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [country, setCountry] = useState('');
    const [address, setAddress] = useState('');
    const [postlaCode, setPostalCode] = useState('');
    const [city, setCity] = useState('');

    return (
        <Box
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
                        required
                        fullWidth
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
                        required
                        fullWidth
                        label="Email"
                        type="email"
                        id="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                        spacing={{ xs: 1, sm: 2 }}>
                        <CountrySelect
                            selection={country}
                            setSelection={setCountry}
                            sx={{ marginTop: '1rem', flex: 1 }}
                        />
                        <TextField
                            variant="standard"
                            margin="normal"
                            label="City"
                            type="text"
                            id="city"
                            autoComplete="city"
                            value={city}
                            sx={{ maxWidth: { sx: '100%', sm: '40%' } }}
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </Stack>
                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={{ xs: 1, sm: 2 }}>
                        <TextField
                            variant="standard"
                            margin="normal"
                            label="Address"
                            type="text"
                            fullWidth
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
                            id="postalCode"
                            autoComplete="postalCode"
                            value={postlaCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                        />
                    </Stack>
                </Paper>
            </Stack>
        </Box>
    );
}

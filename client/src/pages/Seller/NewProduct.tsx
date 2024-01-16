import {
    Box,
    FormControl,
    Input,
    InputAdornment,
    InputLabel,
    Paper,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function NewProduct() {
    const { t } = useTranslation();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(9.99);

    return (
        <Box
            component="div"
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
                <Typography variant="h3">{t('artist.new-piece')}</Typography>
                <Paper
                    sx={{
                        width: '100%',
                        padding: '2rem',
                    }}>
                    <Typography variant="h4">
                        {t('artist.new-piece-page.paper-basic-info')}
                    </Typography>{' '}
                    <TextField
                        variant="standard"
                        margin="normal"
                        label={t('global.title')}
                        type="text"
                        fullWidth
                        error={false}
                        helperText={''}
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <TextField
                        variant="standard"
                        margin="normal"
                        label={t('global.description')}
                        type="text"
                        fullWidth
                        multiline
                        error={false}
                        helperText={''}
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <Stack>
                        <FormControl
                            sx={{ margin: '16px 8px 0px 0px' }}
                            fullWidth
                            variant="standard">
                            <InputLabel htmlFor="standard-adornment-amount">
                                {t('global.price')}
                            </InputLabel>
                            <Input
                                id="price"
                                endAdornment={
                                    <InputAdornment position="end">
                                        €
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                    </Stack>
                </Paper>
            </Stack>
        </Box>
    );
}

import {
    Autocomplete,
    Box,
    Chip,
    FormControl,
    Input,
    InputAdornment,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SelectTypes from '../../components/pintar_o_7/SelectType';

const availableTypes: string[] = [
    'Pintura',
    'Escultura',
    'Fotografia',
    'Desenho',
    'Colagens',
    'Impressões e Gravuras',
    'Arte Digital',
    'Instalação',
    'Desing',
    'Arte Têxtil',
];

export default function NewProduct() {
    const { t } = useTranslation();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(9.99);
    const [selectedTypes, setSelectedTypes] = useState<string>('');
    const [technique, setTechnique] = useState('');
    const [materials, setMaterials] = useState<string>('');
    const [width, setWidth] = useState<string>('');
    const [height, setHeight] = useState<string>('');
    const [depth, setDepth] = useState<string>('');
    const [measureUnit, setMeasureUnit] = useState<string>('');

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
                    </Typography>
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
                    <Stack
                        direction={{
                            xs: 'column',
                            sm: 'row',
                        }}
                        spacing={{ xs: 2, sm: 4 }}
                        sx={{ marginTop: '1rem' }}
                        alignItems={'center'}>
                        <FormControl fullWidth variant="standard">
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
                        <FormControl
                            variant="standard"
                            sx={{
                                m: 1,
                                minWidth: 120,
                                margin: '0',
                            }}
                            fullWidth>
                            <InputLabel id="select-type-label">
                                {t('global.type-of-piece')}
                            </InputLabel>
                            <Select
                                labelId="select-type-label"
                                id="demo-simple-select-standard"
                                value={selectedTypes}
                                onChange={(e) =>
                                    setSelectedTypes(e.target.value)
                                }
                                label={t('global.types')}>
                                {availableTypes.map((tp, index) => (
                                    <MenuItem key={index} value={tp}>
                                        {tp}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Stack>
                </Paper>
                <Paper
                    sx={{
                        width: '100%',
                        padding: '2rem',
                    }}>
                    <Typography variant="h4">
                        {t('artist.new-piece-page.paper-details')}
                    </Typography>
                    <TextField
                        variant="standard"
                        margin="normal"
                        label={t('product.technique')}
                        type="text"
                        fullWidth
                        error={false}
                        helperText={''}
                        id="technique"
                        value={technique}
                        onChange={(e) => setTechnique(e.target.value)}
                    />
                    <Autocomplete
                        multiple
                        id="materials"
                        options={[]}
                        freeSolo
                        renderTags={(value: readonly string[], getTagProps) =>
                            value.map((option: string, index: number) => (
                                <Chip
                                    variant="outlined"
                                    label={option}
                                    {...getTagProps({ index })}
                                />
                            ))
                        }
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="standard"
                                label={t('product.materials')}
                                placeholder={t('product.materials-placeholder')}
                            />
                        )}
                    />
                    <Stack
                        direction={'row'}
                        spacing={2}
                        sx={{ marginTop: '1rem' }}
                        alignItems={'center'}>
                        <TextField
                            variant="standard"
                            margin="normal"
                            label={t('product.width')}
                            type="text"
                            fullWidth
                            error={false}
                            helperText={''}
                            id="width"
                            value={width}
                            onChange={(e) => setWidth(e.target.value)}
                        />
                        <Typography alignSelf={'flex-end'}>X</Typography>
                        <TextField
                            variant="standard"
                            margin="normal"
                            label={t('product.height')}
                            type="text"
                            fullWidth
                            error={false}
                            helperText={''}
                            id="height"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                        />
                    </Stack>
                </Paper>
            </Stack>
        </Box>
    );
}

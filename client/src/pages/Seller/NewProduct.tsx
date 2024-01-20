import {
    Autocomplete,
    Box,
    Chip,
    FormControl,
    IconButton,
    ImageList,
    ImageListItem,
    Input,
    InputAdornment,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Stack,
    TextField,
    Tooltip,
    Typography,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

const availableTypes: string[] = [
    'Pintura',
    'Escultura',
    'Fotografia',
    'Desenho',
    'Colagens',
    'Impressões e Gravuras',
    'Arte Digital',
    'Instalação',
    'Design',
    'Arte Têxtil',
];

export default function NewProduct() {
    const { t } = useTranslation();
    const inputRef = useRef(null);

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
    const [show, setShow] = useState<boolean[]>([]);

    const [images, setImages] = useState<File[]>([]);
    const imageUrls = images.map((file) => URL.createObjectURL(file));

    function onImageChange(e: React.ChangeEvent<HTMLInputElement>) {
        const fileList = e.target.files;
        if (fileList) {
            const files = [...fileList, ...images];
            setImages(files);
            setShow(new Array(files.length).fill(false));
        }
    }

    const addNewImage = () => {
        inputRef.current.click();
    };

    const onMouseOver = (index: number) => {
        const newShow = [...show];
        newShow[index] = true;
        setShow(newShow);
    };
    const onMouseOut = (index: number) => {
        const newShow = [...show];
        newShow[index] = false;
        setShow(newShow);
    };

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
                <Paper
                    sx={{
                        width: '100%',
                        padding: '2rem',
                    }}>
                    <Typography variant="h4">
                        {t('artist.new-piece-page.paper-photos')}
                    </Typography>
                    <input
                        style={{ display: 'none' }}
                        ref={inputRef}
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={onImageChange}
                    />
                    <Grid container spacing={4}>
                        {imageUrls.map((url, index) => (
                            <Grid xs={6} sm={4} md={3} key={index}>
                                <Box
                                    onMouseOver={() => onMouseOver(index)}
                                    onMouseOut={() => onMouseOut(index)}
                                    component={'div'}
                                    position={'relative'}
                                    sx={{
                                        aspectRatio: '1/1',
                                        overflow: 'hidden',
                                    }}>
                                    <img
                                        className="w-full h-full object-cover"
                                        src={url}
                                        alt={''}
                                    />
                                    {show[index] && (
                                        <IconButton
                                            onClick={() => {
                                                const newImages = [...images];
                                                newImages.splice(index, 1);
                                                setImages(newImages);
                                            }}
                                            sx={{
                                                position: 'absolute',
                                                right: '1rem',
                                                top: '1rem',
                                            }}>
                                            <DeleteIcon />
                                        </IconButton>
                                    )}
                                </Box>
                            </Grid>
                        ))}
                        <Grid xs={6} sm={4} md={3}>
                            <Box
                                component={'div'}
                                display={'flex'}
                                alignItems={'center'}
                                justifyContent={'center'}
                                sx={{
                                    aspectRatio: '1/1',
                                }}>
                                <Tooltip
                                    title={t(
                                        'artist.new-piece-page.add-photos'
                                    )}>
                                    <IconButton onClick={addNewImage}>
                                        <AddIcon />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>
            </Stack>
        </Box>
    );
}

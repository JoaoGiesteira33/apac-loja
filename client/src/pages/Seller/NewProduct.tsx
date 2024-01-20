import {
    Autocomplete,
    Box,
    Button,
    Chip,
    FormControl,
    IconButton,
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
import { NumericFormat, NumericFormatProps } from 'react-number-format';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import React from 'react';

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

const measureUnits: string[] = ['cm', 'm', 'mm', 'in', 'ft'];

interface CustomProps {
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
}

const PriceInput = React.forwardRef<NumericFormatProps, CustomProps>(
    function NumericFormatCustom(props, ref) {
        const { onChange, ...other } = props;

        return (
            <NumericFormat
                {...other}
                getInputRef={ref}
                onValueChange={(values) => {
                    onChange({
                        target: {
                            name: props.name,
                            value: values.value,
                        },
                    });
                }}
                allowNegative={false}
                allowedDecimalSeparators={[',']}
                decimalScale={2}
                decimalSeparator=","
                fixedDecimalScale={true}
                thousandsGroupStyle="thousand"
                thousandSeparator="."
                valueIsNumericString
                suffix="€"
            />
        );
    }
);

const DimensionInput = React.forwardRef<NumericFormatProps, CustomProps>(
    function NumericFormatCustom(props, ref) {
        const { onChange, ...other } = props;

        return (
            <NumericFormat
                {...other}
                getInputRef={ref}
                onValueChange={(values) => {
                    onChange({
                        target: {
                            name: props.name,
                            value: values.value,
                        },
                    });
                }}
                allowNegative={false}
                allowedDecimalSeparators={[',']}
                decimalScale={2}
                decimalSeparator=","
                valueIsNumericString
            />
        );
    }
);

export default function NewProduct() {
    const { t } = useTranslation();
    const inputRef = useRef(null);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [selectedTypes, setSelectedTypes] = useState<string>('');
    const [technique, setTechnique] = useState('');
    const [materials, setMaterials] = useState<string>('');
    const [depth, setDepth] = useState<string>('');
    const [measureUnit, setMeasureUnit] = useState<string>('');
    const [show, setShow] = useState<boolean[]>([]);
    const [maskedValues, setMaskedValues] = React.useState({
        price: '',
        width: '',
        height: '',
    });

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
        console.log(maskedValues.price);
        const newShow = [...show];
        newShow[index] = true;
        setShow(newShow);
    };
    const onMouseOut = (index: number) => {
        const newShow = [...show];
        newShow[index] = false;
        setShow(newShow);
    };

    const handleMaskedValuesChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        console.log(event.target.name);
        console.log(event.target.value);
        setMaskedValues({
            ...maskedValues,
            [event.target.name]: event.target.value,
        });
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
                        <TextField
                            fullWidth
                            label={t('global.price')}
                            value={maskedValues.price}
                            onChange={handleMaskedValuesChange}
                            name="price"
                            id="formatted-price-input"
                            InputProps={{
                                inputComponent: PriceInput as any,
                            }}
                            variant="standard"
                        />
                        <FormControl
                            variant="standard"
                            sx={{
                                m: 1,
                                minWidth: 120,
                                margin: '0',
                            }}
                            fullWidth>
                            <InputLabel id="select-type-label">
                                {t('product.technique')}
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
                            fullWidth
                            label={t('product.width')}
                            value={maskedValues.width}
                            onChange={handleMaskedValuesChange}
                            name="width"
                            id="formatted-width-input"
                            InputProps={{
                                inputComponent: DimensionInput as any,
                            }}
                            variant="standard"
                        />
                        <Typography alignSelf={'flex-end'}>X</Typography>
                        <TextField
                            fullWidth
                            label={t('product.height')}
                            value={maskedValues.height}
                            onChange={handleMaskedValuesChange}
                            name="height"
                            id="formatted-height-input"
                            InputProps={{
                                inputComponent: DimensionInput as any,
                            }}
                            variant="standard"
                        />
                        <Typography alignSelf={'flex-end'}>X</Typography>
                        <FormControl
                            variant="standard"
                            sx={{
                                m: 1,
                                maxWidth: 100,
                                margin: '0',
                            }}
                            fullWidth>
                            <InputLabel id="select-type-label">
                                {t('product.measure')}
                            </InputLabel>
                            <Select
                                labelId="select-type-label"
                                id="demo-simple-select-standard"
                                value={measureUnit}
                                onChange={(e) => setMeasureUnit(e.target.value)}
                                label={t('product.measure')}>
                                {measureUnits.map((tp, index) => (
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
                    <Grid container marginTop={2} spacing={4}>
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
                                    <IconButton
                                        sx={{ border: 2 }}
                                        onClick={addNewImage}>
                                        <AddIcon />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>
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
                    {t('global.submit')}
                </Button>
            </Stack>
        </Box>
    );
}

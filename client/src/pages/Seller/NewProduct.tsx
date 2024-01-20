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
    useTheme,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { NumericFormat, NumericFormatProps } from 'react-number-format';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import React from 'react';
import { ProductType } from '../../types/product';
import { NestedPartial } from '../../types/nestedPartial';
import { addProduct } from '../../fetchers';
import { Result } from '../../types/result';

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
    const theme = useTheme();
    const inputRef = useRef(null);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [technique, setTechnique] = useState<string>('');
    const [materials, setMaterials] = useState<string[]>([]);
    const [materialsInput, setMaterialsInput] = useState<string>('');
    const [maskedValues, setMaskedValues] = React.useState({
        price: '',
        width: '',
        height: '',
        depth: '',
        weight: '',
    });

    const [images, setImages] = useState<File[]>([]);
    const imageUrls = images.map((file) => URL.createObjectURL(file));

    function onImageChange(e: React.ChangeEvent<HTMLInputElement>) {
        const fileList = e.target.files;
        if (fileList) {
            const files = [...fileList, ...images];
            setImages(files);
        }
    }

    const addNewImage = () => {
        inputRef.current.click();
    };

    const handleMaskedValuesChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setMaskedValues({
            ...maskedValues,
            [event.target.name]: event.target.value,
        });
    };

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMaterialsInput('');

        const product: NestedPartial<ProductType> = {
            title: title,
            description: description,
            price: parseFloat(maskedValues.price),
            product_type: 'piece',
            piece_info: {
                technique: technique,
                materials: materials,
                dimensions: {
                    width: parseFloat(maskedValues.width),
                    height: parseFloat(maskedValues.height),
                    depth: parseFloat(maskedValues.depth),
                    weight: parseFloat(maskedValues.weight),
                },
            },
        };

        const addProductResponse: Result<string, Error> = await addProduct(
            product
        );

        if (addProductResponse.isOk()) {
            console.log(addProductResponse.value);
        } else {
            console.log(addProductResponse.error);
        }
    };

    return (
        <Box
            component="form"
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                handleFormSubmit(e);
            }}
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
                                value={technique}
                                onChange={(e) => setTechnique(e.target.value)}
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
                        value={materials}
                        onChange={(
                            _: React.SyntheticEvent<Element, Event>,
                            newValue: string[] | null
                        ) => {
                            newValue != null
                                ? setMaterials(newValue)
                                : setMaterials([]);
                        }}
                        inputValue={materialsInput}
                        onInputChange={(_, newInputValue) => {
                            setMaterialsInput(newInputValue);
                        }}
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
                        sx={{ marginTop: '1rem', marginBottom: '1rem' }}
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
                        <TextField
                            fullWidth
                            label={t('product.depth')}
                            value={maskedValues.depth}
                            onChange={handleMaskedValuesChange}
                            name="depth"
                            id="formatted-depth-input"
                            InputProps={{
                                inputComponent: DimensionInput as any,
                            }}
                            variant="standard"
                        />
                    </Stack>
                    <TextField
                        fullWidth
                        label={t('product.weight')}
                        value={maskedValues.weight}
                        onChange={handleMaskedValuesChange}
                        name="weight"
                        id="formatted-weight-input"
                        InputProps={{
                            inputComponent: DimensionInput as any,
                        }}
                        variant="standard"
                    />
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
                                    component={'div'}
                                    position={'relative'}
                                    sx={{
                                        aspectRatio: '1/1',
                                        border: 2,
                                        borderColor: theme.palette.primary.dark,
                                    }}>
                                    <img
                                        className="w-full h-full object-cover"
                                        src={url}
                                        alt={''}
                                    />
                                    <IconButton
                                        size={'small'}
                                        onClick={() => {
                                            const newImages = [...images];
                                            newImages.splice(index, 1);
                                            setImages(newImages);
                                        }}
                                        sx={{
                                            position: 'absolute',
                                            right: 0,
                                            top: 0,
                                            transform: 'translate(50%, -50%)',
                                            border: 2,
                                            BorderColor:
                                                theme.palette.primary.dark,
                                            backgroundColor:
                                                theme.palette.primary.light,
                                            '&:hover': {
                                                backgroundColor:
                                                    theme.palette.primary.dark,
                                                opacity: 1,
                                            },
                                        }}>
                                        <CloseIcon />
                                    </IconButton>
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

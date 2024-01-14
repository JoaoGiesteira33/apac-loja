import React from 'react';

import { ProductType } from '../../types/product';

import {
    Avatar,
    Box,
    Button,
    ButtonGroup,
    IconButton,
    Paper,
    Skeleton,
    Stack,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import dayjs from 'dayjs';
import Clear from '@mui/icons-material/Clear';

export default function NewProductRequest() {
    const theme = useTheme();
    const isSm = useMediaQuery(theme.breakpoints.down('sm'));

    const [product, setProduct] = React.useState<ProductType>({
        _id: '123',
        title: 'O Sol',
        description:
            'Retrato do pintor. Mais texto do trexto yes sir. Descricao gigante para testar espaco e cenas do genero les go omg.',
        price: 33,
        author: 'Joao',
        product_type: 'Pintura',
        piece_info: {
            state: 'Pendente',
            material: 'Couro',
            year: 2023,
            technique: 'Oleo',
            dimensions: {
                height: 123,
                width: 123,
                depth: 123,
                measure: 'cm',
            },
        },
        photos: ['https://picsum.photos/1600/1200'],
        book_info: null,
    });
    const [artist, setArtist] = React.useState({
        photo: 'https://picsum.photos/200',
        name: 'Zeze da Broa',
    });
    const [publishedDate, setPublishedDate] = React.useState<Date>(new Date());
    const [state, setState] = React.useState('Pendente');

    return (
        <Paper className="w-full">
            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                className="h-full"
                maxHeight={{ xs: 'auto', sm: '200px' }}
                alignItems={'stretch'}>
                <Box component={'div'} sx={{ maxWidth: { sm: '30%' } }}>
                    {product ? (
                        <img
                            className="w-full h-full aspect-square object-cover"
                            src={product.photos[0]}></img>
                    ) : (
                        <Skeleton variant="rectangular">
                            <img className="object-cover"></img>
                        </Skeleton>
                    )}
                </Box>
                <Stack
                    flexGrow={1}
                    spacing={isSm ? 2 : 0}
                    padding={1}
                    justifyContent={'space-between'}>
                    <Stack
                        justifyContent={'space-between'}
                        direction={'row'}
                        alignItems={'flex-start'}
                        overflow={'hidden'}
                        spacing={1}>
                        <Box
                            component={'div'}
                            flexDirection={'column'}
                            className="flex justify-between">
                            <Typography variant="h5">
                                {product.title}
                            </Typography>
                            <Typography>{product.description}</Typography>
                        </Box>
                        <Typography>
                            {dayjs(publishedDate).format('DD/MM/YYYY')}
                        </Typography>
                    </Stack>
                    <Stack
                        justifyContent={'space-between'}
                        direction={'row'}
                        alignItems={'center'}
                        flexShrink={0}
                        spacing={1}>
                        <Stack
                            direction={'row'}
                            alignItems={'center'}
                            spacing={1}>
                            <Typography>{artist.name}</Typography>
                            <Avatar src={artist.photo} />
                        </Stack>
                        {isSm ? (
                            <ButtonGroup
                                orientation="horizontal"
                                variant="contained"
                                disableElevation
                                aria-label="horizontal contained button group">
                                <IconButton>
                                    <CheckIcon />
                                </IconButton>
                                <IconButton>
                                    <ClearIcon />
                                </IconButton>
                            </ButtonGroup>
                        ) : (
                            <ButtonGroup
                                orientation="horizontal"
                                variant="contained"
                                disableElevation
                                aria-label="horizontal contained button group">
                                <Button startIcon={<CheckIcon />}>
                                    Accept
                                </Button>
                                <Button startIcon={<ClearIcon />}>
                                    Reject
                                </Button>
                            </ButtonGroup>
                        )}
                    </Stack>
                </Stack>
            </Stack>
        </Paper>
    );
}

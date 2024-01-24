import { ProductType } from '../../types/product';
import { User } from '../../types/user';
import { Link } from 'react-router-dom';
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
import { checkLink, updateProduct } from '../../fetchers';
import { NestedPartial } from '../../types/nestedPartial';
import { Result } from '../../types/result';

export default function NewProductRequest(props: {
    product: ProductType;
    onChangeProductState: (id: string) => void;
}) {
    const theme = useTheme();
    const isSm = useMediaQuery(theme.breakpoints.down('sm'));

    const handleAccept = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (token == null) return;
        if (props.product._id == null) return;

        const product: NestedPartial<ProductType> = {
            piece_info: {
                state: 'available',
                ...props.product.piece_info,
            },
        };

        const updateProductRes: Result<object, Error> = await updateProduct(
            product,
            token,
            props.product._id
        );
        if (updateProductRes.isOk()) {
            props.onChangeProductState(props.product._id);
        }
    };

    const handleDecline = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (token == null) return;
        if (props.product._id == null) return;

        const product: NestedPartial<ProductType> = {
            piece_info: {
                state: 'rejected',
                ...props.product.piece_info,
            },
        };

        const updateProductRes: Result<object, Error> = await updateProduct(
            product,
            token,
            props.product._id
        );
        if (updateProductRes.isOk()) {
            props.onChangeProductState(props.product._id);
        }
    };

    return (
        <Paper className="w-full">
            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                className="h-full"
                maxHeight={{ xs: 'auto', sm: '200px' }}
                alignItems={'stretch'}>
                <Box component={'div'} sx={{ maxWidth: { sm: '30%' } }}>
                    {props.product ? (
                        <img
                            className="w-full h-full aspect-square object-cover"
                            src={checkLink(props.product.photos[0])}></img>
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
                            <Link
                                to={`/product/${props.product._id}`}
                                state={props.product}>
                                <Typography variant="h5">
                                    {props.product.title}
                                </Typography>
                            </Link>
                            <Typography>{props.product.description}</Typography>
                        </Box>
                        <Typography>
                            {dayjs(props.product.published_date).format(
                                'DD/MM/YYYY'
                            )}
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
                            <Typography>
                                {
                                    (props.product._seller as User)
                                        .seller_fields?.demographics.name
                                }
                            </Typography>
                            <Avatar
                                src={checkLink(
                                    (props.product._seller as User)
                                        .seller_fields?.profile_picture
                                )}
                                alt={
                                    (props.product._seller as User)
                                        .seller_fields?.demographics.name
                                }
                            />
                        </Stack>
                        {isSm ? (
                            <ButtonGroup
                                orientation="horizontal"
                                variant="contained"
                                color="secondary"
                                disableElevation
                                aria-label="horizontal contained button group">
                                <IconButton onClick={handleAccept}>
                                    <CheckIcon />
                                </IconButton>
                                <IconButton onClick={handleDecline}>
                                    <ClearIcon />
                                </IconButton>
                            </ButtonGroup>
                        ) : (
                            <ButtonGroup
                                orientation="horizontal"
                                variant="contained"
                                disableElevation
                                color="secondary"
                                aria-label="horizontal contained button group">
                                <Button
                                    onClick={handleAccept}
                                    startIcon={<CheckIcon />}>
                                    Accept
                                </Button>
                                <Button
                                    onClick={handleDecline}
                                    startIcon={<ClearIcon />}>
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

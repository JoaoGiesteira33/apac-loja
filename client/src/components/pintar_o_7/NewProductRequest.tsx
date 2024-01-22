import { ProductType } from '../../types/product';
import { User } from '../../types/user';

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
import { checkLink } from '../../fetchers';

export default function NewProductRequest(props: { product: ProductType }) {
    const theme = useTheme();
    const isSm = useMediaQuery(theme.breakpoints.down('sm'));

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
                            <Typography variant="h5">
                                {props.product.title}
                            </Typography>
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
                                src={
                                    checkLink((props.product._seller as User)
                                        .seller_fields?.profile_picture)
                                }
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
                                color="secondary"
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

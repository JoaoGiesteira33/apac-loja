import { ProductType } from '../../types/product';

import {
    Box,
    Paper,
    Skeleton,
    Stack,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import dayjs from 'dayjs';
import { checkLink } from '../../fetchers';

export default function ProductPaper(props: { product: ProductType }) {
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
                </Stack>
            </Stack>
        </Paper>
    );
}

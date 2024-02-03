import { NotificationType } from '../../types/notification';
import {
    Box,
    Paper,
    Stack,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

const NotificationPaper = (props: { notification: NotificationType }) => {
    const theme = useTheme();
    const isSm = useMediaQuery(theme.breakpoints.down('sm'));
    const navigate = useNavigate();

    // calculate difference in days
    const diffInDays: number = dayjs().diff(
        dayjs(props.notification.date),
        'day'
    );

    return (
        <span
            className="w-full cursor-pointer"
            onClick={() => {
                navigate(props.notification.link);
            }}>
            <Paper elevation={2} className="w-full">
                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    className="h-full"
                    maxHeight={{ xs: 'auto', sm: '200px' }}
                    alignItems={'stretch'}>
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
                                    {props.notification.title}
                                </Typography>
                                <Typography variant="body2">
                                    {props.notification.message}
                                </Typography>
                            </Box>
                            <Box
                                component={'div'}
                                flexDirection={'column'}
                                className="flex justify-between">
                                <Typography>
                                    {dayjs(props.notification.date).format(
                                        'DD/MM/YYYY'
                                    )}
                                </Typography>
                                <Typography variant="caption" color="grey">
                                    {diffInDays === 0
                                        ? 'Hoje'
                                        : diffInDays === 1
                                          ? 'Ontem'
                                          : diffInDays < 30
                                            ? `${diffInDays} days ago`
                                            : diffInDays < 365
                                              ? `${Math.floor(diffInDays / 30)} mêses atrás`
                                              : `${Math.floor(diffInDays / 365)} anos atrás`}
                                </Typography>
                            </Box>
                        </Stack>
                    </Stack>
                </Stack>
            </Paper>
        </span>
    );
};

export default NotificationPaper;

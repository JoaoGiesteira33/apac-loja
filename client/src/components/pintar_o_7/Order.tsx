import { Paper, Typography } from '@mui/material';

export default function Order(props: { order: any }) {
    return (
        <Paper
            sx={{
                width: '100%',
                padding: '2rem',
            }}>
            <Typography variant="h5">Encomenda nº{props.order.id}</Typography>
            <Typography variant="h6">({props.order.date})</Typography>
        </Paper>
    );
}

import React from 'react';
import { MuiTelInput } from 'mui-tel-input';
import { Box, Button, Typography } from '@mui/material';

const MBWayComponent = () => {
    const [valuePhone, setValuePhone] = React.useState('+351');
    const [pending, setPending] = React.useState(false);

    const handleChangePhone = (newValue: string) => {
        setValuePhone(newValue);
    };

    const handlePay = () => {
        // create order
        alert('MBWay payment');
        setPending(true);
    };

    return (
        <Box
            component="div"
            sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                marginTop: 2,
            }}>
            {pending && (
                <Typography
                    component="p"
                    variant="body2"
                    style={{ color: 'black' }}>
                    Tem 5 minutos para confirmar o pagamento na app MBWay.
                </Typography>
            )}
            {!pending && (
                <>
                    <Box component="div" sx={{ display: 'flex', gap: 1 }}>
                        <MuiTelInput
                            value={valuePhone}
                            onChange={handleChangePhone}
                            variant="standard"
                        />
                        <Button variant="outlined" onClick={handlePay}>
                            Pagar
                        </Button>
                    </Box>
                    <Typography
                        component="p"
                        variant="caption"
                        style={{ color: 'gray' }}>
                        *Maximum amount: 750€
                    </Typography>
                </>
            )}
        </Box>
    );
};

export default MBWayComponent;

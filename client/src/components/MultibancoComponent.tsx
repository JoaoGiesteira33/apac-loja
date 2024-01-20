import * as React from 'react';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { Button, Card, CardActions, CardContent, Checkbox, Divider, FormControl, FormLabel, Input, TextField, Typography } from '@mui/material';

const MultibancoComponent = () => {
    return (
        <div>
            <Card
                variant="elevation"
                sx={{
                    maxHeight: 'max-content',
                    maxWidth: '100%',
                    mx: 'auto',
                    // to make the demo resizable
                    overflow: 'auto',
                    resize: 'horizontal',
                }}>
                <Typography component='h3' variant='h5'>
                    <InfoOutlined />
                    Add new card
                </Typography>
                <Divider variant='middle' />
                <CardContent
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, minmax(80px, 1fr))',
                        gap: 1.5,
                    }}>
                    <FormControl sx={{ gridColumn: '1/-1' }}>
                        <FormLabel>Card number</FormLabel>
                        <TextField
                            placeholder='0000 0000 0000 0000' 
                            variant='standard' 
                            fullWidth 
                            type='number' 
                            id='card-number' 
                            autoComplete='cc-number'
                            inputProps={{
                                endAdornment: <CreditCardIcon />,
                            }}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Expiry date</FormLabel>
                        <Input />
                    </FormControl>
                    <FormControl>
                        <FormLabel>CVC/CVV</FormLabel>
                        <Input  />
                    </FormControl>
                    <FormControl sx={{ gridColumn: '1/-1' }}>
                        <FormLabel>Card holder name</FormLabel>
                        <Input placeholder="Enter cardholder's full name" />
                    </FormControl>
                    <Checkbox
                        placeholder="Save card"
                        sx={{ gridColumn: '1/-1', my: 1 }}
                    />
                    Save card
                    <CardActions sx={{ gridColumn: '1/-1' }}>
                        <Button variant="contained" color="primary">
                            Add card
                        </Button>
                    </CardActions>
                </CardContent>
            </Card>
        </div>
    );
};

export default MultibancoComponent;

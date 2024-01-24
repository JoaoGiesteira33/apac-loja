import {
    Alert,
    Box,
    Button,
    Divider,
    Paper,
    Tab,
    Tabs,
    TextField,
    Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MuiTelInput } from 'mui-tel-input';
import PayPalComponent from './PayPalComponent';
import MultibancoComponent from './MultibancoComponent';
import useCart from '../hooks/useCart';
import { User } from '../types/user';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}>
            {value === index && (
                <Box component="div" sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const CheckoutStep4 = () => {
    const { t } = useTranslation();
    const { cart } = useCart();
    const user = localStorage.getItem('user') as Object as User;

    const [value, setValue] = useState(0);
    const [phone, setPhone] = useState('');
    const [valuePhone, setValuePhone] = React.useState('+351');

    const handleChangePhone = (newValue: string) => {
        setValuePhone(newValue);
    };

    const [showPhoneAlert, setShowPhoneAlert] = useState(false);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    return (
        <Box
            component="div"
            style={{
                paddingBottom: 10,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'white',
                color: 'black',
            }}>
            <Paper elevation={0}>
                <Typography
                    component="h1"
                    variant="h5"
                    style={{ margin: '20px 0', color: 'black' }}>
                    {t('checkout.payment.title')}
                </Typography>
                <Box component="div" sx={{ width: '100%' }}>
                    <PayPalComponent cart={cart} user={user}/>
                    
                    <Divider sx={{ margin: '20px 0' }} />

                    EuPago MBWay button

                    <Divider sx={{ margin: '20px 0' }} />

                    EuPago CreditCard button
                </Box>
            </Paper>
        </Box>
    );
};

export default CheckoutStep4;

/* 
<Box component="div">
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            aria-label="basic tabs example">
                            <Tab
                                label={t('checkout.payment.paypal')}
                                {...a11yProps(0)}
                            />
                            <Tab
                                label={t('checkout.payment.mbway')}
                                {...a11yProps(1)}
                            />
                            <Tab
                                label={t('checkout.payment.multibanco')}
                                {...a11yProps(2)}
                            />
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={value} index={0}>
                        <PayPalComponent />
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        <Box
                            component="div"
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1rem',
                            }}>
                            <MuiTelInput
                                value={valuePhone}
                                onChange={handleChangePhone}
                                variant="standard"
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{ marginX: '15%' }}>
                                {t('checkout.payment.pay')}
                            </Button>
                        </Box> 
                        EuPago MBWay button
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={2}>
                        <MultibancoComponent /> 
                        EuPago CreditCard button
                    </CustomTabPanel>
*/

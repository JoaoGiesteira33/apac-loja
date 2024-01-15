import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import Button from '@mui/material/Button';
import { useState } from 'react';
import {
    StepLabel,
} from '@mui/material';
import CheckoutStep1 from '../components/CheckoutStep1';
import CheckoutStep2 from '../components/CheckoutStep2';
import { CheckoutStep3 } from '../components/CheckoutStep3';
import CheckoutStep4 from '../components/CheckoutStep4';


const Checkout = () => {

    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        if (activeStep < 3) setActiveStep((cur) => cur + 1);
    };
    const handlePrev = () => {
        if (activeStep > 0) setActiveStep((cur) => cur - 1);
    };


    return (
        <Box
            component="div"
            sx={{
                width: '100%',
                paddingY: '2rem',
                paddingX: {
                    xs: '2rem',
                    sm: '4rem',
                    md: '6rem',
                    lg: '20%',
                },
            }}>
            <Stepper activeStep={activeStep} alternativeLabel>
                <Step key={0}>
                    <StepLabel>Faturação</StepLabel>
                    {/* <StepContent>content</StepContent> */}
                </Step>
                <Step key={1}>
                    <StepLabel>Entregra</StepLabel>
                </Step>
                <Step key={2}>
                    <StepLabel>Resumo</StepLabel>
                </Step>
                <Step key={3}>
                    <StepLabel>Pagamento</StepLabel>
                </Step>
            </Stepper>

            <Box component="div">

                {/* Steps content */}
                {activeStep === 0 && <CheckoutStep1 />}
                {activeStep === 1 && <CheckoutStep2 />}
                {activeStep === 2 && <CheckoutStep3 />}
                {activeStep === 3 && < CheckoutStep4 />}

                {/* Next and Prev buttons */}
                <Box
                    component="div"
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        paddingTop: 2,
                    }}>
                    <Button
                        variant="outlined"
                        disabled={activeStep === 0}
                        onClick={handlePrev}
                        sx={{ mr: 1 }}>
                        Anterior
                    </Button>
                    <Box component="div" style={{ flex: '1 1 auto' }} />
                    <Button
                        onClick={handleNext}
                        variant="contained"
                        sx={{ mr: 1 }}
                        disabled={activeStep === 3}>
                        Próximo
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default Checkout;

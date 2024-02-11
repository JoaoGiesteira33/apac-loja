import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import Button from '@mui/material/Button';
import { useRef, useState } from 'react';
import { StepLabel } from '@mui/material';
import CheckoutStep2 from '../../components/CheckoutShippingAddressStep';
import { CheckoutStep3 } from '../../components/CheckoutReviewStep';
import CheckoutStep4 from '../../components/CheckoutPaymentStep';
import { useTranslation } from 'react-i18next';

const Checkout = () => {
    const { t } = useTranslation();

    const [activeStep, setActiveStep] = useState(0);
    const [validateStep, setValidateStep] = useState(false);

    //const myForm = useRef(null)

    const handleNext = () => {
        // TODO step validation
        //if (!myForm.current.reportValidity()) return;

        if (activeStep < 2) {
            setActiveStep((cur) => cur + 1);
        }
    };
    const handlePrev = () => {
        if (activeStep > 0) setActiveStep((cur) => cur - 1);
    };

    return (
        <Box
            component="div"
            sx={{
                display: 'block',
                width: '100%',
                overflow: 'hidden',
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
                    <StepLabel>{t('checkout.stepper.shipping')}</StepLabel>
                </Step>
                <Step key={1}>
                    <StepLabel>{t('checkout.stepper.review')}</StepLabel>
                </Step>
                <Step key={2}>
                    <StepLabel>{t('checkout.stepper.payment')}</StepLabel>
                </Step>
            </Stepper>

            <Box component="div">
                {/* Steps content */}

                {activeStep === 0 && (
                    <CheckoutStep2
                        validate={validateStep}
                        setValidFunc={setValidateStep}
                    />
                )}
                {activeStep === 1 && <CheckoutStep3 />}
                {activeStep === 2 && <CheckoutStep4 />}

                {/* Next and Prev buttons */}
                <Box
                    component="div"
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        paddingTop: 2,
                        paddingLeft: '15%',
                        paddingRight: '15%',
                    }}>
                    <Button
                        variant="outlined"
                        disabled={activeStep === 0}
                        onClick={handlePrev}
                        sx={{ mr: 1 }}>
                        {t('checkout.stepper.prev-button')}
                    </Button>
                    <Box component="div" style={{ flex: '1 1 auto' }} />
                    <Button
                        onClick={handleNext}
                        variant="contained"
                        sx={{ mr: 1 }}
                        disabled={activeStep === 2}>
                        {t('checkout.stepper.next-button')}
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default Checkout;

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import Button from '@mui/material/Button';
import { useState } from 'react';
import {
<<<<<<< HEAD
    Stepper,
    Step,
    Button,
    Typography,
    Card,
    CardHeader,
    CardBody,
    Tabs,
    TabsHeader,
    Tab,
    TabsBody,
    TabPanel,
    Select,
    Option,
    Input,
} from '@material-tailwind/react';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';
import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import { useCountries } from 'use-react-countries';
import LockIcon from '@mui/icons-material/Lock';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { createOrder, onApprove } from '../fetchers';
=======
    StepLabel,
} from '@mui/material';
import CheckoutStep1 from '../components/CheckoutStep1';
import CheckoutStep2 from '../components/CheckoutStep2';
import { CheckoutStep3 } from '../components/CheckoutStep3';
import CheckoutStep4 from '../components/CheckoutStep4';
>>>>>>> 974bda8c65b000ad65b00e65ccf7614b8720b7d3


const Checkout = () => {

    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        if (activeStep < 3) setActiveStep((cur) => cur + 1);
    };
    const handlePrev = () => {
        if (activeStep > 0) setActiveStep((cur) => cur - 1);
    };

<<<<<<< HEAD
    // content of the User Information step
    const informationStep = (
        <div className="container relative -bottom-[+4.5rem]">
            <Card className="w-full">
                <CardHeader
                    color="gray"
                    floated={false}
                    shadow={false}
                    className="m-0 grid place-items-center px-4 py-8 text-center">
                    <Typography variant="h4" className="font-poppins">
                        Informações de Utilizador
                    </Typography>
                </CardHeader>
                <CardBody>contet</CardBody>
            </Card>
        </div>
    );

    // content of the Shipping step
    const shippingStep = (
        <div className="container relative -bottom-[+4.5rem]">
            <Card className="w-full">
                <CardHeader
                    color="gray"
                    floated={false}
                    shadow={false}
                    className="m-0 grid place-items-center px-4 py-8 text-center">
                    <Typography variant="h4" className="font-poppins">
                        Endereço de entrega
                    </Typography>
                </CardHeader>
                <CardBody>contet</CardBody>
            </Card>

            <Card className="w-full">
                <CardHeader
                    color="gray"
                    floated={false}
                    shadow={false}
                    className="m-0 grid place-items-center px-4 py-8 text-center">
                    <Typography variant="h4" className="font-poppins">
                        Metodo de entrega
                    </Typography>
                </CardHeader>
                <CardBody>contet</CardBody>
            </Card>
        </div>
    );

    // content of the Payment step
    const paymentStep = (
        <div className="container relative -bottom-[+4.5rem]">
            <Card className="w-full">
                <CardHeader
                    color="gray"
                    floated={false}
                    shadow={false}
                    className="m-0 grid place-items-center px-4 py-8 text-center">
                    <Typography variant="h4" className="font-poppins">
                        Metodo de pagamento
                    </Typography>
                    <div className="mb-4 h-20 p-6 text-white">
                        {type === 'card' ? (
                            <CreditCardRoundedIcon
                                fontSize="large"
                                className="h-16 w-16 text-white"
                            />
                        ) : (
                            <img
                                alt="paypal "
                                className="w-14 "
                                src="https://docs.material-tailwind.com/icons/paypall.png"
                            />
                        )}
                    </div>
                </CardHeader>
                <CardBody>
                    <Tabs value={type} className="overflow-visible">
                        <TabsHeader className="relative z-0 ">
                            <Tab value="card" onClick={() => setType('card')}>
                                Pay with Card
                            </Tab>
                            <Tab
                                value="paypal"
                                onClick={() => setType('paypal')}>
                                Pay with PayPal
                            </Tab>
                        </TabsHeader>
                        <TabsBody
                            className="!overflow-x-hidden !overflow-y-visible"
                            animate={{
                                initial: {
                                    x: type === 'card' ? 400 : -400,
                                },
                                mount: {
                                    x: 0,
                                },
                                unmount: {
                                    x: type === 'card' ? 400 : -400,
                                },
                            }}>
                            <TabPanel value="card" className="p-0">
                                <form className="mt-12 flex flex-col gap-4">
                                    <div>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="mb-2 font-medium">
                                            Your Email
                                        </Typography>
                                        <Input
                                            crossOrigin={'anonymous'}
                                            type="email"
                                            placeholder="name@mail.com"
                                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                            labelProps={{
                                                className:
                                                    'before:content-none after:content-none',
                                            }}
                                        />
                                    </div>

                                    <div className="my-3">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="mb-2 font-medium ">
                                            Card Details
                                        </Typography>

                                        <Input
                                            crossOrigin={'anonymous'}
                                            maxLength={19}
                                            value={formatCardNumber(cardNumber)}
                                            onChange={(event) =>
                                                setCardNumber(
                                                    event.target.value
                                                )
                                            }
                                            icon={
                                                <CreditCardRoundedIcon className="absolute left-0 h-4 w-4 text-blue-gray-300" />
                                            }
                                            placeholder="0000 0000 0000 0000"
                                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                            labelProps={{
                                                className:
                                                    'before:content-none after:content-none',
                                            }}
                                        />
                                        <div className="my-4 flex items-center gap-4">
                                            <div>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="mb-2 font-medium">
                                                    Expires
                                                </Typography>
                                                <Input
                                                    crossOrigin={'anonymous'}
                                                    maxLength={5}
                                                    value={formatExpires(
                                                        cardExpires
                                                    )}
                                                    onChange={(event) =>
                                                        setCardExpires(
                                                            event.target.value
                                                        )
                                                    }
                                                    containerProps={{
                                                        className:
                                                            'min-w-[72px]',
                                                    }}
                                                    placeholder="00/00"
                                                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                                    labelProps={{
                                                        className:
                                                            'before:content-none after:content-none',
                                                    }}
                                                />
                                            </div>
                                            <div>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="mb-2 font-medium">
                                                    CVC
                                                </Typography>
                                                <Input
                                                    crossOrigin={'anonymous'}
                                                    maxLength={4}
                                                    containerProps={{
                                                        className:
                                                            'min-w-[72px]',
                                                    }}
                                                    placeholder="000"
                                                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                                    labelProps={{
                                                        className:
                                                            'before:content-none after:content-none',
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="mb-2 font-medium">
                                            Holder Name
                                        </Typography>
                                        <Input
                                            crossOrigin={'anonymous'}
                                            placeholder="name@mail.com"
                                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                            labelProps={{
                                                className:
                                                    'before:content-none after:content-none',
                                            }}
                                        />
                                    </div>
                                    <Button size="lg">Pay Now</Button>
                                    <Typography
                                        variant="small"
                                        color="gray"
                                        className="mt-2 flex items-center justify-center gap-2 font-medium opacity-60">
                                        <LockIcon className="-mt-0.5 h-4 w-4" />{' '}
                                        Payments are secure and encrypted
                                    </Typography>
                                </form>
                            </TabPanel>
                            <TabPanel value="paypal" className="p-0">
                                <form className="mt-12 flex flex-col gap-4">
                                    <div>
                                        <Typography
                                            variant="paragraph"
                                            color="blue-gray"
                                            className="mb-4 font-medium">
                                            Personal Details
                                        </Typography>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="mb-2 font-medium">
                                            Your Email
                                        </Typography>
                                        <Input
                                            crossOrigin={'anonymous'}
                                            type="email"
                                            placeholder="name@mail.com"
                                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                            labelProps={{
                                                className:
                                                    'before:content-none after:content-none',
                                            }}
                                        />
                                    </div>

                                    <div className="my-6">
                                        <Typography
                                            variant="paragraph"
                                            color="blue-gray"
                                            className="mb-4 font-medium">
                                            Billing Address
                                        </Typography>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="mb-2 font-medium">
                                            Country
                                        </Typography>
                                        <Select
                                            placeholder="USA"
                                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                            labelProps={{
                                                className:
                                                    'before:content-none after:content-none',
                                            }}
                                            menuProps={{ className: 'h-48' }}>
                                            {countries.map(
                                                ({ name, flags }: any) => (
                                                    <Option
                                                        key={name}
                                                        value={name}>
                                                        <div className="flex items-center gap-x-2">
                                                            <img
                                                                src={flags.svg}
                                                                alt={name}
                                                                className="h-4 w-4 rounded-full object-cover"
                                                            />
                                                            {name}
                                                        </div>
                                                    </Option>
                                                )
                                            )}
                                        </Select>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="mt-4 -mb-2 font-medium">
                                            Postal Code
                                        </Typography>
                                        <Input
                                            crossOrigin={'anonymous'}
                                            placeholder="0000"
                                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                            labelProps={{
                                                className:
                                                    'before:content-none after:content-none',
                                            }}
                                            containerProps={{
                                                className: 'mt-4',
                                            }}
                                        />
                                    </div>
                                    <PayPalButtons
                                        style={{ layout: 'horizontal' }}
                                        createOrder={createOrder}
                                        onApprove={onApprove}
                                    />
                                    <Button size="lg">pay with paypal</Button>
                                    <Typography
                                        variant="small"
                                        color="gray"
                                        className="flex items-center justify-center gap-2 font-medium opacity-60">
                                        <LockIcon className="-mt-0.5 h-4 w-4" />{' '}
                                        Payments are secure and encrypted
                                    </Typography>
                                </form>
                            </TabPanel>
                        </TabsBody>
                    </Tabs>
                </CardBody>
            </Card>
        </div>
    );

    // content of the Review order step
    const reviewStep = (
        <div className="container relative -bottom-[+4.5rem]">
            <Card className="w-full">
                <CardHeader
                    color="gray"
                    floated={false}
                    shadow={false}
                    className="m-0 grid place-items-center px-4 py-8 text-center">
                    <Typography variant="h4" className="font-poppins">
                        Confirmar encomenda
                    </Typography>
                </CardHeader>
                <CardBody>contet</CardBody>
            </Card>
        </div>
    );
=======
>>>>>>> 974bda8c65b000ad65b00e65ccf7614b8720b7d3

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

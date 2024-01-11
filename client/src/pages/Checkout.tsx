import React from 'react';
import {
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

function formatCardNumber(value: string) {
    const val = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = val.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
        parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
        return parts.join(' ');
    } else {
        return value;
    }
}

function formatExpires(value: string) {
    return value
        .replace(/[^0-9]/g, '')
        .replace(/^([2-9])$/g, '0$1')
        .replace(/^(1{1})([3-9]{1})$/g, '0$1/$2')
        .replace(/^0{1,}/g, '0')
        .replace(/^([0-1]{1}[0-9]{1})([0-9]{1,2}).*/g, '$1/$2');
}

const Checkout = () => {
    const [activeStep, setActiveStep] = React.useState(0);
    const [isLastStep, setIsLastStep] = React.useState(false);
    const [isFirstStep, setIsFirstStep] = React.useState(false);

    // Payment
    const { countries } = useCountries();
    const [type, setType] = React.useState('card');
    const [cardNumber, setCardNumber] = React.useState('');
    const [cardExpires, setCardExpires] = React.useState('');

    const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
    const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

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

    return (
        <div className="w-full px-16 py-4">
            <Stepper
                activeStep={activeStep}
                isLastStep={(value) => setIsLastStep(value)}
                isFirstStep={(value) => setIsFirstStep(value)}>
                <Step>
                    <PermIdentityIcon className="h-5 w-5" />
                    <div className="absolute -bottom-[2.5rem] w-max text-center">
                        <Typography
                            variant="h6"
                            color={activeStep === 0 ? 'blue-gray' : 'gray'}
                            className="font-poppins">
                            Information
                        </Typography>
                    </div>
                </Step>
                <Step>
                    <LocalShippingOutlinedIcon className="h-5 w-5" />
                    <div className="absolute -bottom-[2.5rem] w-max text-center">
                        <Typography
                            variant="h6"
                            color={activeStep === 1 ? 'blue-gray' : 'gray'}
                            className="font-poppins">
                            Shipping
                        </Typography>
                    </div>
                </Step>
                <Step>
                    <PaymentOutlinedIcon className="h-5 w-5" />
                    <div className="absolute -bottom-[2.5rem] w-max text-center">
                        <Typography
                            variant="h6"
                            color={activeStep === 2 ? 'blue-gray' : 'gray'}
                            className="font-poppins">
                            Payment
                        </Typography>
                    </div>
                </Step>
                <Step>
                    <ThumbUpAltOutlinedIcon className="h-5 w-5" />
                    <div className="absolute -bottom-[2.5rem] w-max text-center">
                        <Typography
                            variant="h6"
                            color={activeStep === 3 ? 'blue-gray' : 'gray'}
                            className="font-poppins">
                            Review
                        </Typography>
                    </div>
                </Step>
            </Stepper>

            {/* Steps content */}
            {activeStep === 0 && informationStep}
            {activeStep === 1 && shippingStep}
            {activeStep === 2 && paymentStep}
            {activeStep === 3 && reviewStep}

            {/* Next and Prev buttons */}

            <div className="mt-32 flex justify-between">
                <Button onClick={handlePrev} disabled={isFirstStep}>
                    Prev
                </Button>
                <Button onClick={handleNext} disabled={isLastStep}>
                    Next
                </Button>
            </div>
        </div>
    );
};

export default Checkout;

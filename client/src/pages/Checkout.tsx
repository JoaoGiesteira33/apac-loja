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
    Checkbox,
} from '@material-tailwind/react';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';
import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import LockIcon from '@mui/icons-material/Lock';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import { useCountries } from 'use-react-countries';
import useCart from '../hooks/useCart';

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
    const { subTotalPrice, cart } = useCart();

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
                        Dados de faturação
                    </Typography>
                </CardHeader>
                <CardBody className="p-8 flex flex-col gap-4">
                    <div>
                        <Typography
                            variant="h6"
                            color="black"
                            className="font-poppins">
                            Nome
                        </Typography>
                        <Input
                            crossOrigin={'anonymous'}
                            variant="outlined"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className:
                                    'before:content-none after:content-none',
                            }}
                        />
                    </div>
                    <div>
                        <Typography
                            variant="h6"
                            color="black"
                            className="font-poppins">
                            Nº de contribuinte
                        </Typography>
                        <Input
                            crossOrigin={'anonymous'}
                            variant="outlined"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className:
                                    'before:content-none after:content-none',
                            }}
                        />
                    </div>
                    <div>
                        <Typography
                            variant="h6"
                            color="black"
                            className="font-poppins">
                            Telefone
                        </Typography>
                        <Input
                            crossOrigin={'anonymous'}
                            variant="outlined"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className:
                                    'before:content-none after:content-none',
                            }}
                        />
                        <Typography
                            variant="small"
                            color="gray"
                            className="font-poppins">
                            Pode ser usado para auxiliar a entrega
                        </Typography>
                    </div>
                    <div>
                        <Typography
                            variant="h6"
                            color="black"
                            className="font-poppins">
                            Morada
                        </Typography>
                        <Input
                            crossOrigin={'anonymous'}
                            variant="outlined"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className:
                                    'before:content-none after:content-none',
                            }}
                        />
                    </div>
                    <div>
                        <Typography
                            variant="h6"
                            color="black"
                            className="font-poppins">
                            Código postal
                        </Typography>
                        <Input
                            crossOrigin={'anonymous'}
                            variant="outlined"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className:
                                    'before:content-none after:content-none',
                            }}
                        />
                    </div>
                    <div>
                        <Typography
                            variant="h6"
                            color="black"
                            className="font-poppins">
                            Cidade
                        </Typography>
                        <Input
                            crossOrigin={'anonymous'}
                            variant="outlined"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className:
                                    'before:content-none after:content-none',
                            }}
                        />
                    </div>
                </CardBody>
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
                        Dados de entrega
                    </Typography>
                </CardHeader>
                <CardBody className="p-8 flex flex-col gap-4">
                    <div>
                        <Typography
                            variant="h6"
                            color="black"
                            className="font-poppins">
                            País/Região
                        </Typography>
                        <Select
                            placeholder="PT"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className:
                                    'before:content-none after:content-none',
                            }}
                            menuProps={{ className: 'h-48' }}>
                            {countries.map(({ name, flags }: any) => (
                                <Option key={name} value={name}>
                                    <div className="flex items-center gap-x-2">
                                        <img
                                            src={flags.svg}
                                            alt={name}
                                            className="h-4 w-4 rounded-full object-cover"
                                        />
                                        {name}
                                    </div>
                                </Option>
                            ))}
                        </Select>
                    </div>
                    <div>
                        <Typography
                            variant="h6"
                            color="black"
                            className="font-poppins">
                            Morada
                        </Typography>
                        <Input
                            crossOrigin={'anonymous'}
                            variant="outlined"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className:
                                    'before:content-none after:content-none',
                            }}
                        />
                        <Input
                            crossOrigin={'anonymous'}
                            variant="outlined"
                            placeholder="Apartamento, bloco, lote, prédio, andar, etc."
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className:
                                    'before:content-none after:content-none',
                            }}
                        />
                    </div>
                    <div>
                        <Typography
                            variant="h6"
                            color="black"
                            className="font-poppins">
                            Localidade
                        </Typography>
                        <Input
                            crossOrigin={'anonymous'}
                            variant="outlined"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className:
                                    'before:content-none after:content-none',
                            }}
                        />
                    </div>
                    <div>
                        <Typography
                            variant="h6"
                            color="black"
                            className="font-poppins">
                            Cidade
                        </Typography>
                        <Input
                            crossOrigin={'anonymous'}
                            variant="outlined"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className:
                                    'before:content-none after:content-none',
                            }}
                        />
                    </div>
                    <div>
                        <Typography
                            variant="h6"
                            color="black"
                            className="font-poppins">
                            Código postal
                        </Typography>
                        <Input
                            crossOrigin={'anonymous'}
                            variant="outlined"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className:
                                    'before:content-none after:content-none',
                            }}
                        />
                    </div>
                    <div>
                        <Typography
                            variant="h6"
                            color="black"
                            className="font-poppins">
                            Selecione o método de entrega:
                        </Typography>
                        <Select>
                            <Option>Standard - 5€</Option>
                            <Option>Expresso - 10€</Option>
                            <Option>
                                Depende da localização do utilizador
                            </Option>
                        </Select>
                        <Typography
                            variant="small"
                            color="gray"
                            className="font-poppins">
                            <InfoRoundedIcon className="h-4 w-4" /> Todas as
                            obras são transportadas com seguro de envio.
                        </Typography>
                    </div>
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
                <CardBody className="p-8 flex flex-col gap-8">
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between">
                            <Typography
                                variant="h6"
                                color="black"
                                className="font-poppins">
                                Item
                            </Typography>
                            <Typography
                                variant="h6"
                                color="black"
                                className="font-poppins">
                                Valor
                            </Typography>
                        </div>
                        <hr />
                        {cart.map((item) => (
                            <div className="flex justify-between">
                                <Typography
                                    variant="paragraph"
                                    color="black"
                                    className="font-poppins">
                                    {item.title}
                                </Typography>
                                <Typography
                                    variant="small"
                                    color="black"
                                    className="font-poppins">
                                    {new Intl.NumberFormat('pt-PT', {
                                        style: 'currency',
                                        currency: 'EUR',
                                    }).format(item.price)}
                                </Typography>
                            </div>
                        ))}
                        <hr />
                        <div className="flex justify-between">
                            <Typography
                                variant="h6"
                                color="black"
                                className="font-poppins">
                                Subtotal
                            </Typography>
                            <Typography
                                variant="h6"
                                color="black"
                                className="font-poppins">
                                {subTotalPrice}
                            </Typography>
                        </div>
                        <hr />
                        <div className="flex justify-between">
                            <Typography
                                variant="h6"
                                color="black"
                                className="font-poppins">
                                Envio
                            </Typography>
                            <Typography
                                variant="h6"
                                color="black"
                                className="font-poppins">
                                {new Intl.NumberFormat('pt-PT', {
                                    style: 'currency',
                                    currency: 'EUR',
                                }).format(5)}
                            </Typography>
                        </div>
                        <hr />
                        <div className="flex justify-between">
                            <Typography
                                variant="h6"
                                color="black"
                                className="font-poppins">
                                Cupão
                            </Typography>
                            <Typography
                                variant="h6"
                                color="black"
                                className="font-poppins">
                                {new Intl.NumberFormat('pt-PT', {
                                    style: 'currency',
                                    currency: 'EUR',
                                }).format(-50)}
                            </Typography>
                        </div>
                        <hr />
                    </div>
                    <div className="flex justify-between">
                        <Typography
                            variant="h5"
                            color="black"
                            className="font-poppins">
                            Total
                        </Typography>
                        <Typography
                            variant="h6"
                            color="black"
                            className="font-poppins">
                            {new Intl.NumberFormat('pt-PT', {
                                style: 'currency',
                                currency: 'EUR',
                            }).format(3000)}
                        </Typography>
                    </div>
                    <Typography
                        variant="small"
                        color="gray"
                        className="font-poppins">
                        *IVA incluíodo
                    </Typography>
                    <hr />
                    Secção de incerir o cupão
                </CardBody>
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
                    className="m-0 grid place-items-center px-4 py-4 text-center">
                    <Typography variant="h4" className="font-poppins">
                        Método de pagamento
                    </Typography>
                    <div className="mb-4 h-20 p-4 text-white">
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
                    <Typography
                        variant="h6"
                        color="black"
                        className="font-poppins">
                        Selecione o método de pagamento:
                    </Typography>
                    <Tabs value={type} className="overflow-visible">
                        <TabsHeader className="relative z-0 ">
                            <Tab value="card" onClick={() => setType('card')}>
                                <Typography
                                    variant="paragraph"
                                    className="font-poppins">
                                    EuPago
                                </Typography>
                            </Tab>
                            <Tab
                                value="paypal"
                                onClick={() => setType('paypal')}>
                                <Typography
                                    variant="paragraph"
                                    className="font-poppins">
                                    PayPal
                                </Typography>
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
                                    <div className="flex items-center">
                                        <Checkbox
                                            crossOrigin={'anonymous'}
                                            defaultChecked
                                        />
                                        <Typography
                                            variant="small"
                                            color="gray"
                                            className="font-poppins">
                                            Aceito os termos e condições link
                                        </Typography>
                                    </div>
                                </form>
                            </TabPanel>
                        </TabsBody>
                    </Tabs>
                </CardBody>
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
                            Faturação
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
                            Entregra
                        </Typography>
                    </div>
                </Step>
                <Step>
                    <ThumbUpAltOutlinedIcon className="h-5 w-5" />
                    <div className="absolute -bottom-[2.5rem] w-max text-center">
                        <Typography
                            variant="h6"
                            color={activeStep === 2 ? 'blue-gray' : 'gray'}
                            className="font-poppins">
                            Resumo
                        </Typography>
                    </div>
                </Step>
                <Step>
                    <PaymentOutlinedIcon className="h-5 w-5" />
                    <div className="absolute -bottom-[2.5rem] w-max text-center">
                        <Typography
                            variant="h6"
                            color={activeStep === 3 ? 'blue-gray' : 'gray'}
                            className="font-poppins">
                            Pagamento
                        </Typography>
                    </div>
                </Step>
            </Stepper>

            {/* Steps content */}
            {activeStep === 0 && informationStep}
            {activeStep === 1 && shippingStep}
            {activeStep === 2 && reviewStep}
            {activeStep === 3 && paymentStep}

            {/* Next and Prev buttons */}

            <div className="mt-32 flex justify-between">
                <Button
                    variant="outlined"
                    onClick={handlePrev}
                    disabled={isFirstStep}>
                    Anterior
                </Button>
                <Button onClick={handleNext} disabled={isLastStep}>
                    Próximo
                </Button>
            </div>
        </div>
    );
};

export default Checkout;

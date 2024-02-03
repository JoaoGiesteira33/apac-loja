import React, { Suspense } from 'react';

import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { Box, Button, CircularProgress, IconButton, PaletteMode } from '@mui/material';
import { CssBaseline } from '@mui/material/';
import { grey, orange } from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {
    Route,
    Routes,
    useLocation
} from 'react-router-dom';
import Footer from './components/pintar_o_7/Footer';
import ReactNavbar from './components/pintar_o_7/ReactNavbar';
import Requests from './pages/Administrator/Requests';
import ProfileIndex from './pages/Profile/ProfileIndex';
import ProfileInfo from './pages/Profile/ProfileInfo';
import ProfileOrderHistory from './pages/Profile/ProfileOrderHistory';
import NewProduct from './pages/Seller/NewProduct';
import Products from './pages/Seller/Products';

import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import ChatPage from './components/experinecia_chat/ChatPage';
import NewSeller from './pages/Seller/NewSeller';
import AdminPrivateRoutes from './routes/AdminPrivateRoutes';
import PrivateRoutes from './routes/PrivateRoutes';
import SellerPrivateRoutes from './routes/SellerPrivateRoutes';

import { useTranslation } from 'react-i18next';


import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./config/firebase";



// dynamically load components as they are needed
const InitialPage = React.lazy(() => import('./pages/pintar_o_7/Initial'));
const HomePagePintarO7 = React.lazy(() => import('./pages/pintar_o_7/Home'));
const ProductPage = React.lazy(() => import('./pages/Product'));
const LoginPage = React.lazy(() => import('./pages/pintar_o_7/Login'));
const RegisterPage = React.lazy(() => import('./pages/pintar_o_7/Register'));
const ArtistsIndexPage = React.lazy(
    () => import('./pages/pintar_o_7/ArtistsIndex')
);
const ArtistPage = React.lazy(() => import('./pages/pintar_o_7/Artist'));
const CartPage = React.lazy(() => import('./pages/Cart'));
const CheackoutPage = React.lazy(() => import('./pages/Checkout'));
const PageNotFound = React.lazy(() => import('./pages/NotFound'));
const InfoPage = React.lazy(() => import('./pages/InfoPage'));
const ContactPage = React.lazy(() => import('./pages/Contact'));
const CartBadge = React.lazy(() => import('./components/CartBadge'));
const Dashboard = React.lazy(() => import('./pages/Administrator/Dashboard'));
const Notifications = React.lazy(() => import('./pages/Profile/Notifications'));

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });
const getDesignTokens = (mode: PaletteMode) => ({
    typography: {
        fontFamily: 'Poppins',
    },
    palette: {
        mode,
        ...(mode === 'light'
            ? {
                  // Light Mode
                  primary: grey,
                  secondary: {
                      main: '#000000',
                      light: '#333333',
                      dark: '#000000',
                      contrastText: '#ffffff',
                  },
                  background: {
                      default: '#fff',
                      paper: '#fff',
                  },
                  divider: grey[900],
                  text: {
                      primary: grey[900],
                      secondary: grey[800],
                  },
              }
            : {
                  // Dark Mode
                  primary: grey,
                  secondary: orange,
                  background: {
                      default: '#121212',
                      paper: '#1f1f1f',
                  },
                  text: {
                      primary: '#ffffff',
                      secondary: grey[400],
                  },
              }),
    },
    components: {
        MuiSelect: {
            styleOverrides: {
                icon: {
                    color: mode === 'light' ? grey[800] : grey[400],
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiInputBase-root': {
                        outline: 'none',
                        border: 'none',
                    },
                    '& .MuiInputBase-root:before': {
                        outline: 'none',
                    },
                    '& .MuiInputBase-root:after': {
                        outline: 'none',
                    },
                    '& .MuiInputBase-input': {
                        outline: 'none',
                        border: 'none',
                    },
                },
            },
        },
    },
});

function App() {
    const [mode, setMode] = React.useState<PaletteMode>('light');
    const [navbarSize, setNavbarSize] = React.useState<number>(0);
    const [footerSize, setFooterSize] = React.useState<number>(0);
    const location = useLocation();

    // const checkChatRoute = (route: string) => {
    //     var re = /\/product\/[^\/?]+/;
    //     return re.test(route);
    // };

    const [loggedIn, loading, error] = useAuthState(auth);

//    onAuthStateChanged(auth, (user) => {
//     setLoggedIn(user !== undefined)
//    }) ;
    // const [tokenLevel, setTokenLevel] = React.useState(undefined);

    const colorMode = React.useMemo(
        () => ({
            // The dark mode switch would invoke this method
            toggleColorMode: () => {
                setMode((prevMode: PaletteMode) =>
                    prevMode === 'light' ? 'dark' : 'light'
                );
            },
        }),
        []
    );

    // All routes for the app
    const routes = [
        {
            path: '/',
            element: <InitialPage loggedIn={loggedIn} />,
        },
        {
            path: '/gallery',
            element: <HomePagePintarO7 />,
        },
        {
            path: '/artists',
            element: <ArtistsIndexPage />,
        },
        {
            path: '/artists/:id',
            element: <ArtistPage />,
        },
        {
            path: '/artists/add',
            element: <NewSeller />,
            requireAuth: false,
        },
        {
            path: '/product/:product_id',
            element: <ProductPage loggedIn={loggedIn} />,
        },
        {
            path: '/product',
            element: <ProductPage />,
        },
        {
            path: '/login',
            element: <LoginPage />,
        },
        {
            path: '/register',
            element: <RegisterPage />,
        },
        {
            path: '/info',
            element: <InfoPage />,
        },
        {
            path: '/contact',
            element: <ContactPage />,
        },
        {
            path: '/chat',
            element: <ChatPage />,
        },
        {
            path: '*',
            element: <PageNotFound />,
        },
    ];

    const protectedRoutes = [
        {
            path: '/profile',
            element: (
                <ProfileIndex />
            ),
        },
        {
            path: '/profile/info',
            element: <ProfileInfo />,
        },
        {
            path: '/cart',
            element: <CartPage />,
        },
        {
            path: '/checkout', // TODO -> ver melhor como funcionam as rotas
            element: <CheackoutPage />,
        },
        {
            path: '/profile/order-history',
            element: <ProfileOrderHistory />,
        },
        {
            path: '/profile/notifications',
            element: <Notifications />,
        },
    ];

    const adminRoutes = [
        {
            path: '/dashboard',
            element: <Dashboard />,
        },
    ];

    const sellerRoutes = [
        {
            path: '/profile/products',
            element: <Products />,
            authLevel: 'seller',
        },
        {
            path: '/profile/new-product',
            element: <NewProduct />,
            authLevel: 'seller',
        },
        {
            path: '/requests',
            element: <Requests />,
            authLevel: 'seller',
        },
    ];

    const theme = React.useMemo(
        () => createTheme(getDesignTokens(mode)),
        [mode]
    );

    // useEffect(() => {
    //     const token = localStorage.getItem('token');

    //     if (token) {
    //         if (isExpired(token)) {
    //             localStorage.removeItem('token');
    //             localStorage.removeItem('user');
    //             localStorage.removeItem('loggedIn');
    //         } else if (localStorage.getItem('loggedIn')) {
    //             setTokenLevel(decodeToken(token).level);
    //             setLoggedIn(true);
    //         }
    //     }
    // }, []);

    const payPalOptions = {
        clientId: 'AXH3T6mt5FSd1rfMt0i2m6AadWj86MjC2qESbozuHcBXvS3Orwtt0FhxuG-MpxAkOPcYt1LD_ni4dpz4', // testing
        currency: 'EUR',
        intent: 'capture',
    };

    const { t, i18n } = useTranslation()

     const changeLanguageHandler = () =>
     {
            console.log("lang: ", i18n.language);
            if(i18n.language == "pt")
                i18n.changeLanguage("en");
            else
                i18n.changeLanguage("pt");
     }

    return (
        // <CurrentAccountProvider
        //     loggedIn={loggedIn}
        //     setLoggedIn={setLoggedIn}
        //     tokenLevel={tokenLevel ?? ''}
        //     setTokenLevel={setTokenLevel}
        //     >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <PayPalScriptProvider options={payPalOptions}>
                    <ColorModeContext.Provider value={colorMode}>
                        <ThemeProvider theme={theme}>
                            <CssBaseline />
                            <Box
                                component="div"
                                className={
                                    theme.palette.mode === 'dark' ? 'dark' : ''
                                }>
                                <IconButton
                                    sx={{
                                        ml: 1,
                                        position: 'absolute',
                                        right: 0,
                                        top: 0,
                                        zIndex: 1,
                                    }}
                                    onClick={colorMode.toggleColorMode}
                                    color="inherit">
                                    {theme.palette.mode === 'dark' ? (
                                        <Brightness7Icon />
                                    ) : (
                                        <Brightness4Icon />
                                    )}
                                </IconButton>
                                <Button
                                    sx={{
                                        position: 'absolute',
                                        right: 0,
                                        top: 30,
                                        zIndex: 1,
                                    }}
                                    onClick={() => changeLanguageHandler()}
                                    color="inherit">
                                    {i18n.language == "pt" ? "PT" : "EN"}
                                </Button>

                                {location.pathname !== '/' ? (
                                    <ReactNavbar
                                        loggedIn={loggedIn}
                                        setHeight={setNavbarSize}
                                    />
                                ) : (
                                    <></>
                                )}
                                <Suspense
                                    fallback={
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                my: 10,
                                            }}
                                            component="div">
                                            <CircularProgress />
                                        </Box>
                                    }>
                                    <Routes>
                                        {routes.map((route, index) => (
                                            <Route
                                                key={index}
                                                path={route.path}
                                                element={route.element}
                                            />
                                        ))}
                                        <Route
                                        element={
                                            <PrivateRoutes 
                                            level={loggedIn !== undefined} 
                                            />
                                        }>
                                        {protectedRoutes.map((route, index) => (
                                            <Route
                                                key={index}
                                                path={route.path}
                                                element={route.element}
                                            />
                                        ))}
                                    </Route>
                                    <Route
                                        element={
                                            <SellerPrivateRoutes
                                                level={loggedIn}
                                            />
                                        }>
                                        {sellerRoutes.map((route, index) => (
                                            <Route
                                                key={index}
                                                path={route.path}
                                                element={route.element}
                                            />
                                        ))}
                                    </Route>
                                    <Route
                                        element={
                                            <AdminPrivateRoutes
                                                // level={tokenLevel}
                                            />
                                        }>
                                        {adminRoutes.map((route, index) => (
                                            <Route
                                                key={index}
                                                path={route.path}
                                                element={route.element}
                                            />
                                        ))}
                                    </Route>
                                    </Routes>
                                </Suspense>
                                {loggedIn && location.pathname !== '/cart' && (
                                    <CartBadge />
                                )}
                                {/*checkChatRoute(location.pathname) ? (
                                    <Chat />
                                ) : (
                                    <></>
                                )*/}
                                {location.pathname !== '/' ? (
                                    <Footer setHeight={setFooterSize} />
                                ) : (
                                    <></>
                                )}
                            </Box>
                        </ThemeProvider>
                    </ColorModeContext.Provider>
                </PayPalScriptProvider>
            </LocalizationProvider>
        // </CurrentAccountProvider>
    );
}

export default App;

/*

                                    

*/

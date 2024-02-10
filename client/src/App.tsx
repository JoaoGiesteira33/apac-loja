import { lazy, Suspense, useState, useMemo } from 'react';

import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  PaletteMode,
} from '@mui/material';
import { CssBaseline } from '@mui/material/';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Route, Routes, useLocation } from 'react-router-dom';
import Footer from './components/pintar_o_7/Footer';
import ReactNavbar from './components/pintar_o_7/ReactNavbar';
import Requests from './pages/Administrator/Requests';
import ProfileIndex from './pages/Profile/ProfileIndex';
import ProfileInfo from './pages/Profile/ProfileInfo';
import ProfileOrderHistory from './pages/Profile/ProfileOrderHistory';
import NewProduct from './pages/Seller/NewProduct';
import Products from './pages/Seller/Products';

import { PayPalScriptProvider } from '@paypal/react-paypal-js';
// import ChatPage from './components/experinecia_chat/ChatPage';
import NewSeller from './pages/Seller/NewSeller';
import AdminPrivateRoutes from './routes/AdminPrivateRoutes';
import PrivateRoutes from './routes/PrivateRoutes';
import SellerPrivateRoutes from './routes/SellerPrivateRoutes';
import { getDesignTokens } from './theme';
import { ColorModeContext } from './theme';

import { useTranslation } from 'react-i18next';

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './utils/firebase';

// dynamically load components as they are needed
const InitialPage = lazy(() => import('./pages/pintar_o_7/Initial'));
const Gallery = lazy(() => import('./pages/pintar_o_7/Gallery'));
const ProductPage = lazy(() => import('./pages/Product'));
const LoginPage = lazy(() => import('./pages/pintar_o_7/Login'));
const RegisterPage = lazy(() => import('./pages/pintar_o_7/Register'));
const ArtistsIndexPage = lazy(
  () => import('./pages/pintar_o_7/ArtistsIndex')
);
const ArtistPage = lazy(() => import('./pages/pintar_o_7/Artist'));
const CartPage = lazy(() => import('./pages/Shopping/Cart'));
const CheackoutPage = lazy(() => import('./pages/Shopping/Checkout'));
const PageNotFound = lazy(() => import('./pages/NotFound'));
const InfoPage = lazy(() => import('./pages/InfoPage'));
const ContactPage = lazy(() => import('./pages/pintar_o_7/Contact'));
const CartBadge = lazy(() => import('./components/CartBadge'));
const Dashboard = lazy(() => import('./pages/Administrator/Dashboard'));
const Notifications = lazy(() => import('./pages/Profile/Notifications'));


function App() {
  const [mode, setMode] = useState<PaletteMode>('light');
  const [, setNavbarSize] = useState<number>(0);
  const [, setFooterSize] = useState<number>(0);
  const location = useLocation();

  // const checkChatRoute = (route: string) => {
  //     var re = /\/product\/[^\/?]+/;
  //     return re.test(route);
  // };

  const [loggedIn, loading, error] = useAuthState(auth);


  const colorMode = useMemo(
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
      element: <InitialPage loggedIn={loggedIn !== undefined} />,
    },
    {
      path: '/gallery',
      element: <Gallery />,
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
    // {
    //     path: '/chat',
    //     element: <ChatPage />,
    // },
    {
      path: '*',
      element: <PageNotFound />,
    },
  ];

  const protectedRoutes = [
    {
      path: '/profile',
      element: <ProfileIndex />,
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

  const theme = useMemo(
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
    clientId:
      'AXH3T6mt5FSd1rfMt0i2m6AadWj86MjC2qESbozuHcBXvS3Orwtt0FhxuG-MpxAkOPcYt1LD_ni4dpz4', // testing
    currency: 'EUR',
    intent: 'capture',
  };

  const { t, i18n } = useTranslation();

  const changeLanguageHandler = () => {
    console.log('lang: ', i18n.language);
    if (i18n.language == 'pt') i18n.changeLanguage('en');
    else i18n.changeLanguage('pt');
  };

  return (
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
                {i18n.language == 'pt' ? 'PT' : 'EN'}
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
  )
}

export default App;

/*

                                    

*/

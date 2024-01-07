import React, { Suspense } from 'react';

import Footer from './components/pintar_o_7/Footer';
import ReactNavbar from './components/pintar_o_7/ReactNavbar';
//import Navbar from './components/pintar_o_7/Navbar';
import Chat from './components/experinecia_chat/Chat';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

//import { Route, Routes } from 'react-router-dom';
import { CanvasModel } from './components/canvasModel';
import ProfileInfo from './pages/Profile/ProfileInfo';
import ProfileIndex from './pages/Profile/ProfileIndex';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { amber, blue, deepOrange, grey } from '@mui/material/colors';
import { IconButton, PaletteMode } from '@mui/material';
import { CssBaseline } from '@mui/material/';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { input } from '@material-tailwind/react';
import { rootCertificates } from 'tls';
import ProfileOrderHistory from './pages/Profile/ProfileOrderHistory';

// dynamically load components as they are needed
const InitialPage = React.lazy(() => import('./pages/pintar_o_7/Initial'));
const HomePagePintarO7 = React.lazy(() => import('./pages/pintar_o_7/Home'));
const ProductPage = React.lazy(() => import('./pages/Product'));
const LoginPage = React.lazy(() => import('./pages/pintar_o_7/Login'));
const RegisterPage = React.lazy(() => import('./pages/pintar_o_7/Register'));
const ArtistsPage = React.lazy(() => import('./pages/pintar_o_7/Artistas'));
const CartPage = React.lazy(() => import('./pages/Cart'));
const PageNotFound = React.lazy(() => import('./pages/NotFound'));

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });
const getDesignTokens = (mode: PaletteMode) => ({
    typography: {
        fontFamily: 'Poppins',
    },
    palette: {
        mode,
        ...(mode === 'light'
            ? {
                  // palette values for light mode
                  primary: grey,
                  divider: grey[900],
                  text: {
                      primary: grey[900],
                      secondary: grey[800],
                  },
              }
            : {
                  // palette values for dark mode
                  primary: deepOrange,
                  divider: deepOrange[700],
                  background: {
                      default: deepOrange[900],
                      paper: deepOrange[900],
                  },
                  text: {
                      primary: '#fff',
                      secondary: grey[500],
                  },
              }),
    },
    components: {
        MuiSelect: {
            styleOverrides: {
                icon: {
                    color: mode === 'light' ? grey[800] : '#fff',
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
    const navigate = useNavigate();

    const [loggedIn, setLoggedIn] = React.useState<boolean | null>(
        localStorage.getItem('loggedIn') ? true : false
    );

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
            requireAuth: false,
        },
        {
            path: '/gallery',
            element: <HomePagePintarO7 />,
            requireAuth: false,
        },
        {
            path: '/artists',
            element: <ArtistsPage />,
            requireAuth: false,
        },
        {
            path: '/collections/pintura',
            element: <ProductPage />,
            requireAuth: false,
        },
        {
            path: '/3dmodel',
            element: <CanvasModel />,
            requireAuth: false,
        },
        {
            path: '/product',
            element: <ProductPage />,
            requireAuth: false,
        },
        {
            path: '/profile',
            element: <ProfileIndex logout={setLoggedIn} />,
            requireAuth: true,
        },
        {
            path: '/profile/info',
            element: <ProfileInfo />,
            requireAuth: true,
        },
        {
            path: '/login',
            element: <LoginPage setLoggedIn={setLoggedIn} />,
            requireAuth: false,
        },
        {
            path: '/register',
            element: <RegisterPage />,
            requireAuth: false,
        },
        {
            path: '/cart',
            element: <CartPage />,
            requireAuth: true,
        },
        {
            path: '/profile/order-history',
            element: <ProfileOrderHistory />,
            requireAuth: true,
        },
        {
            path: '*',
            element: <PageNotFound />,
            requireAuth: false,
        },
    ];

    const theme = React.useMemo(
        () => createTheme(getDesignTokens(mode)),
        [mode]
    );

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <div className={theme.palette.mode === 'dark' ? 'dark' : ''}>
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

                    {location.pathname !== '/' ? (
                        <ReactNavbar
                            loggedIn={loggedIn}
                            setHeight={setNavbarSize}
                        />
                    ) : (
                        <></>
                    )}
                    <Suspense fallback={<p>Loading...</p>}>
                        <Routes>
                            {/* <Suspense fallback={<Loading />}> *criar este componente depois* */}
                            {routes.map((route, index) => (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        // TO DO -> DESCOMENTAR ISTO ESTÁ FUNCIONAL
                                        //       route.requireAuth && !loggedIn ? (
                                        //           <LoginPage
                                        //               setLoggedIn={setLoggedIn}
                                        //           />
                                        //       ) : (
                                        route.element
                                        //       )
                                    }></Route>
                            ))}
                        </Routes>
                    </Suspense>
                    {location.pathname !== '/' ? <Chat /> : <></>}
                    {location.pathname !== '/' ? (
                        <Footer setHeight={setFooterSize} />
                    ) : (
                        <></>
                    )}
                    {/*</ThemeProvider>*/}
                </div>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;

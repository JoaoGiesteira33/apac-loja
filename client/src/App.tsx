import React, { Suspense } from 'react';

import Footer from './components/pintar_o_7/Footer';
import Navbar from './components/pintar_o_7/Navbar';
import Chat from './components/experinecia_chat/Chat';
import { Route, Routes } from 'react-router-dom';

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

// dynamically load components as they are needed
const InitialPage = React.lazy(() => import('./pages/pintar_o_7/Initial'));
const HomePagePintarO7 = React.lazy(() => import('./pages/pintar_o_7/Home'));
const ProductPage = React.lazy(() => import('./pages/Product'));
const LoginPage = React.lazy(() => import('./pages/pintar_o_7/Login'));
const RegisterPage = React.lazy(() => import('./pages/pintar_o_7/Register'));
const ArtistsPage = React.lazy(() => import('./pages/pintar_o_7/Artistas'));
const CartPage = React.lazy(() => import('./pages/Cart'));

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
    },
});

function App() {
    const [mode, setMode] = React.useState<PaletteMode>('light');

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
            element: <InitialPage />,
            requireAuth: false,
        },
        {
            path: '/gallery',
            element: <HomePagePintarO7 />,
            requireAuth: false,
        },
        {
            path: "/artists",
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
            element: <ProfileIndex />,
            requireAuth: false,
        },
        {
            path: '/profile/info',
            element: <ProfileInfo />,
            requireAuth: false,
        },
        {
            path: '/login',
            element: <LoginPage />,
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
            requireAuth: false, // TODO: change to true
        }
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
                        sx={{ ml: 1, position: 'absolute', right: 0, top: 0 }}
                        onClick={colorMode.toggleColorMode}
                        color="inherit">
                        {theme.palette.mode === 'dark' ? (
                            <Brightness7Icon />
                        ) : (
                            <Brightness4Icon />
                        )}
                    </IconButton>
                    {window.location.pathname !== "/" ? <Navbar />: <></>}
                    {/*<Chat userID={userID} />*/}
                    {/*<ThemeProvider theme={{}}>*/}
                    <Suspense fallback={<p>Loading...</p>}>
                        <Routes>
                            {/* <Suspense fallback={<Loading />}> *criar este componente depois* */}
                            {routes.map((route, index) => (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        /*
                          route.requireAuth ? (
                            <RequireAuth loginPath="/login">
                              {route.element}
                            </RequireAuth>
                          ) : (   *Implementar depois o componente RequireAuth na Autenticação*  */
                                        route.element
                                        /*)*/
                                    }></Route>
                            ))}
                        </Routes>
                    </Suspense>
                    {window.location.pathname !== "/" ? <Chat />: <></>}
                    {window.location.pathname !== "/" ? <Footer />: <></>}
                    {/*</ThemeProvider>*/}

                </div>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;
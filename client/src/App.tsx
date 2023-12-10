import React, { useState, useEffect, Suspense } from 'react';
import { socket } from './socket';

import Footer from './components/new_footer';
import Navbar from './components/pintar_o_7/Navbar';

import { Route, Routes } from 'react-router-dom';
import { CanvasModel } from './components/canvasModel';
import ProfileInfo from './pages/Profile/ProfileInfo';
import ProfileIndex from './pages/Profile/ProfileIndex';
import { ChatWidget } from './components/ChatWidget';
import { ThemeProvider, useTheme, createTheme } from '@mui/material/styles';
import { amber, deepOrange, grey } from '@mui/material/colors';
import { IconButton, PaletteMode } from '@mui/material';
import { CssBaseline } from '@mui/material/';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

// dynamically load components as they are needed
const HomePage = React.lazy(() => import('./pages/Home'));
const HomePagePintarO7 = React.lazy(() => import('./pages/pintar_o_7/Home'));
const ProductPage = React.lazy(() => import('./pages/Product'));

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
                  primary: amber,
                  divider: amber[200],
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
    const [userID, setUserId] = useState('');
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

    useEffect(() => {
        const sessionID = localStorage.getItem('sessionID');

        if (sessionID) {
            socket.auth = { sessionID };
            socket.connect();
        }

        socket.on('session', ({ sessionID, userID }) => {
            socket.auth = { sessionID };
            localStorage.setItem('sessionID', sessionID);
            setUserId(userID);
        });

        socket.on('connect_error', (err) => {
            if (err.message === 'invalid username') {
            }
        });

        return () => {
            socket.off('connect_error');
        };
    }, []);

    // All routes for the app
    const routes = [
        {
            path: '/',
            element: <HomePagePintarO7 />,
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
                    <Navbar />
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

                    <Footer />
                    {/*</ThemeProvider>*/}

                    {/* <ChatWidget /> */}
                </div>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;

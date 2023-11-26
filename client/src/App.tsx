import React, { useState, useEffect, Suspense } from 'react';
import { socket } from './socket';

import Footer from './components/new_footer';
import Navbar from './components/pintar_o_7/Navbar';

import Chat from './components/experinecia_chat/Chat';

import { Route, Routes } from 'react-router-dom';
import { CanvasModel } from './components/canvasModel';
import ProfileInfo from './pages/Profile/ProfileInfo';
import ProfileIndex from './pages/Profile/ProfileIndex';
import { ChatWidget } from './components/ChatWidget';


// dynamically load components as they are needed
const HomePage = React.lazy(() => import('./pages/Home'));
const HomePagePintarO7 = React.lazy(() => import('./pages/pintar_o_7/Home'));
const ProductPage = React.lazy(() => import('./pages/Product'));

function App() {
    const [userID, setUserId] = useState('');

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

    return (
        <div>
            <Navbar />
            <Chat />
        </div>
    );
}

export default App;

// return (
//    <div>
//    <Navbar />
//    <Chat />
//    {/*<ThemeProvider theme={{}}>*/}
//    <Suspense fallback={<p>Loading...</p>}>
//        <Routes>
//            {/* <Suspense fallback={<Loading />}> *criar este componente depois* */}
//            {routes.map((route, index) => (
//                <Route
//                    key={index}
//                    path={route.path}
//                    element=
//                    {
//                        /*
//                  route.requireAuth ? (
//                    <RequireAuth loginPath="/login">
//                      {route.element}
//                    </RequireAuth>
//                  ) : (   *Implementar depois o componente RequireAuth na Autenticação*  */
//                        route.element
//                        /*)*/
//                    }
//                ></Route>
//            ))}
//        </Routes>
//    </Suspense>
//
//    {/*<Footer />*/}
//    {/*</ThemeProvider>*/}
//
//    {/*<ChatWidget />*/}
//</div>
//);
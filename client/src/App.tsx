import React, { useState, useEffect, Suspense } from 'react';
import { socket } from './socket';

import Footer from './components/footer';
import Navbar from './components/navbar';

import Chat from './components/experinecia_chat/Chat';

import { Route, Routes } from 'react-router-dom';
import { CanvasModel } from './components/canvasModel';
import Product from './components/product';


// dynamically load components as they are needed
const HomePage = React.lazy(() => import('./pages/Home'));
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
            element: <HomePage />,
            requireAuth: false,
        },
        {
            path: '/collections/pintura',
            element: <Product />,
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
        }

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
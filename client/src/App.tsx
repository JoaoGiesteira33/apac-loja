import React, { useState, useEffect } from 'react';

import Footer from './components/pintar_o_7/Footer';
import Navbar from './components/pintar_o_7/Navbar';
import { ChatWidget } from './components/ChatWidget';

//import { Route, Routes } from 'react-router-dom';
import { CanvasModel } from './components/canvasModel';
import ProfileInfo from './pages/Profile/ProfileInfo';
import ProfileIndex from './pages/Profile/ProfileIndex';



// dynamically load components as they are needed
const HomePage = React.lazy(() => import('./pages/Home'));
const HomePagePintarO7 = React.lazy(() => import('./pages/pintar_o_7/Home'));
const ProductPage = React.lazy(() => import('./pages/Product'));

function App() {

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
            <ChatWidget />
            <Footer />
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
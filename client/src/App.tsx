import { useState, useEffect } from 'react';
import { socket } from './socket';
import Chat from './components/experinecia_chat/Chat';

import Footer from './components/footer';
import MainPage from './components/mainPage';
import Navbar from './components/navbar';

import { Route, Routes } from 'react-router-dom';
import { CanvasModel } from './components/canvasModel';

import { BasicSpeedDial } from './components/BasicSpeedDial';
import { ChatWidget } from './components/ChatWidget';



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
    
    return (
        <div>
            <Navbar />
            {/*<Chat userID={userID} />*/}
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/collections/pintura" element={<></>} />
            </Routes>
            
            <CanvasModel />

            
            <Footer />
            
            <ChatWidget />

        </div>
    );
}

export default App;

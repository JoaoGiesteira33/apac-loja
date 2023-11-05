import { useState, useEffect } from 'react';
import { socket } from './socket';

import Footer from './components/footer';
import MainPage from './components/mainPage';
import Navbar from './components/navbar';

import { Route, Routes } from 'react-router-dom';

import { BasicSpeedDial } from './components/BasicSpeedDial';



function App() {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [chatMessages, setChatMessages] = useState<Array<any>>([]);

    useEffect(() => {
        function onConnect() {
            setIsConnected(true);
        }

        function onDisconnect() {
            setIsConnected(false);
        }

        function onChatMessage(value: any) {
            setChatMessages(previous => [...previous, value]);
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('chat message', onChatMessage);        
    
        return () => {
          socket.off('connect', onConnect);
          socket.off('disconnect', onDisconnect);
          socket.off('chat message', onChatMessage);
        };
    }, []);
    
    return (
        <div>
            <Navbar />

            {/*             <ConnectionState isConnected={ isConnected } />
            <Events events={ chatMessages } />
            <ConnectionManager />
            <ChatAvatars />
            <MyForm /> */}

            
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/collections/pintura" element={<></>} />
            </Routes>

            <BasicSpeedDial />
            
            <Footer />
            
        </div>
    );
}

export default App;

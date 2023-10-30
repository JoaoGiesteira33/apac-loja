import Footer from './components/footer';
import MainPage from './components/mainPage';
import Navbar from './components/navbar';

import { Route, Routes } from 'react-router-dom';

function App() {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/collections/pintura" element={<></>} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;

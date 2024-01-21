import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './i18n';

// Tirar no futuro.
import { ViewportProvider } from './contexts/viewPortContext';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './contexts/cartProvider.tsx';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ViewportProvider>
            <BrowserRouter>
                <CartProvider>
                    <PayPalScriptProvider
                        options={{
                            clientId: 'test',
                            components: 'buttons',
                            currency: 'USD',
                        }}>
                        <App />
                    </PayPalScriptProvider>
                </CartProvider>
            </BrowserRouter>
        </ViewportProvider>
    </React.StrictMode>
);

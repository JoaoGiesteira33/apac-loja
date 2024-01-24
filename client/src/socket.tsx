import { io } from 'socket.io-client';
import { CHAT_URL } from './fetchers';
// "undefined" means the URL will be computed from the `window.location` object
//const URL = import.meta.env['NODE_ENV'] === 'production' ? '' : 'http://localhost:3000';

export const socket = io(CHAT_URL, {
    autoConnect: false,
    auth: {
        serverOffset: 0
    },
    // enable retries
    //ackTimeout: 10000,
    //retries: 3
});
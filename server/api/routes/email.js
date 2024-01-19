const express = require('express');
const router = express.Router();

const { send_email } = require('../utils/utils');

const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 1, // limit each IP to 1 requests per windowMs
});

const middleware = require('./myMiddleware');

router.post('/send', async (req, res) => {
    const { email, subject, text } = req.body;
    try {
        const sendToSelf = true;
        const result = await send_email(email, subject, text, sendToSelf);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json(error);
    }
});

module.exports = router;

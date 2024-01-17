const express = require('express');
const router = express.Router();

const { send_email } = require('../utils/utils');

const middleware = require('./myMiddleware');

module.exports = router;

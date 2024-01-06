const express = require('express');
const router = express.Router();

const controllerUser = require('../controllers/user');
const { isAdmin, isMeOrAdmin } = require('../utils/utils');

const middleware = require('./myMiddleware')

// ---------------------CLIENT------------------------

//Basic Methods

// GET Client Info
router.get('/client/:id', isMeOrAdmin, middleware.extractFilters, middleware.fieldSelector, function (req, res) {
    controllerUser.getUserInfo(req.params.id)
        .then((info) => {
            res.status(200).jsonp(info); 
        })
        .catch((erro) => {
            res.status(400).jsonp(erro);
        });
});

// POST Client Info
router.post('/client', function (req, res) {
    controllerUser.createUser(req.body)
        .then((info) => {
            res.jsonp(info);
        })
        .catch((erro) => {
            res.jsonp(erro);
        });
});

// UPDATE Client Info
router.put('/client/:id', isMeOrAdmin, function (req, res) {
    controllerUser.updateUserInfo(req.params.id, req.body)
        .then((info) => {
            res.jsonp(info);
        })
        .catch((erro) => {
            res.jsonp(erro);
        });
});

// DELETE Client Info
router.delete('/client/:id', isMeOrAdmin, function (req, res) {
    controllerUser.deleteUser(req.params.id)
        .then((info) => {
            res.jsonp(info);
        })
        .catch((erro) => {
            res.jsonp(erro);
        });
});


//GET Clients
router.get('/clients', isAdmin, middleware.extractFilters, middleware.fieldSelector, function (req, res) {
    controllerUser.getUsers(req.filters, req.fields, req.query.page || 0)
        .then((info) => {
            res.jsonp(info);
        })
        .catch((erro) => {
            res.jsonp(erro)
        });
});


// ---------------------------------------------


// GET Seller Info
router.get('/seller/:id', isMeOrAdmin, middleware.fieldSelector, function (req, res) {
    controllerUser.getUserInfo(req.params.id)
        .then((info) => {
            res.jsonp(info);
        })
        .catch((erro) => {
            res.jsonp(erro);
        });
});

// POST Seller Info
router.post('/seller', function (req, res) {
    controllerUser.createUser(req.body)
        .then((info) => {
            res.jsonp(info);
        })
        .catch((erro) => {
            res.jsonp(erro);
        });
});

// UPDATE Seller Info
router.put('/seller/:id', isMeOrAdmin, function (req, res) {
    controllerUser.updateUserInfo(req.params.id, req.body)
        .then((info) => {
            res.jsonp(info);
        })
        .catch((erro) => {
            res.jsonp(erro);
        });
});

// DELETE Seller Info
router.delete('/seller/:id', isMeOrAdmin, function (req, res) {
    controllerUser.deleteUser(req.params.id)
        .then((info) => {
            res.jsonp(info);
        })
        .catch((erro) => {
            res.jsonp(erro);
        });
});

//GET Sellers
router.get('/sellers', isAdmin, middleware.extractFilters, middleware.fieldSelector, function (req, res) {
    controllerUser.getUsers(req.filters, req.fields, req.query.page || 0, req.query.limit || 28)
        .then((info) => {
            res.jsonp(info);
        })
        .catch((erro) => {
            res.jsonp(erro)
        });
});

// ----------------------ANY USER-----------------------

// GET User Info
router.get('/:id', isMeOrAdmin, middleware.fieldSelector, function (req, res) {
    controllerUser.getUserInfo(req.params.id)
        .then((info) => {
            res.jsonp(info);
        })
        .catch((erro) => {
            res.jsonp(erro);
        });
});

// POST User Info
router.post('/', function (req, res) {
    controllerUser.createUser(req.body)
        .then((info) => {
            res.jsonp(info);
        })
        .catch((erro) => {
            res.jsonp(erro);
        });
});

// UPDATE User Info
router.put('/:id', isMeOrAdmin, function (req, res) {
    controllerUser.updateUserInfo(req.params.id, req.body)
        .then((info) => {
            res.jsonp(info);
        })
        .catch((erro) => {
            res.jsonp(erro);
        });
});

// DELETE User Info
router.delete('/:id', isMeOrAdmin, function (req, res) {
    controllerUser.deleteUser(req.params.id)
        .then((info) => {
            res.jsonp(info);
        })
        .catch((erro) => {
            res.jsonp(erro);
        });
});


// ----------------------TEST-----------------------



module.exports = router;

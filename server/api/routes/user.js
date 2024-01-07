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
        .catch((error) => {
            res.status(400).jsonp(error);
        });
});

// POST Client Info
router.post('/client', function (req, res) {
    controllerUser.createUser(req.body)
        .then((info) => {
            res.jsonp(info);
        })
        .catch((error) => {
            res.jsonp(error);
        });
});

// UPDATE Client Info
router.put('/client/:id', isMeOrAdmin, function (req, res) {
    controllerUser.updateUserInfo(req.params.id, req.body)
        .then((info) => {
            res.jsonp(info);
        })
        .catch((error) => {
            res.jsonp(error);
        });
});

// DELETE Client Info
router.delete('/client/:id', isMeOrAdmin, function (req, res) {
    controllerUser.deleteUser(req.params.id)
        .then((info) => {
            res.jsonp(info);
        })
        .catch((error) => {
            res.jsonp(error);
        });
});


//GET Clients
router.get('/clients', isAdmin, middleware.extractFilters, middleware.fieldSelector, function (req, res) {
    req.filters.role = "client";
    controllerUser.getUsers(req.filters, req.fields, req.query.page || 0)
        .then((info) => {
            res.jsonp(info);
        })
        .catch((error) => {
            res.jsonp(error)
        });
});


// ---------------------------------------------


// GET Seller Info
router.get('/seller/:id', isMeOrAdmin, middleware.fieldSelector, function (req, res) {
    controllerUser.getUserInfo(req.params.id)
        .then((info) => {
            res.jsonp(info);
        })
        .catch((error) => {
            res.jsonp(error);
        });
});

// POST Seller Info
router.post('/seller', function (req, res) {
    controllerUser.createUser(req.body)
        .then((info) => {
            res.jsonp(info);
        })
        .catch((error) => {
            res.jsonp(error);
        });
});

// UPDATE Seller Info
router.put('/seller/:id', isMeOrAdmin, function (req, res) {
    controllerUser.updateUserInfo(req.params.id, req.body)
        .then((info) => {
            res.jsonp(info);
        })
        .catch((error) => {
            res.jsonp(error);
        });
});

// DELETE Seller Info
router.delete('/seller/:id', isMeOrAdmin, function (req, res) {
    controllerUser.deleteUser(req.params.id)
        .then((info) => {
            res.jsonp(info);
        })
        .catch((error) => {
            res.jsonp(error);
        });
});

//GET Sellers
router.get('/sellers', isAdmin, middleware.extractFilters, middleware.fieldSelector, function (req, res) {
    req.filters.role = "seller";
    controllerUser.getUsers(req.filters, req.fields, req.query.page || 0, req.query.limit || 28)
        .then((info) => {
            res.jsonp(info);
        })
        .catch((error) => {
            res.jsonp(error)
        });
});

// ----------------------ANY USER-----------------------

// GET User Info
router.get('/:id', isMeOrAdmin, middleware.fieldSelector, function (req, res) {
    controllerUser.getUserInfo(req.params.id)
        .then((info) => {
            res.jsonp(info);
        })
        .catch((error) => {
            res.jsonp(error);
        });
});

// POST User Info
router.post('/', function (req, res) {
    controllerUser.createUser(req.body)
        .then((info) => {
            res.jsonp(info);
        })
        .catch((error) => {
            res.jsonp(error);
        });
});

// UPDATE User Info
router.put('/:id', isMeOrAdmin, function (req, res) {
    controllerUser.updateUserInfo(req.params.id, req.body)
        .then((info) => {
            res.jsonp(info);
        })
        .catch((error) => {
            res.jsonp(error);
        });
});

// DELETE User Info
router.delete('/:id', isMeOrAdmin, function (req, res) {
    controllerUser.deleteUser(req.params.id)
        .then((info) => {
            res.jsonp(info);
        })
        .catch((error) => {
            res.jsonp(error);
        });
});


router.get('/', isAdmin, middleware.extractFilters, middleware.fieldSelector, function (req, res) {
    controllerUser.getUsers(req.filters, req.fields, req.query.page || 0, req.query.limit || 28)
        .then((info) => {
            res.jsonp(info);
        })
        .catch((error) => {
            res.jsonp(error)
        });
});

// ----------------------TEST-----------------------



module.exports = router;

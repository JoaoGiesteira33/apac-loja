const express = require('express');
const router = express.Router();

const controllerUser = require('../controllers/user');
const { isAdmin, isMeOrAdmin } = require('../utils/utils');

const middleware = require('./myMiddleware');

// ---------------------CLIENT------------------------

//Basic Methods

// GET Client Info
router.get(
    '/client/:id',
    isMeOrAdmin,
    middleware.expandExtractor,
    middleware.extractFilters,
    middleware.fieldSelector,
    function (req, res) {
        controllerUser
            .getUserInfo(req.params.id, req.expand || '')
            .then((info) => {
                res.status(200).jsonp(info);
            })
            .catch((error) => {
                res.status(400).jsonp(error);
            });
    }
);

// POST Client Info
router.post('/client', function (req, res) {
    controllerUser
        .createUser(req.body)
        .then((info) => {
            res.status(200).jsonp(info);
        })
        .catch((error) => {
            res.status(400).jsonp(error);
        });
});

// PUT Client Info
router.put('/client/:id', isMeOrAdmin, function (req, res) {
    controllerUser
        .replaceUserInfo(req.params.id, req.body)
        .then((info) => {
            res.jsonp(info);
        })
        .catch((error) => {
            res.jsonp(error);
        });
});

// PATCH Client Info
router.patch('/client/:id', isMeOrAdmin, function (req, res) {
    controllerUser
        .updateUserInfo(req.params.id, req.body)
        .then((info) => {
            res.jsonp(info);
        })
        .catch((error) => {
            res.jsonp(error);
        });
});

// DELETE Client Info
router.delete('/client/:id', isMeOrAdmin, function (req, res) {
    controllerUser
        .deleteUser(req.params.id)
        .then((info) => {
            res.jsonp(info);
        })
        .catch((error) => {
            res.jsonp(error);
        });
});

//GET Clients
router.get(
    '/clients',
    isAdmin,
    middleware.expandExtractor,
    middleware.extractFilters,
    middleware.fieldSelector,
    function (req, res) {
        req.filters.role = 'client';
        controllerUser
            .getUsers(
                req.filters,
                req.fields,
                req.query.page || 0,
                req.query.limit || 28,
                req.expand || ''
            )
            .then((info) => {
                res.jsonp(info);
            })
            .catch((error) => {
                res.jsonp(error);
            });
    }
);

// ---------------------------------------------

// GET Seller Info
router.get(
    '/seller/:id',
    isMeOrAdmin,
    middleware.expandExtractor,
    middleware.fieldSelector,
    function (req, res) {
        controllerUser
            .getUserInfo(req.params.id, req.expand || '')
            .then((info) => {
                res.jsonp(info);
            })
            .catch((error) => {
                res.jsonp(error);
            });
    }
);

// POST Seller Info
router.post('/seller', function (req, res) {
    controllerUser
        .createUser(req.body)
        .then((info) => {
            res.jsonp(info);
        })
        .catch((error) => {
            res.jsonp(error);
        });
});

// PUT Seller Info
router.put('/seller/:id', isMeOrAdmin, function (req, res) {
    controllerUser
        .replaceUserInfo(req.params.id, req.body)
        .then((info) => {
            res.jsonp(info);
        })
        .catch((error) => {
            res.jsonp(error);
        });
});

// PATCH Seller Info
router.patch('/seller/:id', isMeOrAdmin, function (req, res) {
    controllerUser
        .updateUserInfo(req.params.id, req.body)
        .then((info) => {
            res.jsonp(info);
        })
        .catch((error) => {
            res.jsonp(error);
        });
});

// DELETE Seller Info
router.delete('/seller/:id', isMeOrAdmin, function (req, res) {
    controllerUser
        .deleteUser(req.params.id)
        .then((info) => {
            res.jsonp(info);
        })
        .catch((error) => {
            res.jsonp(error);
        });
});

//GET Sellers
router.get(
    '/sellers',
    middleware.expandExtractor,
    middleware.extractFilters,
    middleware.fieldSelector,
    function (req, res) {
        req.filters.role = 'seller';
        controllerUser
            .getUsers(
                req.filters,
                req.fields,
                req.query.page || 0,
                req.query.limit || 28,
                req.expand || ''
            )
            .then((info) => {
                res.jsonp(info);
            })
            .catch((error) => {
                res.jsonp(error);
            });
    }
);

// ----------------------ANY USER-----------------------

// GET User Info
router.get(
    '/:id',
    isMeOrAdmin,
    middleware.expandExtractor,
    middleware.fieldSelector,
    function (req, res) {
        controllerUser
            .getUserInfo(req.params.id, req.expand || '')
            .then((info) => {
                res.status(200).jsonp(info);
            })
            .catch((error) => {
                res.status(400).jsonp(error);
            });
    }
);

// POST User Info
router.post('/', function (req, res) {
    controllerUser
        .createUser(req.body)
        .then((info) => {
            res.status(200).jsonp(info);
        })
        .catch((error) => {
            res.status(400).jsonp(error);
        });
});

// PUT User Info
router.put('/:id', isMeOrAdmin, function (req, res) {
    controllerUser
        .replaceUserInfo(req.params.id, req.body)
        .then((info) => {
            res.jsonp(info);
        })
        .catch((error) => {
            res.jsonp(error);
        });
});

// PATCH User Info
router.patch('/:id', isMeOrAdmin, function (req, res) {
    controllerUser
        .updateUserInfo(req.params.id, req.body)
        .then((info) => {
            res.jsonp(info);
        })
        .catch((error) => {
            res.jsonp(error);
        });
});

// DELETE User Info
router.delete('/:id', isMeOrAdmin, function (req, res) {
    controllerUser
        .deleteUser(req.params.id)
        .then((info) => {
            res.status(200).jsonp(info);
        })
        .catch((error) => {
            res.status(400).jsonp(error);
        });
});

router.get(
    '/',
    isAdmin,
    middleware.expandExtractor,
    middleware.extractFilters,
    middleware.fieldSelector,
    function (req, res) {
        controllerUser
            .getUsers(
                req.filters,
                req.fields,
                req.query.page || 0,
                req.query.limit || 28,
                req.expand || ''
            )
            .then((info) => {
                res.jsonp(info);
            })
            .catch((error) => {
                res.jsonp(error);
            });
    }
);

// ----------------------TEST-----------------------

module.exports = router;

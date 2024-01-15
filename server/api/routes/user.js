const express = require('express');
const router = express.Router();

const controllerUser = require('../controllers/user');
const controllerProduct = require('../controllers/product');
const controllerShipment = require('../controllers/shipment');

const { isAdmin, isMeOrAdmin, isAdminOrAUTH } = require('../utils/utils');

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
router.post('/client', isAdminOrAUTH, function (req, res) {
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
router.delete('/client/:id', isAdminOrAUTH, function (req, res) {
    controllerUser
        .deleteUser(req.params.id)
        .then((info) => {
            res.status(200).jsonp(info);
        })
        .catch((error) => {
            res.status(400).jsonp(error);
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
router.post('/seller', isAdminOrAUTH, function (req, res) {
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
router.delete('/seller/:id', isAdminOrAUTH, function (req, res) {
    controllerUser
        .deleteUser(req.params.id)
        .then((info) => {
            res.status(200).jsonp(info);
        })
        .catch((error) => {
            res.status(400).jsonp(error);
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
router.post('/', isAdmin, function (req, res) {
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
router.delete('/:id', isAdmin, function (req, res) {
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

// ----------------------NON-CRUD-----------------------

// GET Products of Seller(Including the state of shipment if applicable)
router.get('/seller/:id/products', function (req, res) {
    controllerProduct
        .getProducts({ _seller: req.params.id }, {}, 0, 0, '')
        .then((info) => {
            let unavailable = info.results
                .filter((product) => {
                    return product.piece_info.state == 'unavailable';
                })
                .map((product) => {
                    return product._id;
                });

            console.log(unavailable);

            if (unavailable.length > 0) {
                controllerShipment
                    .getShipments(
                        { _product: { $in: unavailable } },
                        {},
                        0,
                        0,
                        ''
                    )
                    .then((shipments) => {
                        console.log(shipments);
                        let products = info.results.map((product) => {
                            let shipment = shipments.results.find(
                                (shipment) => {
                                    return shipment._product.equals(
                                        product._id
                                    );
                                }
                            );
                            if (shipment) {
                                product.piece_info.state =
                                    shipment.states.slice(-1)[0].value;
                            }
                            return product;
                        });
                        res.jsonp({ results: products, hasMore: info.hasMore });
                    })
                    .catch((error) => {
                        res.jsonp(error);
                    });
            } else {
                res.jsonp(info);
            }
        })
        .catch((error) => {
            res.jsonp(error);
        });
});

module.exports = router;

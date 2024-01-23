const express = require('express');
const router = express.Router();

const controllerProduct = require('../controllers/product');
//const controllerAuth = require('../controllers/accessLevel');

const { hasAccess, isAdminOrAUTH } = require('../utils/utils');

const middleware = require('./myMiddleware');

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// ---------------------------------------------

// GET Max Price
router.get('/maxPrice', function (req, res, next) {
    controllerProduct
        .getMaxPrice()
        .then((info) => {
            res.status(200).jsonp(info);
        })
        .catch((error) => {
            res.status(500).jsonp(error);
        });
});

// GET Product Info
router.get(
    '/:id',
    middleware.expandExtractor,
    middleware.fieldSelector,
    function (req, res, next) {
        controllerProduct
            .getProductInfo(req.params.id, req.expand || '')
            .then((info) => {
                res.status(200).jsonp(info);
            })
            .catch((error) => {
                res.status(500).jsonp(error);
            });
    }
);

// POST Product Info
router.post('/', hasAccess, function (req, res, next) {
    if (req.level == 'client') {
        res.status(403).jsonp({
            error: 'You are not allowed to create a product.',
        });
    } else {
        if (req._id && req.level != 'admin') {
            req.body._seller = req._id;
        }
        controllerProduct
            .createProduct(req.body)
            .then((info) => {
                res.status(200).jsonp(info);
            })
            .catch((error) => {
                res.status(500).jsonp(error);
            });
    }
});

// PUT Product Info
router.put('/:id', hasAccess, function (req, res, next) {
    if (req.level == 'client') {
        res.status(403).jsonp({
            error: 'You are not allowed to replace a product.',
        });
    }
    controllerProduct
        .getProductInfo(req.params.id)
        .then((product) => {
            if (
                product != null &&
                product._seller != req._id &&
                req.level != 'admin'
            ) {
                res.status(403).jsonp({
                    error: 'You are not allowed to replace this product.',
                });
            } else {
                if (req._id && req.level != 'admin') {
                    req.body._seller = req._id;
                }
                controllerProduct
                    .replaceProductInfo(req.params.id, req.body)
                    .then((info) => {
                        if (info.matchedCount == 0) {
                            res.status(201).jsonp(info);
                        } else {
                            res.status(200).jsonp(info);
                        }
                    })
                    .catch((error) => {
                        res.status(500).jsonp(error);
                    });
            }
        })
        .catch((error) => {
            res.status(500).jsonp(error);
        });
});

// PATCH Product Info
router.patch('/:id', hasAccess, function (req, res, next) {
    if (req.level == 'client') {
        res.status(403).jsonp({
            error: 'You are not allowed to update a product.',
        });
    }
    controllerProduct
        .getProductInfo(req.params.id)
        .then((product) => {
            if (
                product != null &&
                product._seller != req._id &&
                req.level != 'admin'
            ) {
                res.status(403).jsonp({
                    error: 'You are not allowed to update this product.',
                });
            } else {
                controllerProduct
                    .updateProductInfo(req.params.id, req.body)
                    .then((info) => {
                        if (info.matchedCount == 1) {
                            res.status(200).jsonp(info);
                        } else {
                            res.status(400).jsonp({
                                error: 'Error updating product.',
                            });
                        }
                    })
                    .catch((error) => {
                        res.status(500).jsonp(error);
                    });
            }
        })
        .catch((error) => {
            res.status(500).jsonp(error);
        });
});

// DELETE Product Info
router.delete('/:id', hasAccess, function (req, res, next) {
    controllerProduct
        .getProductInfo(req.params.id)
        .then((product) => {
            if (product._seller != req._id && req.level != 'admin') {
                res.status(403).jsonp({
                    error: 'You are not allowed to delete this product.',
                });
            } else {
                controllerProduct
                    .deleteProduct(req.params.id)
                    .then((info) => {
                        res.status(200).jsonp(info);
                    })
                    .catch((error) => {
                        res.status(500).jsonp(error);
                    });
            }
        })
        .catch((error) => {
            res.status(500).jsonp(error);
        });
});

// GET Products
router.get(
    '/',
    middleware.expandExtractor,
    middleware.extractFilters,
    middleware.fieldSelector,
    function (req, res, next) {
        controllerProduct
            .getProducts(
                req.filters,
                req.fields,
                req.query.page || 0,
                req.query.limit || 28,
                req.expand || ''
            )
            .then((info) => {
                res.status(200).jsonp(info);
            })
            .catch((error) => {
                res.status(500).jsonp(error);
            });
    }
);

// Advanced Methods

// POST Product Photo
router.post(
    '/:id/photos',
    hasAccess,
    upload.array('files', 12),
    function (req, res, next) {
        if (req.level == 'client') {
            res.status(403).jsonp({
                error: 'You are not allowed to upload product photos.',
            });
        }
        controllerProduct
            .getProductInfo(req.params.id)
            .then((product) => {
                if (
                    product != null &&
                    product._seller != req._id &&
                    req.level != 'admin'
                ) {
                    res.status(403).jsonp({
                        error: 'You are not allowed to upload photos to this product.',
                    });
                } else {
                    let photos = req.files.map((file) => {
                        return {
                            name: file.originalname,
                            mimetype: file.mimetype,
                            size: file.size,
                            data: file.buffer,
                        };
                    });
                    controllerProduct
                        .addPhotos(req.params.id, photos)
                        .then((info) => {
                            res.status(201).jsonp(info);
                        })
                        .catch((error) => {
                            res.status(500).jsonp(error);
                        });
                }
            })
            .catch((error) => {
                res.status(500).jsonp(error);
            });
    }
);

module.exports = router;

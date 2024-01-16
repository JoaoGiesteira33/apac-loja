const express = require('express');
const router = express.Router();

const controllerNotification = require('../controllers/notification');

const middleware = require('./myMiddleware');

// ---------------------------------------------

// GET Notification Info
router.get(
    '/:id',
    middleware.expandExtractor,
    middleware.fieldSelector,
    function (req, res, next) {
        controllerNotification
            .getNotificationInfo(req.params.id, req.expand || '')
            .then((info) => {
                res.jsonp(info);
            })
            .catch((error) => {
                res.jsonp(error);
            });
    }
);

// POST Notification Info
router.post('/', function (req, res, next) {
    controllerNotification
        .createNotification(req.body)
        .then((info) => {
            res.jsonp(info);
        })
        .catch((error) => {
            res.jsonp(error);
        });
});

// PUT Notification Info
router.put('/:id', function (req, res, next) {
    controllerNotification
        .replaceNotificationInfo(req.params.id, req.body)
        .then((info) => {
            res.jsonp(info);
        })
        .catch((error) => {
            res.jsonp(error);
        });
});

// PATCH Notification Info
router.patch('/:id', function (req, res, next) {
    controllerNotification
        .updateNotificationInfo(req.params.id, req.body)
        .then((info) => {
            res.jsonp(info);
        })
        .catch((error) => {
            res.jsonp(error);
        });
});

// DELETE Notification Info
router.delete('/:id', function (req, res, next) {
    controllerNotification
        .deleteNotification(req.params.id)
        .then((info) => {
            res.jsonp(info);
        })
        .catch((error) => {
            res.jsonp(error);
        });
});

// GET Notifications
router.get(
    '/',
    middleware.expandExtractor,
    middleware.fieldSelector,
    middleware.paginationExtractor,
    function (req, res, next) {
        controllerNotification
            .getNotifications(
                req.filters,
                req.fields,
                req.page,
                req.limit,
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

module.exports = router;

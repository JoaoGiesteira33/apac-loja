const express = require('express');
const router = express.Router();

const controllerNotification = require('../controllers/notification');

const { hasAccess, isAdminOrAUTH } = require('../utils/utils');

const middleware = require('./myMiddleware');

// ---------------------------------------------

// GET Notification Info
router.get(
    '/:id',
    middleware.expandExtractor,
    middleware.fieldSelector,
    hasAccess,
    function (req, res, next) {
        controllerNotification
            .getNotificationInfo(req.params.id, req.expand || '')
            .then((info) => {
                if (info._user != req._id && req.level != 'admin') {
                    res.status(403).jsonp({
                        error: 'You are not allowed to see this notification.',
                    });
                }
                res.status(200).jsonp(info);
            })
            .catch((error) => {
                res.status(500).jsonp(error);
            });
    }
);

// POST Notification Info
router.post('/', hasAccess, function (req, res, next) {
    if (req._id && req.level != 'admin') {
        req.body._user = req._id;
    }
    controllerNotification
        .createNotification(req.body)
        .then((info) => {
            res.status(201).jsonp(info);
        })
        .catch((error) => {
            res.status(500).jsonp(error);
        });
});

// PUT Notification Info
router.put('/:id', isAdminOrAUTH, function (req, res, next) {
    controllerNotification
        .replaceNotificationInfo(req.params.id, req.body)
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
});

// PATCH Notification Info
router.patch('/:id', hasAccess, function (req, res, next) {
    controllerNotification
        .getNotificationInfo(req.params.id)
        .then((info) => {
            if (info._user != req._id && req.level != 'admin') {
                res.status(403).jsonp({
                    error: 'You are not allowed to update this notification.',
                });
            } else {
                controllerNotification
                    .updateNotificationInfo(req.params.id, req.body)
                    .then((info) => {
                        if (info.matchedCount == 1) {
                            res.status(201).jsonp(info);
                        } else {
                            res.status(400).jsonp({
                                error: 'Error updating notification.',
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

// DELETE Notification Info
router.delete('/:id', hasAccess, function (req, res, next) {
    controllerNotification
        .getNotificationInfo(req.params.id)
        .then((info) => {
            if (info._user != req._id && req.level != 'admin') {
                res.status(403).jsonp({
                    error: 'You are not allowed to delete this notification.',
                });
            } else {
                controllerNotification
                    .deleteNotification(req.params.id)
                    .then((info) => {
                        res.status(200).jsonp(info);
                    })
                    .catch((error) => {
                        res.status(500).jsonp(error);
                    });
            }
        })
        .catch((error) => {});
});

// GET Notifications
router.get(
    '/',
    middleware.expandExtractor,
    middleware.fieldSelector,
    middleware.extractFilters,
    hasAccess,
    function (req, res, next) {
        if (req._id && req.level != 'admin') {
            req.filters._user = req._id;
        } else {
            controllerNotification
                .getNotifications(
                    req.filters,
                    req.fields,
                    req.page,
                    req.limit,
                    req.expand || ''
                )
                .then((info) => {
                    res.status(200).jsonp(info);
                })
                .catch((error) => {
                    res.status(500).jsonp(error);
                });
        }
    }
);

module.exports = router;

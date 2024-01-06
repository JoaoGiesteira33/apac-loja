const User = require('../models/user');
// METHODS:
//      - getUserInfo
module.exports.getUserInfo = function (id) {
    return User.findOne({ _id: id })
        .then((info) => {
            return info;
        })
        .catch((erro) => {
            return erro;
        });
};
//      - createUser
module.exports.createUser = function (data) {
    return User.create(data)
        .then((info) => {
            return info;
        })
        .catch((erro) => {
            return erro;
        });
};
//      - updateUserInfo
module.exports.updateUserInfo = function (id, data) {
    return User.update({ _id: id }, data)
        .then((info) => {
            return info;
        })
        .catch((erro) => {
            return erro;
        });
};
//      - deleteUser
module.exports.deleteUser = function (id) {
    return User.deleteOne({ _id: id })
        .then((info) => {
            return info;
        })
        .catch((erro) => {
            return erro;
        });
};

//      - getAllUsers
module.exports.getUsers = function (filters, fields, page, limit) {
    return Promise.all([
        User.find(filters, fields).sort({_id:'asc'}).skip(page * limit).limit(limit),
        User.countDocuments(filters)
    ]).then(([users,count]) => {
        let hasMore = count > ((page + 1) * limit);
        return {users: users, hasMore: hasMore};
    }).catch((erro) => {
        return erro;
    });
};
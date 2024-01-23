const User = require('../models/user');
const controllerFile = require('./file');

const utils = require('../utils/utils');
// METHODS:
//      - getUserInfo
module.exports.getUserInfo = function (id, expand) {
    return User.findOne({ _id: id })
        .populate(expand)
        .then((info) => {
            return info;
        });
};

//      - createUser
module.exports.createUser = function (data) {
    return User.create(data).then((info) => {
        return info;
    });
};

//     - replaceUserInfo
module.exports.replaceUserInfo = function (id, data) {
    return User.replaceOne({ _id: id }, data, {
        upsert: true,
    }).then((info) => {
        return info;
    });
};

//      - updateUserInfo
module.exports.updateUserInfo = function (id, data) {
    return User.updateOne({ _id: id }, { $set: data }).then((info) => {
        return info;
    });
};

//      - deleteUser
module.exports.deleteUser = function (id) {
    return User.deleteOne({ _id: id }).then((info) => {
        return info;
    });
};

//      - getAllUsers
module.exports.getUsers = function (filters, fields, page, limit, expand) {
    return Promise.all([
        User.find(filters, fields)
            .sort({ _id: 'asc' })
            .skip(page * limit)
            .limit(limit)
            .populate(expand),
        User.countDocuments(filters),
    ]).then(([users, count]) => {
        let hasMore = count > (page + 1) * limit && limit != 0;
        return { results: users, hasMore: hasMore };
    });
};

module.exports.updateUserPhoto = async function (id, data) {
    let session = await User.startSession();
    try {
        session.startTransaction();

        let file = await controllerFile.createFile(data);
        let filePath = 'file/' + file._id;
        await User.updateOne(
            { _id: id },
            {
                $set: {
                    'seller_fields.profile_picture': filePath,
                },
            }
        );

        await session.commitTransaction();
        return file;
    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        session.endSession();
    }
};

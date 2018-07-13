const User = require('./userModel');
const Admin = require('./adminModel');
const logger = require('../../../helper/logger');

const userUtils = {};

//Check User Exist with Given Email
userUtils.checkUserExist = (email) => {
    return new Promise((resolve, reject) => {
        const query = { email: email };
        User.count(query)
            .then((count) => {
                resolve(count > 0);
            }).catch((err) => {
                reject(err);
            });
    });
};

//Check Admin Exist with Given Email
userUtils.checkAdminExist = (email) => {
    return new Promise((resolve, reject) => {
        const query = { email: email };
        Admin.count(query)
            .then((count) => {
                resolve(count > 0);
            }).catch((err) => {
                reject(err);
            });
    });
};

//Create Admin
userUtils.createAdmin = (adminData) => {
    return new Promise((resolve, reject) => {
        const admin = new Admin(adminData);
        
        admin.save()
        .then((savedAdmin) => {
            resolve(savedAdmin);
        }).catch((err) => {
            logger.error(err);
            reject(err);
        });
    });
};

//Create User
userUtils.createUser = (userData) => {
    return new Promise((resolve, reject) => {
        const user = new Admin(userData);
        
        user.save()
        .then((savedUser) => {
            resolve(savedUser);
        }).catch((err) => {
            logger.error(err);
            reject({code: 500, message: l10n.t('TRY_AGAIN')});
        });
    });
};

module.exports = userUtils;
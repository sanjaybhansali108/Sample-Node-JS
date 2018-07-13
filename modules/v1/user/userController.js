const passwordHash = require('password-hash');
const User = require('./userModel');
const Admin = require('./adminModel');
const userUtils = require('./userUtils');
const logger = require('../../../helper/logger');
const constants = require('../../../config/constants');
const jwt = require('../../../helper/jwt');

const userCtrl = {};

userCtrl.checkUserExist = (req, res) => {
    const { email, phone, loginType } = req.body;
    let promise = userUtils.checkUserExist(email, 'email');

    const { loginTypes } = constants.authType;

    if (loginTypes.Mobile.is(loginType)) {
        promise = userUtils.checkUserExist(phone, 'phone');
    }

    promise
        .then((isExist) => {
            res.status(200).json({ isExist });
        }).catch((err) => {
            logger.error(err);
            res.status(500).json({ error: req.t('ERR_INTERNAL_SERVER') });
        });
};

//Admin Login
userCtrl.adminLogin = (req, res) => {
    const { email, password } = req.body;
    const query = {
        email: email
    };

    Admin.findOne(query)
        .then((admin) => {
            if (admin) {
                console.log(admin.password);
                console.log(password);

                if (passwordHash.verify(password, admin.password)) {
                    
                    const adminObj = admin;
                    delete admin._doc.password

                    res.status(200).json({ message: req.t('LOGIN_SUCCESS'), data: adminObj });
                } else {
                    res.status(400).json({ error: req.t('ERR_INVALID_CREDENTIAL') });
                }
            } else {
                res.status(400).json({ error: req.t('ERR_USER_NOT_FOUND') });
            }
        }).catch((err) => {
            logger.error(err);
            res.status(500).json({ error: req.t('ERR_INTERNAL_SERVER') });
        });
};

userCtrl.adminRegister = (req, res) => {
    const { email, password } = req.body;

    const adminData = {
        password: passwordHash.generate(password)
    }

    Promise.all([
        userUtils.checkAdminExist(email)
    ])
    .then((isExist) => {
        if (!isExist[0]) {
            adminData.email = email;

            userUtils.createAdmin(adminData)
            .then((admin) => {
                const adminObj = admin;
                delete adminObj._doc.password;

                res.status(200).json({ message: req.t('MSG_ADIMN_ACCOUNT_CREATED'), data: adminObj });
            }).catch((err) => {
                res.status(err.status).json({ error: err.message });
            });
        }else{
            return res.status(400).json({ error: req.t('ERR_USER_ALREADY_EXIST') });
        }
    }).catch((err) => {
        logger.error(err)
    });
}

module.exports = userCtrl;
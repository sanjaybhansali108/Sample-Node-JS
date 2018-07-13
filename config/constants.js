const Enum = require('enum');

module.exports = {
    pager: {
        limit: 10
    },
    supportedMime: {
        image: ['image/png', 'image/jpg', 'image/jpeg'],
    },
    authType: {
        loginTypes: new Enum(['Email', 'Mobile']),
        otpExpire: 1 * 3600 * 100,
    },
    user: {
        gender: new Enum(['Male', 'Female']),
        userStatus: new Enum(['Active', 'NotVerified', 'Deactive']),
    }
};
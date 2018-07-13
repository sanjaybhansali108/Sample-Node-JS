const validator = {};

const input  = {
    "/forgot-password" : {
        email: {
            rules: [
                { type: 'notEmpty' },
                { type: 'isEmail', msg: 'ERR_VALID_EMAIL' },
            ],
        },
    },
};

module.exports = validator;
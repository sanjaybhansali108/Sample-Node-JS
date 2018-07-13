const _ = require('lodash');
const isEmail = require('isemail');
const isValidDate = require('is-valid-date');
const PhoneNumber = require('awesome-phonenumber');
const passwordRules = require('password-rules');

//Password Policy Rules
const passwordPolicy = {
    minimumLength: 6,
    maximumLength: 30,
    requireCapital: false,
    requireLower: true,
    requireNumber: false,
    requireSpecial: false,
};

const validator = {};

validator.isValid = (str) => {
    return !(typeof str !== 'string' || _.isEmpty(str))
}

validator.notEmpty = (str) => {
    return !_.isEmpty(str) || _.isNumber(str);
};

validator.isArray = (arrayStr) => {
    return _.isArray(arrayStr);
};

validator.isCommaAray = (commaStr) => {
    return _.isArray(commaStr.split(','));
};

validator.isInt = (numberStr) => {
    return _.isNumber(numberStr);
};

validator.isFloat = (floatStr) => {
    return _.isFloat(floatStr);
};

//Check whether given date is valid or not
validator.isValidDate = (dateStr) => {
    return isValidDate(dateStr);
};

//Check whether mongoId is valid or not
validator.isValidMongoId = (idStr) => {
    return idStr.match(/^[0-9a-fA-F]{24}$/);
};

//Check whether Email is valid or not
validator.isEmail = (emailStr) => {
    if (emailStr) {
        return isEmail.validate(emailStr);
    }
    
    return false;
};

//Check whether phone number is valid or not
validator.isValidPhoneNumber = (phoneNumberStr) => {
    const pn = new PhoneNumber(phoneNumberStr);
    return pn.isMobile();
};

//Check whether password is valid or not
validator.isValidPassword = (passwordStr) => {
    const hasError = passwordRules(passwordStr, passwordPolicy);

    if (hasError) {
        return false
    }

    return true
};

//Check whether str is valid with given Rex or not
validator.isValidStrWithRex = (str, options) => {
    const { rex } = options;

    if (this.isValid(str)) {
        if (this.notEmpty(rex)) {
            return rex.test(str);
        }else{
            return false;
        }
    }

    return false;
};

module.exports = validator;
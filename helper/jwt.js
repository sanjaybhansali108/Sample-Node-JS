const jwt = require('jwt-simple');
const jwtToken = require('jsonwebtoken');
const logger = require('./logger');

const jwtUtil = {};

jwtUtil.getAuthToken = (data) => {
    return jwt.encode(data, process.env.JwtSecret);
};

jwtUtil.decodeAuthToken = (token) => {
    if (token) {
        try {
            return jwt.decode(token, process.env.JwtSecret);
        }catch (err){
            logger.error('Error! When decode token', err);
            return false;
        }
    }

    return false;
};

module.exports = jwtUtil;
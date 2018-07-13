const _ = require('lodash');
const logger = require('./helper/logger');
const jwt = require('./helper/jwt');
const User = require('./modules/v1/user/userModel');

const middleware = {};

middleware.loaduser = (req, res, next) => {
    const { headers, byPassRoutes } = req;

    if (!_.isEmpty(byPassRoutes)) {
        if (_.includes(byPassRoutes, req.path)) {
            //Req Path contains in ByPassRoute it's mean req endpoints are ex. /login, /register, /forgotpassword
            next();
            return false;
        }
    }

    if (_.isEmpty(headers.authorization)) {
        res.status(401).json({ error: req.t('ERR_UNAUTH')})
    }else{
        const decoded = jwt.decodeAuthToken(headers.authorization);

        if (decoded) {
            User.findOne({ _id: decoded.id })
                .then((user) => {
                    if (user) {
                        if (user.isActive) {
                            req.user = user;
                            next();
                        }else{
                            res.status(401).json({ error: req.t('ERR_USER_BLOCKED')})    
                        }
                    }else{
                        res.status(401).json({ error: req.t('ERR_TOKEN_EXP')})
                    }
                }).catch((err) => {
                    res.status(401).json({ error: req.t('ERR_TOKEN_EXP')})
                });

                //req.user = decoded;
        }else{
            res.status(401).json({ error: req.t('ERR_TOKEN_EXP')})
        }
    }
}

module.exports = middleware;
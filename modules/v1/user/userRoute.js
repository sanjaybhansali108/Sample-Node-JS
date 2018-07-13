const express = require('express');
const userCtrl = require('./userController');
const middleware = require('../../../middleware');
const userMiddleware = require('./userMiddleware');
const validationRules = require('./userValidationRules');

const userRouter = express.Router();

userRouter.use([(req, res, next) => {
    req.byPassRoutes = ['/admin-login', '/admin-register'];
    next();
}, middleware.loaduser]);

userRouter.post('/admin-login', userCtrl.adminLogin);
userRouter.post('/admin-register', userCtrl.adminRegister);

module.exports = userRouter;
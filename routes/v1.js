const express = require('express');
const path = require('path');
const logger = require('../helper/logger');

const router = express.Router()

const apiVersion = path.basename(__filename, '.js');

logger.info(`apiVersion ${apiVersion}`);

const v = `../modules/${apiVersion}`;

logger.info(`v ${v}`);

router.use((req, res, next) => {
    req.apiVersion = apiVersion;
    next();
});

router.use('/user', require(`${v}/user/userRoute`));
router.use('/*', (req, res) => {
   res.status(404).json({ error: 'Invalid Request' });
});
module.exports = router;
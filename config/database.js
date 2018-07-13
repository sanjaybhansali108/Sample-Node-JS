const mongoose = require('mongoose');
const logger = require('../helper/logger');

mongoose.set('debug', true);
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL, (err) => {
    
    if (!err) {
        logger.info(`${process.env.DB_URL} Database server connected....`);
    }else{
        logger.log(`Database connection error - ${err}`);
    }
});
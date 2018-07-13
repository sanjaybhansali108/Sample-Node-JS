require('dotenv').config();
require('./config/database');

const express = require('express');
const logger = require('./helper/logger');
const bodyParser = require('body-parser');
const l10n = require('jm-ez-l10n');

const app = express();

//Request Body parser settings
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb" }));

//Set localization json file to the app
l10n.setTranslationsFile('en', './language/translation.en.json');
app.use(l10n.enableL10NExpress);

//Routes to the routes/v1 
app.use('/api/v1', require(`./routes/v1`));

app.listen(process.env.ServerPort, () => {
    logger.info(`Express server listening on port ${process.env.ServerPort}`);
});
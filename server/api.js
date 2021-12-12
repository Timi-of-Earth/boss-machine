const express = require('express');
const apiRouter = express.Router();
const minionsApi = require('./minions-api');
const ideasApi = require('./ideas-api');
const meetingsApi = require('./meetings-api');

//Mounting the seperate APIs
apiRouter.use('/minions', minionsApi);

apiRouter.use('/ideas', ideasApi);

apiRouter.use('/meetings', meetingsApi);

module.exports = apiRouter;

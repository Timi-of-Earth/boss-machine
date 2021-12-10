const express = require('express');
const apiRouter = express.Router();
const minionsApi = require('./minions-api');
const ideasApi = require('./ideas-api');

//Mounting the seperate APIs
apiRouter.use('/minions', minionsApi);

apiRouter.use('/ideas', ideasApi);

module.exports = apiRouter;

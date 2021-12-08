const express = require('express');
const apiRouter = express.Router();
const minionsApi = require('./minions-api')

//Mounting the seperate APIs
apiRouter.use('/minions', minionsApi);

module.exports = apiRouter;

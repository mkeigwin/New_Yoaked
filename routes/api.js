// added from Dan Pease Auth Temp
const apiRouter = require('express').Router();
const { getAllSecrets } = require('../models/api.js')

apiRouter.route('/')
  .get(getAllSecrets, (req, res, next) => res.json(res.secrets));

module.exports = apiRouter;

const express = require('express');
const cors = require('cors');
require('./dbMongo/mongoose');
const router = require('./router');
const handlerError = require('./handlerError/handler');
const multerErrorHandler = require('./handlerError/multerErrorHandler');
const tokenErrorsHandler = require('./handlerError/tokenErrorsHandler');
const { FILES_PATH } = require('./constants');

const createApp = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use('/public', express.static(FILES_PATH));
  app.use(router);
  app.use(tokenErrorsHandler);
  app.use(multerErrorHandler);
  app.use(handlerError);

  return app;
};

module.exports = createApp;

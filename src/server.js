'use strict';

// 3rd party packages
const express = require('express');
const cors = require('cors');

const notFoundHandler = require('./error-handlers/404.js');
const errorHandler = require('./error-handlers/500.js');
const logger = require('./middleware/logger.js');

const v1Routes = require('./routes/v1.js');
const authRoutes = require('./auth/routes.js');

const app = express();

// middleware
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(logger);

// routes
app.use('/api/v1', v1Routes); // http://localhost:3001/api/v1/clothes
app.use(authRoutes);

// gapp.use('/api/v2', v2Routes); // http://localhost:3001/api/v1/clothes

app.use('*', notFoundHandler);
app.use(errorHandler);

module.exports = {
  server: app,
  start: port => {
    if (!port) { throw new Error('Missing Port'); }
    app.listen(port, () => console.log(`Listening on ${port}`));
  },
};

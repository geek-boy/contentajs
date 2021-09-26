// @flow

/**
 * Base application definition.
 */

const _ = require('lodash');
const path = require("path");
const bodyParser = require('body-parser');
const config = require('config');
const cors = require('cors');
const express = require('express');
const { globalAgent: httpGlobalAgent } = require('http');
const { globalAgent: httpsGlobalAgent } = require('https');

const cacheControl = require('../middlewares/cacheControl');
const copyToRequestObject = require('../middlewares/copyToRequestObject');
const errorHandler = require('../middlewares/errorHandler');
const healthcheck = require('../routes/healthcheck');
const hello = require('../routes/hello');
const doorbell_route = require('../routes/doorbell');
const jsonrpcProxy = require('../routes/jsonrpcProxy');
const proxyHandler = require('../routes/proxyHandler');
const { initSubrequests } = require('../routes/subrequests');

// const DoorBellInit = require('../doorbell/doorbell_init');
const DoorBellController = require('../doorbell/doorbell_controller');


module.exports = async (cmsMeta: Object) => {
  const app = express();
  app.disable('x-powered-by');

  // Enable etags.
  app.enable('etag');
  app.set('etag', 'strong');
  const jsonApiPrefix = _.get(cmsMeta, 'jsonApiPrefix', '/jsonapi');
  const jsonApiPaths = JSON.parse(_.get(cmsMeta, 'jsonApiPaths', '[]'));
  const cmsHost = config.get('cms.host');
  
  process.stdout.write("app.js jsonApiPrefix: " + jsonApiPrefix + "\n"); 
  process.stdout.write("app.js cmsHost: " + cmsHost + "\n"); 

  // Set the global agent options
  const agentOptions = config.util.toObject(config.get('cms.httpAgent'));
  Object.keys(agentOptions).forEach(key => {
    _.set(httpGlobalAgent, [key], agentOptions[key]);
    _.set(httpsGlobalAgent, [key], agentOptions[key]);
  });

  const corsHandler = cors(config.util.toObject(config.get('cors')));
  app.use(corsHandler);
  // Adds support for preflight OPTIONS requests on all routes.
  app.options('*', corsHandler);

  // Initialize the request object with valuable information.
  app.use(copyToRequestObject({ jsonApiPrefix, jsonApiPaths, cmsHost }));

  // Used to access and render React App
  // app.use(express.static(path.join(__dirname, "..", "build")));
  app.use(express.static(path.join(__dirname, "../..", "client/build")));

  // Healthcheck is a special endpoint used for application monitoring.
  app.get('/healthcheck', healthcheck);

  // Response from Server with date/time
  app.get('/hello', hello);

  // Response from Server for doorbell with date/time
  app.get('/doorbell', doorbell_route);


  // Set cache control header.
  app.use(cacheControl);

  // Proxy for the JSON API server in Contenta CMS.
  app.use(jsonApiPrefix, bodyParser.json({ type: 'application/vnd.api+json' }));
  app.use(jsonApiPrefix, proxyHandler);
  // Forward JSON RPC requests to the CMS.
  app.use('/jsonrpc', jsonrpcProxy);

  initSubrequests(app);

  // Fallback error handling. If there is any unhandled exception or error,
  // catch them here to allow the app to continue normally.
  app.use(errorHandler);

  const doorbell_controller = DoorBellController.getInstance();
  doorbell_controller.awaitButtonPush()
  app.set('doorbell',doorbell_controller)

  return app;
};

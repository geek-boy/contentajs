// @flow

import type {
  $Request as Request,
  $Response as Response,
  NextFunction,
} from 'express';

const proxy = require('express-http-proxy');

module.exports = (req: Request, res: Response, next: NextFunction): void => {
  console.log("----- logoutProxy --------")
  console.log(req.body)

  return proxy(req.cmsHost,
    {
      proxyReqPathResolver: req => `/user/logout?_format=json&token=` + req.body.logout_token + `&csrf_token=` + req.body.csrf_token,
    }
  )(req, res, next);
};

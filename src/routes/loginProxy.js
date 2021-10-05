// @flow

import type {
  $Request as Request,
  $Response as Response,
  NextFunction,
} from 'express';

const proxy = require('express-http-proxy');

module.exports = (req: Request, res: Response, next: NextFunction): void => {
  console.log("----- loginProxy --------")
  // console.log(req)

  return proxy(req.cmsHost,
    {
      proxyReqPathResolver: req => `/user/login?_format=json`,
    }
  )(req, res, next);
};

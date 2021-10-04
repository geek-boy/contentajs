// @flow

import type {
  $Request as Request,
  $Response as Response,
  NextFunction,
} from 'express';

const proxy = require('express-http-proxy');

module.exports = (req: Request, res: Response, next: NextFunction): void => {
  console.log("----- loginProxy --------")
  console.log(req)
  const options = {
    proxyErrorHandler: (err, eRes, eNext) =>
      errorHandler(err, req, eRes, eNext),
    userResHeaderDecorator(headers, userReq) {
      // Make sure to overwrite the cache control headers set by the CMS.
      const fakeRes = {
        set(k, v) {
          headers[k] = v;
        },
      };
      cacheControl(userReq, fakeRes, () => {});
      return headers;
    }, 
  }

  return proxy(req.cmsHost
    , {
    proxyReqPathResolver: req => `/user/login?_format=json`,
  }
  )(req, res, next);
};

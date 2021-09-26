// @flow

import type { $Request as Request, $Response as Response } from 'express';

/**
 * A users endpoint.
 *
 * Useful for auto-scaling policies, like EC2.
 */
module.exports = (req: Request, res: Response): void => {
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date+'_'+time;

  console.log("App: " + req.app.get('doorbell').test_ring())

  res.set('Cache-Control', 'private, max-age=0, no-cache');
  res.send({ doorbell: 'Doorbell ping at ' + dateTime});
};

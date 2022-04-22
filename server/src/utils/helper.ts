import _ from "lodash";
var url = require("url");

export const returnResponse = (res: any, err: any, data: any, next: any) => {
  if (res && res.req && res.req.probe) {
    var urlParts = url.parse(res.req.originalUrl) || {};
    res.req.probe.stop("Send response" + urlParts.pathname);
  }

  if (!err) {
    res.status(200);
    return res.send(data);
  } else {
    next(err);
  }
};

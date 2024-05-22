const http = require("http");

// function rqListener(req, res) {}
// http.createServer(rqListener);

const srvr = http.createServer((req, res) => {
  console.log(req.url, req.method, req.headers);
  //return req;
  //process.exit();
  return res.status(200);
});

srvr.listen(7501);

const http = require("http");
const url = require('url');
const https = require('https');
const handler = require("./requestHandlers")

const port = 8000;

http.createServer((req, res) => {
  // parse the incoming url
  const parsedURL = url.parse(req.url, true);

}).listen(port, () => {
  console.log("App is running on port:", port);
})
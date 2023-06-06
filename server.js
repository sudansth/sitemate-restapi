const http = require("http");
const handler = require("./requestHandlers")

const port = 8000;

http.createServer((req, res) => {
  //regex to catch api request to operate on issue id
  const regex = new RegExp("^\/api\/issues\/([a-zA-Z0-9]*$)")
  //get api url and id from the url
  const urlData = regex.exec(req.url);
  //check for POST /api/issues
  if (req.url === "/api/issues" && req.method === "POST") {
    handler.createIssue(req, res);
  } 
  //if the request is other than POST
  else if(urlData != null) {
    const id = urlData[1];
    if (req.method === "GET") {
      handler.getIssueById(req, res, id);
    } else if (req.method === "PUT") {
      handler.updateIssueById(req, res, id);
    } else if (req.method === "DELETE") {
      handler.deleteIssue(res, id);
    }
  } else {
    console.log("Bad Request received. Returning 400.")
    //handle invalid url requests
    res.setHeader('content-type', 'Application/json');
    res.statusCode = 400;
    res.end();
  }
}).listen(port, () => {
  console.log("Server is running on port:", port);
})
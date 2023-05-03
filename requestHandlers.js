const createIssue = (req, res) => {
  let payload = "";
    req.on("data", (data) => {
      payload += data;
      //if data more than 1MB kill the connection
      if (payload.length > 1e6) {
        payload = "";
        res.writeHead(413, {'Content-Type': 'Application/json'}).end();
        req.connection.destroy();
      }
    })

    req.on('end', function() {
      console.log("New Issue created:", payload)
    });

    res.setHeader('content-type', 'Application/json');
    res.statusCode = 200;
    res.end();
}

const getIssueById = (req, res, id) => {
  //set response
  res.setHeader('content-type', 'Application/json');
  res.statusCode = 200;
  res.end(JSON.stringify({id, title:"Test Title", description: "Test Description"}));
}

const updateIssueById = (req, res, id) => {
  let payload = "";
  req.on("data", (data) => {
      payload += data;
  })

  req.on('end', function() {
    console.log("Issue updated:", payload)
  });

  //set response
  res.setHeader('content-type', 'Application/json');
  res.statusCode = 200;
  res.end();
}

const deleteIssue = (res, id) => {
  console.log("Issue Id to be deleted:", id)
  //sset response
  res.setHeader('content-type', 'Application/json');
  res.statusCode = 200;
  res.end();
}

module.exports = {
  createIssue,
  getIssueById,
  updateIssueById,
  deleteIssue
}
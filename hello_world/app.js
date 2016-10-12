var http = require('http');

var server =http.createServer(function (req, resp) {
resp.writeHead(200, {"Content-Type": "text/plain"});
resp.end("Hi there suckers\nWhats up");
});

server.listen(8080)

console.log("Node http server listening on port 8080");
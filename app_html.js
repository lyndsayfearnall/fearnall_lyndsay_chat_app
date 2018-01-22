//this way sucks, don't do it this way
const http = require('http');
const fs = require('fs'); //one of the modules that is part of the node core

const hostname = '127.0.0.1';
const port = process.env.PORT || 3000;
const user = process.env.USER;

const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html'});

  var file =fs.createReadStream('index.html'); //referencing file system model (fs)
  file.pipe(res);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/Logged in as ${user}`);
});

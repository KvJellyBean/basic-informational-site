const { createServer } = require("http");
const fs = require("fs");
const url = require("url");

const hostname = "localhost";
const port = 8080;

const server = createServer((req, res) => {
  const q = url.parse(req.url, true);
  const filename = req.url === "/" ? "./index.html" : `.${q.pathname}.html`;

  fs.readFile(filename, "utf-8", (err, data) => {
    if (err) {
      fs.readFile("./404.html", "utf-8", (err, data) => {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.write(data);
        return res.end();
      });
      return;
    }
    res.writeHead(200, { "Content-Type": "text/html" });
    if (data) {
      res.write(data);
    }
    return res.end();
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

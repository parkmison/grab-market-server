var http = require("http");
var hostname = "127.0.0.1";
var port = 8082;

const server = http.createServer(function (req, res) {
  const path = req.url;
  const method = req.method;
  if (path === "/products") {
    if (method === "GET") {
      res.writeHead(200, { "Content-Type": "application/json" });
      const products = JSON.stringify([
        {
          name: "농구공",
          price: 5555,
        },
      ]);
      res.end(products);
    } else if (method === "POST") {
      res.end("생성 완료");
    }
  }
  res.end("ㅂㅂ");
});

server.listen(port, hostname);

console.log("server on");

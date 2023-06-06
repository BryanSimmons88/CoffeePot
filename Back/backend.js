var WebSocketServer = require("ws").WebSocketServer;
var http = require("http");
const PORT = 8080;

var server = http
  .createServer()
  .listen(PORT);

const wss = new WebSocketServer({ server });

var lastBrewed = new Date();

wss.on("connection", async (client) => {
  client.send(lastBrewed.getHours() + ":" + lastBrewed.getMinutes());
  client.addEventListener("message", (message) => {
    if (message.data === "brew") {
      lastBrewed = new Date();
      wss.clients.forEach((client) => {
        client.send(lastBrewed.getHours() + ":" + lastBrewed.getMinutes())
      })
    }
  });
  client.addListener("close", () => {
  });
});

console.log("Backend started on port " + PORT);

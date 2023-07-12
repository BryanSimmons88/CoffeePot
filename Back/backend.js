var WebSocketServer = require("ws").WebSocketServer;
var http = require("http");
const PORT = 8080;

var server = http
  .createServer()
  .listen(PORT);

const wss = new WebSocketServer({ server });

var lastBrewed = new Date();

console.log((lastBrewed.getUTCMonth() + 1) + '/' + (lastBrewed.getUTCDate()) + ' ' + (lastBrewed.getUTCHours() - 4) + ":" + (lastBrewed.getUTCMinutes() > 9 ? lastBrewed.getUTCMinutes() : '0' + lastBrewed.getUTCMinutes()))
wss.on("connection", async (client) => {
  client.send((lastBrewed.getUTCMonth() + 1) + '/' + (lastBrewed.getUTCDate()) + ' ' + (lastBrewed.getUTCHours() - 4) + ":" + (lastBrewed.getUTCMinutes() > 9 ? lastBrewed.getUTCMinutes() : '0' + lastBrewed.getUTCMinutes()));
  client.addEventListener("message", (message) => {
    if (message.data === "brew") {
      lastBrewed = new Date();
      wss.clients.forEach((client) => {
        client.send((lastBrewed.getUTCMonth() + 1) + '/' + (lastBrewed.getUTCDate()) + ' ' + (lastBrewed.getUTCHours() - 4) + ":" + (lastBrewed.getUTCMinutes() > 9 ? lastBrewed.getUTCMinutes() : '0' + lastBrewed.getUTCMinutes()))
      })
    }
  });
  client.addListener("close", () => {
  });
});

console.log("Backend started on port " + PORT);

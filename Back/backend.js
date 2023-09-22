var WebSocketServer = require("ws").WebSocketServer;
var http = require("http");
var moment = require('moment') 
const PORT = 8080;

var server = http
  .createServer()
  .listen(PORT);

const wss = new WebSocketServer({ server });

var lastBrewed = new Date();

wss.on("connection", async (client) => {
  client.send(moment(lastBrewed).format('M/DD H:MM'));
  client.addEventListener("message", (message) => {
    if (message.data === "brew") {
      lastBrewed = new Date();
      wss.clients.forEach((client) => {
        client.send(moment(lastBrewed).format('M/DD H:MM'))
      })
    }
  });
  client.addListener("close", () => {
  });
});

console.log("Backend started on port " + PORT);

import express from "express";
import http from "node:http";
import path from "node:path";
import { createBareServer } from "@tomphttp/bare-server-node";

const __dirname = process.cwd();
const server = http.createServer();
const app = express(server);
const bareServer = createBareServer("/");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

server.on("request", (req, res) => {
  if (bareServer.shouldRoute(req)) {
    bareServer.routeRequest(req, res);
  } else {
    app(req, res);
  }
});

server.on("upgrade", (req, socket, head) => {
  if (bareServer.shouldRoute(req)) {
    bareServer.routeUpgrade(req, socket, head);
  } else {
    socket.end();
  }
});

server.on("listening", () => {
  console.log(`Doge Unblocker running at port 8000`);
});

server.listen({
  port: 8000,
});

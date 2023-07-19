const http = require("http");
const app = require("./app");
const { wordCloud } = require("./services/word-cloud/word-cloud");
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
async function startServer() {
  await wordCloud();
  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
}
startServer();

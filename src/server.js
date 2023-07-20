const http = require("http");
const app = require("./app");
const { wordCloud } = require("./services/word-cloud/word-cloud");

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

async function startServer() {
  try {
    await wordCloud();
  } catch (error) {
    console.error(
      `Could not load new articles, trying to use the old ones. ${error.message}`
    );
  }
  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
}

startServer();

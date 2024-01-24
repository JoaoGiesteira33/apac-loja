const cluster = require("cluster");
const http = require("http");
const { setupMaster } = require("@socket.io/sticky");

const Redis = require("ioredis");
const redisClient = new Redis(6379,"redis");
const { RedisSessionStore } = require("./sessionStore");
const sessionStore = new RedisSessionStore(redisClient);
const axios = require("axios");

// URL do container user
const API_URL_USER = 'http://api/user';


const WORKERS_COUNT = 1;

const getAllArtists = async () => {
  try {
      const response = await axios.get(`${API_URL_USER}/sellers`, {
          params: {
              limit: 0,
          },
      });
      console.log('API Users:', response.data.results);
      return response.data.results;
  } catch (error) {
      console.error('Error getting users:', error);
      return error;
  }
};

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // persist session
  getAllArtists().then((artists) => {
    //artists.results.forEach((artist) => {
    //  sessionStore.saveSession(artist.username, {
    //    username: artist.username,
    //    _id: artist._id,
    //    avatar: artist.avatar,
    //    isArtist: true,
    //  });
    //});
  });

  return -1;

  for (let i = 0; i < WORKERS_COUNT; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork();
  });

  const httpServer = http.createServer();
  setupMaster(httpServer, {
    loadBalancingMethod: "least-connection", // either "random", "round-robin" or "least-connection"
  });
  const PORT = 3000;

  httpServer.listen(PORT, () =>
    console.log(`server listening at http://localhost:${PORT}`)
  );
} else {
  console.log(`Worker ${process.pid} started`);
  require("./index");
}

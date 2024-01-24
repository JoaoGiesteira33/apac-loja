const cluster = require("cluster");
const http = require("http");
const { setupMaster } = require("@socket.io/sticky");

const Redis = require("ioredis");
const redisClient = new Redis(6379,"redis");
const { RedisSessionStore } = require("./sessionStore");
const sessionStore = new RedisSessionStore(redisClient);
const axios = require("axios");
// Retry interceptor function
const axiosRetry = require('axios-retry').default;

// URL do container user
const API_URL_USER = 'http://api/user';

// Pass the axios instance to the retry function  and call it
axiosRetry(axios, {
  retries: 5, // number of retries
  retryDelay: (retryCount) => {
      console.log(`retry attempt: ${retryCount}`);
      return retryCount * 2000; // time interval between retries
  },
});

const getAllArtists = async () => {

  try {
      const response = await axios.get(`${API_URL_USER}/sellers`, {
        params: {
            limit: 0,
        },
      });
      console.log('API Users:', response.data);
      return response.data.results;
  } catch (error) {
      console.error('Error getting users:', error.message);
      throw "Burro";
  }
};

function main(){
  const WORKERS_COUNT = 1;
  if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // persist session
  getAllArtists().then((artists) => {
    console.log("<<<<<<<<<<<<<<<<<<<<")
    artists.forEach((artist) => {
      sessionStore.saveSession(artist._id, {
        username: artist._id,
        connected: false,
      });
    });

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
  }).catch((error) => {
    console.log(error);
  });

} else {
  console.log(`Worker ${process.pid} started`);
  require("./index");
}
}

main();

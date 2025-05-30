module.exports = {
    mongoURI: "mongodb://127.0.0.1:27017/exampro",
    mongoOptions: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    corsOptions: {
      origin: "http://localhost:5173",
      credentials: true,
    },
    socketOptions: {
      cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true,
      },
      pingTimeout: 60000,
      transports: ["websocket", "polling"],
    },
    JWT_SECRET: "your_jwt_secret", // In production, use an environment variable
  }
  
  
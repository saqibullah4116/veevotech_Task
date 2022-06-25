const app = require("./app");
const dotenv = require("dotenv");
const connectToDataBase = require("./config/database");

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

// excessing port from env file which is in side server/config/config.env
dotenv.config({ path: "server/config/config.env" });

// connection to databse
connectToDataBase();

// storing prot from env file to a varibale so as we are using it multipe time so it would be helpfull
let PORT = process.env.PORT;

// creating our server
const  server =app.listen(PORT, () => {
  console.log(`server is listening at port :${PORT}`);
});

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});
const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/error")


//parsing data using build in function
app.use(express.json());

// Routes import
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");

// whenever a request hits your backend, Express will execute the functions you passed to app.use()
app.use("/api/v1", product);
app.use("/api/v1", user);

//Error handler middleware
app.use(errorMiddleware);


module.exports = app;

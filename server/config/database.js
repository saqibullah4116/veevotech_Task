const mongoose = require("mongoose");

// connecting to mongodb
const connectToDataBase = () => {
    // console.log(` i am here ${process.env.DB_URL}`);
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    //   useCreateIndex: true,
    })
    .then((data) => {
      console.log(`Mondogdb is connected with server:${data.connection.host}`);
    }).catch((err)=>{
        console.log(err)
    });
};

module.exports = connectToDataBase;
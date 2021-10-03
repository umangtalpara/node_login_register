const mongoose = require("mongoose");
mongoose
  .connect(process.env.DB, {
    // useCreateIndex:true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connection successful");
  })
  .catch((e) => {
    console.log(e);
  });

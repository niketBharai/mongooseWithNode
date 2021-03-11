const mongoose = require("mongoose");
const db_url = process.env.DB_URL;

const db = mongoose.connection;

mongoose.connect(db_url, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

db.on("error", (err) => {
  console.log(err);
});

db.once("open", () => {
  console.log("Connected Successfully");
});

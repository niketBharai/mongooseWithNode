require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const port = process.env.PORT;
const db = require("./db");
const app = express();
const EmployeeRouter = require("./routes/employee");
const AuthRouter = require("./routes/auth");

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`APP RUNNING AT --> ${port}`);
});

app.use("/api/employee", EmployeeRouter);
app.use("/api", AuthRouter);

require("dotenv").config();
const express = require("express");
const app = express();
const sequelize = require("./db");

const user = require("./controllers/usercontroller");
const workoutLog = require("./controllers/logcontroller");

sequelize.sync();

app.use(express.json());

app.use("/user", user);
app.use("/log", workoutLog);

app.listen(process.env.PORT, function () {
	console.log(`App is listening on port ${process.env.PORT}`);
});

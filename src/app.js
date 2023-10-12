const express = require("express");
const app = express();
const db = require("./models/index");
const port = 5000;
const boardRouter = require("./routes/boardRouter.js");
const sign = require("./routes/sign.js");
const login = require("./routes/login.js");
const create = require("./routes/create.js");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", boardRouter);
app.use("/api", sign);
app.use("/api", login);
app.use("/api", create);

db.sequelize
  .sync()
  .then(() => {
    console.log("db connect");
  })
  .catch(console.error);

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});

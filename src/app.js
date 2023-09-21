const express = require('express');
const app = express();
const db = require('./models');
const port = 1000;
const boardRouter = require('./routes/boardRouter.js');
const join = require('./routes/join.js');
const login = require('./routes/login.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', boardRouter);
app.use('/api', join);
app.use('/api', login);

db.sequelize
  .sync()
  .then(() => {
    console.log('db connect');
  })
  .catch(console.error);

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});

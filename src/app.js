const express = require('express');
const app = express();
const db = require('./models/index');
const port = 5000;
const boardRouter = require('./routes/boardRouter.js');
const sign = require('./routes/sign.js');
const login = require('./routes/login.js');

const cors = require('cors'); // CORS를 처리하기 위한 미들웨어

// app.use(cors()); // cors이용함
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', boardRouter);
app.use('/api', sign);
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

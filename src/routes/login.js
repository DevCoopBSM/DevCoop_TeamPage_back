const express = require('express');
const router = express.Router();
const { Sequelize, DataTypes } = require('sequelize');

router.use(express.json());

let users = {};

app.post('/api/login', async (req, res) => {
  const id = req.body.id;
  const pw = req.body.pw;

  try {
    const user = await User.findOne({ where: { username: id } });

    if (!user) {
      return res.status(400).send({ message: 'User not found' });
    }

    if (pw === user.password) {
      // 입력된 비밀번호와 저장된 비밀번호가 일치하는지 확인
      // 패스워드가 일치하는 경우 JWT 토큰 생성

      const token = jwt.sign({ id }, 'dldPgmsqhrhtlvek', { expiresIn: '1h' });
      return res.send({ token });
    } else {
      return res.status(400).send({ message: 'Password is incorrect' });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: 'Internal server error' });
  }
});

app.listen(3000, () =>
  console.log('Server is running on port http://127.0.0.1/3000')
);

module.exports = router;

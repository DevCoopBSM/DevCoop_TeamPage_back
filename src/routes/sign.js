require('dotenv').config();
const express = require('express');
const router = express.Router();
const models = require('../models');
const bcrypt = require('bcrypt');

const { ROUNDS } = process.env;
const saltRounds = parseInt(ROUNDS);

router.post('/sign', async (req, res) => {
  const { password, name } = req.body;

  if (!password || !name) {
    return res
      .status(400)
      .send({ error: '비밀번호 혹은 이름이 입력되지 않았습니다' });
  }

  const duplicateUser = await models.user.findOne({
    where: { username: name },
  });

  if (duplicateUser) {
    return res.status(400).json({ error: '이미 존재하는 이름입니다' });
  }

  try {
    const hash = await bcrypt.hash(password, saltRounds);

    await models.user.create({
      password: hash,
      username: name,
    });

    res.status(200).send({ message: '회원 가입이 완료되었습니다' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '회원 가입에 실패하였습니다' });
  }
});

module.exports = router;

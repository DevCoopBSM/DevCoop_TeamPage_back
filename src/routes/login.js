const express = require('express');
const router = express.Router();
const { Sequelize, sequelize, DataTypes } = require('sequelize');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const models = require('../models');
const users = models.user;

router.use(express.json());

router.post('/login', async (req, res) => {
  const name = req.body.name;
  const pw = req.body.pw;

  try {
    const user = await users.findOne({ where: { username: name } });
    const uuid = user.uuid;

    if (!user) {
      return res.status(400).send({ message: 'User not found' });
    }

    if (bcrypt.compareSync(pw, user.password)) {
      // Access Token
      const acc_token = jwt.sign({ uuid }, 'access-token-secret', {
        expiresIn: '1h',
      });

      // Refresh Token
      const ref_token = jwt.sign({ uuid }, 'refresh-token-secret', {
        expiresIn: '7d',
      });

      return res.send({ acc_token, ref_token });
    } else {
      return res.status(400).send({ message: 'Password is incorrect' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Server Error' });
  }
});

module.exports = router;

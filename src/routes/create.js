const express = require('express');
const router = express.Router();
const { Sequelize, sequelize, DataTypes } = require('sequelize');
const models = require('../models');
const boardList = models.board;

router.use(express.json());

router.post('/api/create', async (req, res) => {
  const { id } = req.body;
  try {
    if (!id) {
      res.send({
        message: '관리자 권한을 확인해 주세요.',
      });
    } else {
        const { title, content } = req.body;

        const newBoard = await boardList.create({
          title,
          content,
        });  
        res.send({
          message: '공지글로 등록 하시겠어요?',
        });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || `Create Error (id: ${id} )`,
    });
  }
});

module.exports = router;

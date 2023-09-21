const express = require('express');
const router = express.Router();
const { Sequelize, sequelize, DataTypes } = require('sequelize');
const models = require('../models');
const boardList = models.board;

router.use(express.json());

router.put('/create', async (req, res) => {
  const id = req.params.id;
  const condition = id ? { where: { id: id } } : null;

  boardList
    .update(req.body, condition)
    .then((resultCount) => {
      if (resultCount == 1) {
        res.send({
          message: `정상적으로 게시물이 업데이트 되었습니다. (id: ${id} )`,
        });
      } else {
        res.send({
          message: `Update Error (id: ${id} )`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Update Error (id: ${id} )`,
      });
    });
});

module.exports = router;

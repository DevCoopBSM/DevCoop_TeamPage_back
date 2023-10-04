const express = require("express");
const router = express.Router();
const { Sequelize, sequelize, DataTypes } = require("sequelize");
const models = require("../models");
const boardList = models.board;

router.use(express.json());

router.put("/update/:id", async (req, res) => {
  const id = req.params.id;
  const condition = { where: { board_id: id } };

  try {
    const [resultCount] = await boardList.update(req.body, condition);
    if (resultCount > 0) {
      res.send({
        message: `정상적으로 게시물이 업데이트 되었습니다. (id: ${id} )`,
      });
    } else {
      res.send({
        message: `Update Error (id: ${id} )`,
      });
    }
  } catch (err) {
    res.status(500).send.json({
      message: err.message || `Update Error (id: ${id} )`,
    });
  }
});

router.get("/showboard", async (req, res) => {
  try {
    const postList = await models.board.findAll({
      order: [["board_id", "DESC"]],
    });

    res.send(postList);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "서버 오류" });
  }
});

module.exports = router;

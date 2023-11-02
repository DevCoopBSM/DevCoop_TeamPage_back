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

router.get("/blog", async (req, res) => {
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

router.get("/blog/:board_id", async (req, res) => {
  const board_id = req.params.board_id;
  try {  
    const post = await models.board.findOne({ where: { board_id: board_id } });

    if (!post) {
      res
        .status(404)
        .json({ success: false, message: "게시물을 찾을 수 없습니다" });
    } else {
      res.status(200).json(post);
    }
  } catch (error) {
    res.status(500).json({ success: false, error: "서버 오류" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const deletedBoard = await models.board.destroy({
      where: { board_id: id },
    });

    if (deletedBoard === 1) {
      res.status(200).json({ message: "삭제 완료" });
    } else {
      res.status(404).json({ message: "보드를 찾을 수 없습니다" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "서버 오류" });
  }
});

/*router.post("/create/", async (req, res) => {
  try {
    res.send({
      message: `관리자 권한을 확인해 주세요.`,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || `Create Error`,
    });
  }
});*/

router.post("/create", async (req, res) => {
  try {
    const { title, detail } = req.body;

    const newBoard = await models.board.create({
      title,
      detail,
    });

    if (newBoard === 1) {
      res.send({
        message: `공지글로 등록 하시겠어요?`,
      });
    } else {
      res.send({
        message: `오류`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || `Create Error`,
    });
  }
});


module.exports = router;

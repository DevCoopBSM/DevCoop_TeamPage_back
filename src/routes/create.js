const express = require('express');
const router = express.Router();
const { Sequelize, sequelize, DataTypes } = require('sequelize');
const models = require('../models');
const boardList = models.board;

router.use(express.json());

router.post('/create/:id', async(req, res) => {
  const id = req.params.id;
  try{
    if(!id){
        res.send({
            message: `ID가 일치하지 않습니다. (id: ${id} )`,
          });
    }
    else{
        res.send({
            message: `성공 (id: ${id} )`,
          });
    }
  } catch(err){
    res.status(500).send({
        message: err.message || `Create Error (id: ${id} )`,
      });
  }
});
const { Sequelize, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  const Board = sequelize.define(
    "board",
    {
      board_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: Sequelize.NOW,
      },
      title: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      detail: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
      uuid: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      view_count: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      tableName: "board",
      timestamps: true,
    }
  );

  return Board;
};

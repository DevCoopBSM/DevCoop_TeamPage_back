const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  const Users = sequelize.define(
    'users',
    {
      password: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      username: {
        type: DataTypes.STRING(5),
        allowNull: true,
      },
      uuid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      is_devcoop: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      acc_token: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      ref_token: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
    },
    { tableName: 'users', timestamps: false }
  );

  return Users;
};

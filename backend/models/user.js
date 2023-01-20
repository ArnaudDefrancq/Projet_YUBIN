"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.User.hasMany(models.Post, {
        foreignKey: "user_id",
        onDelete: "CASCADE",
      });
      models.User.hasMany(models.Comment, {
        foreignKey: "user_id",
        onDelete: "CASCADE",
      });
      models.User.hasMany(models.Like, {
        foreignKey: "user_id",
        onDelete: "CASCADE",
      });
      models.User.hasMany(models.Friend, {
        foreignKey: "user_id",
        onDelete: "CASCADE",
      });
    }
  }
  User.init(
    {
      user_pseudo: DataTypes.TEXT,
      user_email: DataTypes.TEXT,
      user_password: DataTypes.TEXT,
      user_image: DataTypes.TEXT,
      user_isAdmin: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Post.belongsTo(models.User, {
        foreignKey: "user_id",
        onDelete: "CASCADE",
      });
      models.Post.hasMany(models.Comment, {
        foreignKey: "post_id",
        onDelete: "CASCADE",
      });
      models.Post.hasMany(models.Like, {
        foreignKey: "post_id",
        onDelete: "CASCADE",
      });
    }
  }
  Post.init(
    {
      post_content: DataTypes.TEXT,
      post_image: DataTypes.TEXT,
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Post",
    }
  );
  return Post;
};

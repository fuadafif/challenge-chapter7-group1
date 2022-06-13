"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user_game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user_game.hasOne(models.user_game_biodata, { foreignKey: "id_user", sourceKey: "id" });
      user_game.hasMany(models.user_game_history, { foreignKey: "id_user", sourceKey: "id" });
      user_game.hasMany(models.user_game_room, { foreignKey: "id_user", sourceKey: "id" });
    }
  }
  user_game.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "user_game",
    }
  );
  return user_game;
};

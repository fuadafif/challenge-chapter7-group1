"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user_game_room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user_game_room.belongsTo(models.user_game, { foreignKey: "id_user", sourceKey: "id" });
    }
  }
  user_game_room.init(
    {
      id_user: DataTypes.INTEGER,
      nama_room: DataTypes.STRING,
      id_P1: DataTypes.STRING,
      id_P2: DataTypes.STRING,
      choice_P1: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
      },
      choice_P2: DataTypes.ARRAY(DataTypes.STRING),
    },
    {
      sequelize,
      modelName: "user_game_room",
    }
  );
  return user_game_room;
};

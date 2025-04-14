const mongoose = require("mongoose");
const {ENTITY_CONST} = require("../consts/entities.const");
const Schema = mongoose.Schema;

const Games = new Schema(
  {
    name: {
      type: String,
    },
    display_name: {
      type: String,
    },
    description: {
      type: String,
    },
    type: {
      type: String,
      enum: Object.values(ENTITY_CONST.GAMES.TYPE),
      default: ENTITY_CONST.GAMES.TYPE.MOBA,
    },
  },
  {
    timestamps: true,
  }
);

const Game = mongoose.models.Game || mongoose.model("Game", Games);

module.exports = Game;

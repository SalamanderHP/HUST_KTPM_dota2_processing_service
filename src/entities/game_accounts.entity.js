const mongoose = require("mongoose");
const {ENTITY_CONST} = require("../consts/entities.const");
const Schema = mongoose.Schema;

const GameAccounts = new Schema(
  {
    ingame: {
      type: String,
      required: true,
    },
    ingame_id: {
      type: String,
    },
    status: {
      type: String,
      required: true,
      enum: Object.values(ENTITY_CONST.ACCOUNT_STATUS),
      default: ENTITY_CONST.ACCOUNT_STATUS.ACTIVE,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    game: {
      type: Schema.Types.ObjectId,
      ref: "Game",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("GameAccount", GameAccounts);

const mongoose = require("mongoose");
const {ENTITY_CONST} = require("../consts/entities.const");
const Schema = mongoose.Schema;

const Matches = new Schema(
  {
    match_id: {
      type: String,
      required: true,
    },
    game_account: {
      type: Schema.Types.ObjectId,
      ref: "GameAccount",
      required: true,
    },
    game: {
      type: Schema.Types.ObjectId,
      ref: "Game",
      required: true,
    },
    match_details: {
      type: Schema.Types.ObjectId,
      ref: "MatchDetail",
    },
  },
  {
    timestamps: true,
  }
);

const Match = mongoose.models.Match || mongoose.model("Match", Matches);

module.exports = Match;

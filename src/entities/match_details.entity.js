const mongoose = require("mongoose");
const {ENTITY_CONST} = require("../consts/entities.const");
const Schema = mongoose.Schema;

const MatcheDetails = new Schema(
  {
    match: {
      type: Schema.Types.ObjectId,
      ref: "Match",
      required: true,
    },
    game: {
      type: Schema.Types.ObjectId,
      ref: "Game",
      required: true,
    },
    match_info: {
      type: Object,
    },
  },
  {
    timestamps: true,
  }
);

const MatchDetail =
  mongoose.models.MatchDetail || mongoose.model("MatchDetail", MatcheDetails);

module.exports = MatchDetail;

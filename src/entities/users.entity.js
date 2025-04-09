const mongoose = require("mongoose");
const {ENTITY_CONST} = require("../consts/entities.const");
const Schema = mongoose.Schema;

const Users = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: Object.values(ENTITY_CONST.USER_STATUS),
      default: ENTITY_CONST.USER_STATUS.ACTIVE,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", Users);

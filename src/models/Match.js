const mongoose = require("../database/index");

const MatchSchema = new mongoose.Schema({
  host: {
    type: String,
    required: true,
  },
  visitor: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  stadium: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  championship: {
    type: String,
    required: true,
  },
  division: {
    type: String,
    required: true,
  },
  round: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Match = mongoose.model("Match", MatchSchema);

module.exports = Match;

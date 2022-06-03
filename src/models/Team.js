const mongoose = require("../database/index");

const TeamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  shield: {
    type: String,
    required: true,
  },
  points: {
    type: Number,
    required: true,
  },
  position: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Team = mongoose.model("Team", TeamSchema);

module.exports = Team;

const mongoose = require("../database/index");

const MatchSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  popular_name: {
    type: String,
    required: true,
  },
  edition: {
    edition_id: {
      type: Number,
      required: true,
    },
    season: {
      type: Number,
      required: true,
    }
  },
  current_round: {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    round: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
    }
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

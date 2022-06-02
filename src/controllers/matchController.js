const Match = require("../models/Match");

module.exports = {
  // Post
  async new(body, response) {
    try {
      const match = await Match.create(body);
      return response.status(200).json(match);
    } catch (error) {
      return response.status(500).json({
        error: error.message,
        message: "Request to add new match failed.",
      });
    }
  },

  // Delete
  async delete(request, response) {
    try {
      const match = await Match.deleteOne({ _id: request.params.id });
      return response.status(200).json(match);
    } catch (error) {
      return response.status(500).json({
        error: error.message,
        message: "Request to delete match failed.",
      });
    }
  },

  // Delete
  async get(request, response) {
    try {
      const matches = await Match.find();
      return response.status(200).json(matches);
    } catch (error) {
      return response.status(500).json({
        error: error.message,
        message: "Request to find all matches failed.",
      });
    }
  },
};

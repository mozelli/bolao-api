const Team = require("../models/Team");

module.exports = {
  // Post
  async new(body, response) {
    try {
      const team = await Team.create(body);
      return response.status(200).json(team);
    } catch (error) {
      return response.status(500).json({
        error: error.message,
        message: "Request to add new team failed.",
      });
    }
  },

  // Delete
  async delete(request, response) {
    try {
      const team = await Team.deleteOne({ _id: request.params.id });
      return response.status(200).json(team);
    } catch (error) {
      return response.status(500).json({
        error: error.message,
        message: "Request to delete team failed.",
      });
    }
  },

  // Delete
  async get(request, response) {
    try {
      const teams = await Team.find();
      return response.status(200).json(teams);
    } catch (error) {
      return response.status(500).json({
        error: error.message,
        message: "Request to find all teams failed.",
      });
    }
  },
};

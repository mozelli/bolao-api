const User = require("../models/User");

module.exports = {
  // Post
  async new(body, response) {
    try {
      const user = await User.create(body);
      return response.status(200).json(user);
    } catch (error) {
      return response.status(500).json({
        error: error.message,
        message: "Request to add new user failed.",
      });
    }
  },

  // Delete
  async delete(request, response) {
    try {
      const user = await User.deleteOne({ id: request.params.id });
      return response.status(200).json(user);
    } catch (error) {
      return response.status(500).json({
        error: error.message,
        message: "Request to delete user failed.",
      });
    }
  },
};

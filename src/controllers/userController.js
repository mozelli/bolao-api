const User = require("../models/User");

module.exports = {
  // Post
  async new(body, response) {
    try {
      const birthday = Date(body.year, body.month, body.day, 0, 0, 0, 0);
      let data = {
        name: body.name,
        lastname: body.lastname,
        birthday,
        email: body.email,
        password: body.password,
      };
      const user = await User.create(data);
      return response.status(200).json({ email: user.email, id: user.id });
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

  // Delete
  async get(request, response) {
    try {
      const users = await User.find();
      return response.status(200).json(users);
    } catch (error) {
      return response.status(500).json({
        error: error.message,
        message: "Request to find all users failed.",
      });
    }
  },
};

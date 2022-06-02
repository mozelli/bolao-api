const { db } = require("../database/index.js");
const User = db.collection("users");

module.exports = {
  async new(request, response) {
    try {
      const user = await User.add(request.body);
      return response.status(200).json(user);
    } catch (error) {
      return response.status(200).json({
        error: error.message,
        message: "The create new user request failed.",
      });
    }
  },
};

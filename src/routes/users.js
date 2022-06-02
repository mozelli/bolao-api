const app = require("express");
const Router = app.Router();
const UserController = require("../controllers/userController");

Router.post("/", (request, response) =>
  UserController.new(request.body, response)
);

module.exports = Router;

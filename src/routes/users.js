const app = require("express");
const Router = app.Router();
const UserController = require("../controllers/userController");

Router.post("/", (request, response) =>
  UserController.new(request.body, response)
);

Router.delete("/:id", (request, response) =>
  UserController.delete(request, response)
);

Router.get("/", (request, response) =>
  UserController.delete(request, response)
);

module.exports = Router;

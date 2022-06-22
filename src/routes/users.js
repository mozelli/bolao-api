const app = require("express");
const Router = app.Router();
const UserController = require("../controllers/userController");
const authMeddleware = require("../middlewares/auth");

Router.post("/", (request, response) => UserController.new(request, response));

Router.get("/emailConfirmation/:token", (request, response) =>
  UserController.emailConfirmation(request, response)
);

Router.post("/authenticate", (request, response) => {
  UserController.userAuthenticate(request, response);
});

Router.use(authMeddleware);

Router.delete("/:id", (request, response) =>
  UserController.delete(request, response)
);

Router.get("/", (request, response) => UserController.get(request, response));

module.exports = Router;

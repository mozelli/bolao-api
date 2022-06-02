const express = require("express");
const Router = express.Router();
const MatchController = require("../controllers/matchController");

Router.post("/", (request, response) => {
  MatchController.new(request.body, response);
});

Router.delete("/:id", (request, response) =>
  MatchController.delete(request, response)
);

Router.get("/", (request, response) => MatchController.get(request, response));

module.exports = Router;

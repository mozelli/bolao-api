const express = require("express");
const Router = express.Router();
const TeamController = require("../controllers/teamController");

Router.post("/", (request, response) => {
  TeamController.new(request.body, response);
});

Router.post("/scrapTeams", (request, response) => {
  TeamController.scrapTable(request.body, response);
});

Router.delete("/:id", (request, response) =>
  TeamController.delete(request, response)
);

Router.get("/", (request, response) => TeamController.get(request, response));

module.exports = Router;

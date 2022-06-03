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
  async scrapTable(request, response) {
    const axios = require("axios");
    const cheerio = require("cheerio");
    const sanitizer = require("../libs/sanitizer");

    const urlTable =
      "https://www.terra.com.br/esportes/futebol/brasileiro-serie-b/tabela/";

    // Get the HTML from the web site
    axios(urlTable)
      .then((responseHTML) => {
        const html = responseHTML.data;
        const $ = cheerio.load(html);
        let teams = [];

        // Cheerio get the data from HTML
        $("tr", html).each(function () {
          const row = $(this).html();

          let position = $("td.position", row).text();
          let shield = $("td.shield", row).find("img").attr("src");
          let name = $("td.team-name", row).text();
          let points = $("td.points", row).text();

          name = sanitizer.cleanTeamValues(name);

          teams.push({
            position,
            shield,
            name,
            points,
          });
        });
        teams.shift();

        // Response return the success result
        async function populateDB() {
          const result = await Team.insertMany(teams);
          return response.status(200).json(result);
        }
        populateDB();
      })
      .catch((error) => {
        // Response return the failed result
        return response.status(500).json({
          error: error.message,
          message: "Axios request failed.",
        });
      });
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

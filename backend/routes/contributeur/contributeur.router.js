const express = require("express");
const {
  listContributeur,
  addContrib,
  filterListContrib,
} = require("../../controllers/contributeur/contributeur.controller");
const contribRouter = express.Router();
contribRouter.route("/").post(addContrib).get(listContributeur);
contribRouter.route("/filter/:value").get(filterListContrib);
module.exports = contribRouter;

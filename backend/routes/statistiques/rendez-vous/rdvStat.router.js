const express = require("express");
const {
  getRdvStats,
} = require("../../../controllers/statistiques/rende-vous/rdvStat.controller");

const rdvStatsRouter = express.Router();

rdvStatsRouter.route("/rdv/total").get(getRdvStats);
module.exports = rdvStatsRouter;

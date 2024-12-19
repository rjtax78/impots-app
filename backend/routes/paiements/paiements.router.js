const express = require("express");
const {
  listPaiements,
} = require("../../controllers/paiements/paiements.controller");

const paiementRouter = express.Router();

paiementRouter.route("/").get(listPaiements);
module.exports = paiementRouter;

const express = require("express");
const {
  getPaiements,
  createPaiement,
} = require("../../app-controllers/paiements/paiements.controllers");

const paimentsRouter = express.Router();

paimentsRouter.route("/").post(createPaiement).get(getPaiements);
// paimentsRouter.route("/filter/:value").get(filterListContrib);
module.exports = paimentsRouter;

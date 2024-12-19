const express = require("express");
const {
  getRendezVous,
  createRendezVous,
  updateRendezVous,
  deleteRendezVous,
} = require("../../app-controllers/rendez_vous/rendez_vous.controllers");

const rdvRouter = express.Router();

rdvRouter.route("/").post(createRendezVous).get(getRendezVous);
rdvRouter.route("/:id").put(updateRendezVous).delete(deleteRendezVous);
module.exports = rdvRouter;

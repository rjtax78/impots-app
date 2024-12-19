const express = require("express");
const {
  checkRdv,
  rdvList,
  updateRdv,
  removeRdv,
  rejectRdv,
} = require("../../controllers/rendez-vous/rdv.controller");

const rdvRouter = express.Router();

rdvRouter.route("/").post(checkRdv).get(rdvList);
rdvRouter.route("/:rdvId").put(updateRdv).delete(removeRdv);
rdvRouter.route("/rejectRdv/:rdvId").put(rejectRdv);
module.exports = rdvRouter;

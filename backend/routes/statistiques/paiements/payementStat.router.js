const express = require("express");
const {
  getPaymentStats,
  payementWithEcheance,
} = require("../../../controllers/statistiques/paiements/payementStat.controller");
const payementStatsRouter = express.Router();

payementStatsRouter.route("/paiements/total").get(getPaymentStats);
payementStatsRouter.route("/paiements/echeance").get(payementWithEcheance);
// payementStatsRouter.route("/:rdvId").put(updateRdv).delete(removeRdv);
// payementStatsRouter.route("/rejectRdv/:rdvId").put(rejectRdv);
module.exports = payementStatsRouter;

const express = require("express");
const {
  listImpots,
  addImpot,
} = require("../../controllers//impots/impot.controller");

const impotsRouter = express.Router();

impotsRouter.route("/").get(listImpots).post(addImpot);
module.exports = impotsRouter;

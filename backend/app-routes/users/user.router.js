const express = require("express");
const {
  getUtilisateurs,
  createUtilisateur,
} = require("../../app-controllers/users/user.controllers");

const usersRouter = express.Router();

usersRouter.route("/").post(createUtilisateur).get(getUtilisateurs);
// usersRouter.route("/filter/:value").get(filterListContrib);
module.exports = usersRouter;

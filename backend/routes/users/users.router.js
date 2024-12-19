const express = require("express");
const {
  getUsersList,
  creatUser,
  login,
  lougout,
} = require("../../controllers/users/users.controller");
const { protect, admin } = require("../../middleware/authMiddleware");

const usersRouter = express.Router();

usersRouter.route("/").get(admin, getUsersList).post(admin, creatUser);
usersRouter.route("/login").post(login);
usersRouter.route("/logout").post(lougout);

module.exports = usersRouter;

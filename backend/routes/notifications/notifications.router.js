const express = require("express");
const { sendNotif } = require("../../controllers/notifications/notifications.controller");


const notifRouter = express.Router();

notifRouter.route("/").post(sendNotif);

module.exports = notifRouter;


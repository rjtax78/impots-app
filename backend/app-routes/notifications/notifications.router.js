const express = require("express");
const {
  getNotifications,
  createNotification,
} = require("../../app-controllers/notifications/notifications.controllers");

const notifRouter = express.Router();

notifRouter.route("/").post(createNotification).get(getNotifications);
// notifRouter.route("/filter/:value").get(filterListContrib);
module.exports = notifRouter;

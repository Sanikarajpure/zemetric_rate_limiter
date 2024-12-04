const express = require("express");
const smsRoute = require("./smsRoute");
const router = express.Router();

const routesIndex = [
  {
    path: "/sms",
    route: smsRoute,
  },
];

routesIndex.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;

const express = require("express");
const rateLimiter = require("../middlewares/rateLimiter");
const smsController = require("../controllers/smsCtrl");
const rateLimitController = require("../controllers/rateLimitCtrl");
const router = express.Router();

// POST /api/sms/
router.post("/", rateLimiter(), smsController.sendSms);

// GET /api/sms/stats
router.get("/stats/:phoneNumber/", smsController.getSmsStatistics);

// GET /api/sms/stats/violations
router.get(
  "/stats/violations/:phoneNumber/",
  rateLimitController.getRateLimitViolations
);

module.exports = router;

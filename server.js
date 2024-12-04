const express = require("express");
const app = express();
const cors = require("cors");
const xss = require("xss-clean");
require("dotenv").config();
const routes = require("./routes");
const { handleError, convertToApiError } = require("./utils/apiError");
const sequelize = require("./db");

// CORS
app.use(
  cors({
    origin: process.env.ORIGIN_FOR_CORS,
    methods: ["POST", "GET", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Authorization", "Content-Type"],
    credentials: true,
  })
);

//BODY PARSER
app.use(express.json());

//SANITIZE JSON
app.use(xss());

//SYNC DATABASE
sequelize
  .sync()
  .then(() => {
    console.log("Database synced successfully.");
  })
  .catch((err) => {
    console.error("Error syncing database:", err);
  });

//ROUTES
app.use("/api", routes);

//API ERROR HANDLING
app.use(convertToApiError);
app.use((err, req, res, next) => {
  handleError(err, res);
});

const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

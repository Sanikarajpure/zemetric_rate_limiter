const express = require("express");
const app = express();
const cors = require("cors");
const xss = require("xss-clean");
require("dotenv").config();

// CORS
if (process.env.NODE_ENV === "production") {
  app.use(
    cors({
      origin: process.env.ORIGIN_FOR_CORS,
      methods: ["POST", "GET", "PUT", "DELETE"],
      credentials: true,
    })
  );
} else {
  app.use(
    cors({
      origin: "*",
      methods: ["POST", "GET", "PUT", "DELETE", "PATCH"],
      allowedHeaders: ["Authorization", "Content-Type"],
      credentials: true,
    })
  );
}

//BODY PARSER
app.use(express.json());

//SANITIZE JSON
app.use(xss());

const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
dotenv.config();
const app = express();
const auth = require("./route/api/auth");
const category = require("./route/api/category");
const product = require("./route/api/product");
const PORT = 5000;
const { errorMiddleware } = require("./middleware/errorMiddleware");

const cors = require("cors");

const { baseAuth } = require("./middleware/baseAuth");

//config env

require("./sql/mysql.js");
app.use(express.json());
app.use(cors());

//route
app.use("/api/v1/auth", auth);
app.use("/api/v1/category", category);
app.use("/api/v1/product", product);

app.get("/test", baseAuth);
//viet duoi route
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`server is running in port ${PORT}`.yellow.bgBlack);
});

require("dotenv").config();

const connectDb = require("./db/db")
const express = require("express");
const app = express();
connectDb()

app.use(express.json());



const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});

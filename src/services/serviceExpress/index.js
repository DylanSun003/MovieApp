const Joi = require("joi");
const cors = require("cors");

const mongoose = require("mongoose");
const genres = require("./routes/genreRoute");
const movies = require("./routes/movieRoute");
const customers = require("./routes/customerRoute");
const rentals = require("./routes/rentalRoute");
const registers = require("./routes/registerRoute");
const authos = require("./routes/authoRoute");

const express = require("express");
const app = express();

mongoose
  .connect("mongodb://localhost/movieApp")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

app.use(cors());
app.use(express.json());
app.use("/api/genres", genres);
app.use("/api/movies", movies);
app.use("/api/customers", customers);
app.use("/api/rentals", rentals);
app.use("/api/registers", registers);
app.use("/api/authos", authos);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

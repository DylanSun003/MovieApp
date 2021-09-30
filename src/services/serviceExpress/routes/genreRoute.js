const express = require("express");
const router = express.Router();
const { Genres, validateGenre } = require("../models/genre");

router.get("/", async (request, response) => {
  const genres = await Genres.find().lean();
  response.send(genres);
});

router.get("/:id", async (request, response) => {
  const genreSearch = await Genres.findById({ _id: request.params.id });
  if (genreSearch) response.send(genreSearch);
  else response.status(404).send("This course is not in the database");
});

router.post("/", async (request, response) => {
  const error = validateGenre(request);
  if (error) {
    response.status(400).send(error.message);
    return;
  }
  // update the course
  // return accepted status
  let genre = new Genres({ name: request.body.name });
  genre = await genre.save();
  response.send(genre);
});

router.put("/:id", async (request, response) => {
  // validateGenre the update,
  // if not send 400
  const error = validateGenre(request);
  if (error) {
    response.status(400).send(error.message);
    return;
  }
  // check if the course is in the database,
  // if not send 404
  try {
    // update the course
    // return accepted status
    const genreSearch = await Genres.findByIdAndUpdate(
      { _id: request.params.id },
      { $set: { name: request.body.name } },
      { new: true }
    );
    response.send("Genre name " + genreSearch.name + " has been updated");
  } catch (exp) {
    response
      .status(404)
      .send(
        `The genre with id: ${request.params.id} try to update is not in the database`
      );
    return;
  }
});

router.delete("/:id", async (request, response) => {
  try {
    const genreSearch = await Genres.findById({ _id: request.params.id });
    await Genres.deleteOne({ _id: request.params.id });
    response.send("Genre name " + genreSearch.name + " has been deleted");
  } catch (exp) {
    response
      .status(404)
      .send(
        `The genre with id: ${request.params.id} try to delete is not in the database`
      );
    return;
  }
});

module.exports = router;

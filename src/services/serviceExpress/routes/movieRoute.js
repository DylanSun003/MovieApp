const express = require("express");
const router = express.Router();
const { Genres } = require("../models/genre");
const { Movies, validateMovie } = require("../models/movie");

router.get("/", async (request, response) => {
  const movies = await Movies.find().lean();
  response.send(movies);
});

router.get("/:id", async (request, response) => {
  const movieSearch = await Movies.findById({ _id: request.params.id });
  if (movieSearch) response.send(movieSearch);
  else {
    return response.status(404).send("This movie is not in the database");
  }
});

router.post("/", async (request, response) => {
  const error = validateMovie(request);
  if (error) {
    response.status(400).send(error.message);
    return;
  }
  const genre = await Genres.findById(request.body.genreId);
  if (!genre)
    return response
      .status(400)
      .send(`Genre id ${request.body.genreId} does not exist in the database`);
  // update the course
  // return accepted status
  let movie = new Movies({
    title: request.body.title,
    genre: { _id: genre._id, name: genre.name },
    numberInStock: request.body.numberInStock,
    dailyRentalRate: request.body.dailyRentalRate,
    imgURL: request.body.imgURL,
    glanceImgURL: request.body.glanceImgURL,
  });
  movie = await movie.save();
  response.send(movie);
});

router.put("/:id", async (request, response) => {
  // validateMovie the update,
  // if not send 400
  const error = validateMovie(request);
  if (error) {
    response.status(400).send(error.message);
    return;
  }
  // check if the course is in the database,
  // if not send 404
  try {
    // update the course
    // return accepted status
    const genre = await Genres.findById(request.body.genreId);
    if (!genre)
      return response
        .status(400)
        .send(
          `Genre id ${request.body.genreId} does not exist in the database`
        );
    const movieSearch = await Movies.findByIdAndUpdate(
      { _id: request.params.id },
      {
        $set: {
          title: request.body.title,
          genre: { _id: genre._id, name: genre.name },
          numberInStock: request.body.numberInStock,
          dailyRentalRate: request.body.dailyRentalRate,
        },
      },
      { new: true }
    );
    response.send("Movie name " + movieSearch.title + " has been updated");
  } catch (exp) {
    response
      .status(404)
      .send(
        `The movie with id: ${request.params.id} try to update is not in the database`
      );
    return;
  }
});

router.delete("/:id", async (request, response) => {
  try {
    const movieSearch = await Movies.findById({ _id: request.params.id });
    await Movies.deleteOne({ _id: request.params.id });
    response.send("movie name " + movieSearch.title + " has been deleted");
  } catch (exp) {
    response
      .status(404)
      .send(
        `The movie with id: ${request.params.id} try to delete is not in the database`
      );
    return;
  }
});

// function getMovie(id) {
//   return movies.find((m) => m._id === id);
// }

// function saveMovie(movie) {
//   let movieInDb = movies.find((m) => m.title === movie.name) || {};
//   movieInDb.title = movie.name;
//   movieInDb.genre = genresAPI.genres.find((g) => g.name === movie.genre);
//   movieInDb.numberInStock = movie.stock;
//   movieInDb.dailyRentalRate = movie.rate;
//   movieInDb.isLike = false;

//   if (!movieInDb._id) {
//     movieInDb._id = "" + Date.now();
//     movies.push(movieInDb);
//   }
//   console.log(movieInDb);
//   return movieInDb;
// }

// function deleteMovie(id) {
//   let movieInDb = movies.find((m) => m._id === id);
//   movies.splice(movies.indexOf(movieInDb), 1);
//   return movieInDb;
// }

// function setLike(id) {
//   let movieInDb = movies.find((m) => m._id === id);
//   movieInDb.isLike = !movieInDb.isLike;
// }

module.exports = router;
// exports.getMovie = getMovie;
// exports.saveMovie = saveMovie;
// exports.deleteMovie = deleteMovie;
// exports.setLike = setLike;

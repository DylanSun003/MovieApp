const Joi = require("joi");
const mongoose = require("mongoose");
const { genreSchema } = require("./genre");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 1,
    required: true,
  },
  genre: {
    type: genreSchema,
    required: true,
  },
  numberInStock: {
    type: Number,
    min: 0,
    max: 255,
    required: true,
  },
  dailyRentalRate: {
    type: Number,
    required: true,
    min: 0,
    max: 255,
  },
  imgURL: {
    type: String,
    default: "",
    // required: true,
  },
  glanceImgURL: {
    type: String,
    default: "",
    // required: true,
  },
});

const Movies = mongoose.model("Movies", movieSchema);

const validateMovie = (request) => {
  const schema = Joi.object({
    title: Joi.string().min(1).required(),
    genreId: Joi.string().required(),
    numberInStock: Joi.number().min(0).required(),
    dailyRentalRate: Joi.number().min(0).required(),
    imgURL: Joi.string(),
    glanceImgURL: Joi.string(),
  });
  const { error } = schema.validate(request.body);
  return error;
};

exports.movieSchema = movieSchema;
exports.Movies = Movies;
exports.validateMovie = validateMovie;

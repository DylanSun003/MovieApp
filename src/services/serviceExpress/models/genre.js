const Joi = require("joi");
const mongoose = require("mongoose");

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
  },
});

const Genres = mongoose.model("Genres", genreSchema);

const validateGenre = (request) => {
  const schema = Joi.object({
    name: Joi.string().min(5).required(),
  });
  const { error } = schema.validate(request.body);
  return error;
};

exports.genreSchema = genreSchema;
exports.Genres = Genres;
exports.validateGenre = validateGenre;

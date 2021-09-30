const Joi = require("joi").extend(require("@hapi/joi-date"));
const mongoose = require("mongoose");
const { movieSchema } = require("./movie");
const { customerSchema } = require("./customer");

const rentalSchema = new mongoose.Schema({
  movie: {
    type: new mongoose.Schema({
      title: {
        type: String,
        required: true,
        minlength: 1,
      },
      dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
      },
    }),
    required: true,
  },

  customer: {
    type: new mongoose.Schema({
      name: {
        type: String,
        required: true,
      },
    }),
    required: true,
  },

  dateOfRent: {
    type: String,
    required: true,
  },

  dateOfReturn: {
    type: String,
  },

  rentalFee: {
    type: Number,
    min: 0,
  },
});

const Rentals = mongoose.model("Rentals", rentalSchema);

const validateRental = (request) => {
  const schema = Joi.object({
    movieID: Joi.string().required(),
    customerID: Joi.string().required(),
    dateOfRent: Joi.date().format("YYYY/MM/DD").required(),
  });
  const { error } = schema.validate(request.body);
  return error;
};

const validateRentalRentAndReturn = (request) => {
  //   let rentalSearch = await Rentals.findById({ _id: request.params.id });
  //   let dateOfRent = new Date(rentalSearch.dateOfRent);
  //   console.log(dateOfRent);
  const schema = Joi.object({
    dateOfRent: Joi.date().format("YYYY/MM/DD").required(),
    dateOfReturn: Joi.date()
      .format("YYYY/MM/DD")
      .greater(Joi.ref("dateOfRent"))
      .required(),
  });
  const { error } = schema.validate(request.body);
  return error;
};

const calculateRentalFee = (rentalDetail) => {
  let rentalReturnYY =
    rentalDetail.dateOfReturn.substring(0, 4) -
    rentalDetail.dateOfRent.substring(0, 4);
  let rentalReturnMM =
    rentalDetail.dateOfReturn.substring(5, 7) -
    rentalDetail.dateOfRent.substring(5, 7);
  let rentalReturnDD =
    rentalDetail.dateOfReturn.substring(8, 10) -
    rentalDetail.dateOfRent.substring(8, 10);
  let rentalFee =
    rentalDetail.movie.dailyRentalRate *
    (rentalReturnYY * 365 + rentalReturnMM * 30 + rentalReturnDD);
  if (rentalReturnMM < 0) rentalFee -= 25;
  return rentalFee;
};

exports.rentalSchema = rentalSchema;
exports.Rentals = Rentals;
exports.validateRental = validateRental;
exports.validateRentalRentAndReturn = validateRentalRentAndReturn;
exports.calculateRentalFee = calculateRentalFee;

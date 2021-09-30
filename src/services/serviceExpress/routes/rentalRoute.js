const express = require("express");
const router = express.Router();
const { Customers } = require("../models/customer");
const { Movies } = require("../models/movie");
const {
  Rentals,
  validateRental,
  validateRentalRentAndReturn,
  calculateRentalFee,
} = require("../models/rental");

router.get("/", async (request, response) => {
  const rental = await Rentals.find().lean().sort("-dateOfRent");
  response.send(rental);
});

router.get("/:id", async (request, response) => {
  const rentalSearch = await Rentals.findById({ _id: request.params.id });
  if (rentalSearch) response.send(rentalSearch);
  else response.status(404).send("This rental is not in the database");
});

router.post("/", async (request, response) => {
  const error = validateRental(request);
  if (error) {
    response.status(400).send(error.message);
    return;
  }
  // update the course
  // return accepted status
  const customer = await Customers.findById(request.body.customerID);
  const movie = await Movies.findById(request.body.movieID);

  if (!movie)
    return response
      .status(400)
      .send(`Movie id ${request.body.movieID} does not exist in the database`);
  if (movie.numberInStock === 0)
    return response
      .status(400)
      .send(`Movie id ${request.body.movieID} is out of stock`);
  if (!customer)
    return response
      .status(400)
      .send(
        `Customer id ${request.body.customerID} does not exist in the database`
      );

  let rental = new Rentals({
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
    },
    customer: {
      _id: customer._id,
      name: customer.name,
    },
    dateOfRent: request.body.dateOfRent,
    dateOfReturn: null,
    rentalFee: null,
  });
  movie.numberInStock--;
  movie.save();
  rental = await rental.save();
  response.send(rental);
});

router.put("/:id", async (request, response) => {
  // validateMovie the update,
  // if not send 400
  const error = validateRentalRentAndReturn(request);
  if (error) {
    response.status(400).send(error.message);
    return;
  }
  // check if the rental is in the database,
  // if not send 404
  try {
    // update the course
    // return accepted status

    const rentalSearch = await Rentals.findByIdAndUpdate(
      { _id: request.params.id },
      {
        $set: {
          dateOfReturn: request.body.dateOfReturn,
          //   rentalFee: calculateRentalFee(rentalSearch),
        },
      },
      { new: true }
    );
    response.send("Rental " + rentalSearch._id + "'s info has been returned");
    // response.send("Rental Fee will be: " + rentalSearch.rentalFee);
  } catch (exp) {
    response
      .status(404)
      .send(
        `The rental with id: ${request.params.id} try to update is not in the database`
      );
    return;
  }
  const rentalFinding = await Rentals.findById({ _id: request.params.id });
  const movie = await Movies.findById(rentalFinding.movie._id);
  movie.numberInStock++;
  movie.save();
  rentalFinding.rentalFee = calculateRentalFee(rentalFinding);
  await rentalFinding.save();
});

router.delete("/:id", async (request, response) => {
  try {
    const rentalSearch = await Rentals.findById({ _id: request.params.id });
    await Rentals.deleteOne({ _id: request.params.id });
    response.send("Rental id:" + rentalSearch._id + " has been deleted");
  } catch (exp) {
    response
      .status(404)
      .send(
        `The rental with id: ${request.params.id} try to delete is not in the database`
      );
    return;
  }
});

module.exports = router;

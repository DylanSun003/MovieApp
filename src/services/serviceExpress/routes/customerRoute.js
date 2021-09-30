const express = require("express");
const router = express.Router();
const { Customers, validateCustomer } = require("../models/customer");

router.get("/", async (request, response) => {
  const customers = await Customers.find().lean();
  response.send(customers);
});

router.get("/:id", async (request, response) => {
  const customerSearch = await Customers.findById({ _id: request.params.id });
  if (customerSearch) response.send(customerSearch);
  else response.status(404).send("This customer is not in the database");
});

router.post("/", async (request, response) => {
  const error = validateCustomer(request);
  if (error) {
    response.status(400).send(error.message);
    return;
  }
  // update the course
  // return accepted status
  let customer = new Customers({
    name: request.body.name,
    email: request.body.email,
    phone: request.body.phone,
  });
  customer = await customer.save();
  response.send(customer);
});

router.put("/:id", async (request, response) => {
  // validateMovie the update,
  // if not send 400
  const error = validateCustomer(request);
  if (error) {
    response.status(400).send(error.message);
    return;
  }
  // check if the course is in the database,
  // if not send 404
  try {
    // update the course
    // return accepted status
    const customerSearch = await Customers.findByIdAndUpdate(
      { _id: request.params.id },
      {
        $set: {
          name: request.body.name,
          email: request.body.email,
          phone: request.body.phone,
        },
      },
      { new: true }
    );
    response.send(
      "Customer name " + customerSearch.name + "'s info has been updated"
    );
  } catch (exp) {
    response
      .status(404)
      .send(
        `The customer with id: ${request.params.id} try to update is not in the database`
      );
    return;
  }
});

router.delete("/:id", async (request, response) => {
  try {
    const customerSearch = await Customers.findById({ _id: request.params.id });
    await Customers.deleteOne({ _id: request.params.id });
    response.send("Customer name " + customerSearch.name + " has been deleted");
  } catch (exp) {
    response
      .status(404)
      .send(
        `The customer with id: ${request.params.id} try to delete is not in the database`
      );
    return;
  }
});

module.exports = router;

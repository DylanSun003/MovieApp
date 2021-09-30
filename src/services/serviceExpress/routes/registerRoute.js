const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const { Users, validateRegister } = require("../models/register");

router.get("/", async (request, response) => {
  const users = await Users.find().lean();
  response.send(users);
});

router.get("/:id", async (request, response) => {
  const userSearch = await Users.findById({ _id: request.params.id });
  if (userSearch) response.send(userSearch);
  else response.status(404).send("This user is not in the database");
});

router.post("/", async (request, response) => {
  const error = validateRegister(request);
  if (error) {
    response.status(400).send(error.message);
    return;
  }
  // update the course
  // return accepted status
  let user = await Users.findOne({
    email: request.body.email,
  });
  if (user) {
    response.status(400).send("User already exist under this email");
    return;
  }
  user = await Users.findOne({
    phone: request.body.phone,
  });
  if (user) {
    response.status(400).send("User already exist under this phone");
    return;
  }

  user = new Users({
    name: request.body.name,
    email: request.body.email,
    phone: request.body.phone,
    password: request.body.password,
  });
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  user = await user.save();
  response.send(user);
});

router.put("/:id", async (request, response) => {
  // validateMovie the update,
  // if not send 400
  const error = validateRegister(request);
  if (error) {
    response.status(400).send(error.message);
    return;
  }
  // check if the course is in the database,
  // if not send 404
  try {
    // update the course
    // return accepted status
    const userSearch = await Users.findByIdAndUpdate(
      { _id: request.params.id },
      {
        $set: {
          name: request.body.name,
          email: request.body.email,
          phone: request.body.phone,
          password: request.body.password,
        },
      },
      { new: true }
    );
    response.send("Users name " + userSearch.name + " has been updated");
  } catch (exp) {
    response
      .status(404)
      .send(
        `The user with id: ${request.params.id} try to update is not in the database`
      );
    return;
  }
});

router.delete("/:id", async (request, response) => {
  try {
    const userSearch = await Users.findById({ _id: request.params.id });
    await Users.deleteOne({ _id: request.params.id });
    response.send("User name " + userSearch.name + " has been deleted");
  } catch (exp) {
    response
      .status(404)
      .send(
        `The user with id: ${request.params.id} try to delete is not in the database`
      );
    return;
  }
});

module.exports = router;

const express = require("express");
const Joi = require("joi").extend(require("@hapi/joi-date"));
const bcrypt = require("bcrypt");
const router = express.Router();
const { Users } = require("../models/register");

router.post("/", async (request, response) => {
  const error = validateAuth(request);
  if (error) {
    response.status(400).send(error.message);
    return;
  }

  let user = await Users.findOne({
    email: request.body.email,
  });
  if (!user) {
    response.status(400).send("Invalid email/password");
    return;
  }

  let validPassword = await bcrypt.compare(
    request.body.password,
    user.password
  );

  if (!validPassword) {
    response.status(400).send("Invalid email/password");
    return;
  }
  response.send("Logging successfully!");
});

const validateAuth = (request) => {
  const schema = Joi.object({
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string().required(),
  });
  const { error } = schema.validate(request.body);
  return error;
};

module.exports = router;

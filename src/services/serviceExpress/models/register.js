const Joi = require("joi").extend(require("@hapi/joi-date"));
const mongoose = require("mongoose");

const registerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  phone: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Users = mongoose.model("Users", registerSchema);

const validateRegister = (request) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    password: Joi.string().required(),
  });
  const { error } = schema.validate(request.body);
  return error;
};

exports.registerSchema = registerSchema;
exports.Users = Users;
exports.validateRegister = validateRegister;

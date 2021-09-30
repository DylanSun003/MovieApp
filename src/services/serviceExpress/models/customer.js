const Joi = require("joi");
const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
  },
  email: {
    type: String,
    required: true,
    minlength: 3,
  },
  phone: {
    type: String,
    required: true,
  },
});

const Customers = mongoose.model("Customers", customerSchema);

const validateCustomer = (request) => {
  const schema = Joi.object({
    name: Joi.string().min(2).required(),
    email: Joi.string().min(2).required(),
    phone: Joi.string().required(),
  });
  const { error } = schema.validate(request.body);
  return error;
};

exports.customerSchema = customerSchema;
exports.Customers = Customers;
exports.validateCustomer = validateCustomer;

const validator = require('validator');

module.exports = (value, helper) => {
  if (validator.isURL(value, { require_protocol: true })) {
    return value;
  }
  return helper.message('Invalid URL');
};

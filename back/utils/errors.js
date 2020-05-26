const Errors = {
  generic: {
    default: "Something went wrong.",
  },
  auth: {
    missingValue: "Filds: email and password can't be empty.",
    userNotFound: "There isn't a user registered with that email.",
    incorrectPassword: "Incorrect password.",
  },
  user: {
    missingValue: "Fields: name, email and password can't be empty.",
  },
};

module.exports = Errors;

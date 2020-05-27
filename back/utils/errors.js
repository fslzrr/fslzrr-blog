const Errors = {
  generic: {
    default: "Something went wrong.",
    unauthorized: "You're unauthorized.",
  },
  auth: {
    missingValue: "Filds: email and password can't be empty.",
    userNotFound: "There isn't a user registered with that email.",
    incorrectPassword: "Incorrect password.",
  },
  user: {
    missingValue: "Fields: name, email and password can't be empty.",
  },
  post: {
    missingValue: "Fields: title and content can't be empty.",
  },
  comment: {
    missingValue: "Field: content can't be empty.",
  },
};

module.exports = Errors;

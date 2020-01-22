// Validation for Posts
exports.createPostValidator = (req, res, next) => {
  // title
  req.check("title", "Write a title").notEmpty();
  req.check("title", "Title must be between 4 to 150 characters").isLength({
    min: 4,
    max: 150
  });
  // body
  req.check("body", "Body cannot be empty").notEmpty();
  req.check("body", "Body must be between 4 to 2000 characters").isLength({
    min: 4,
    max: 2000
  });
  // check for errors
  const errors = req.validationErrors();
  // if error show the first one as they happen
  if (errors) {
    const firstError = errors.map(error => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  // proceed to next middleware
  next();
};

// Validation for SignUp (Creating new User)
exports.userSignUpValidator = (req, res, next) => {
  // name is not null and between 4-20 characters
  req.check("name", "Name is required").notEmpty();
  // email is not null, valid and normalized
  req
    .check("email", "Email must be between 3 to 32 characters")
    .matches(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
    .withMessage("Email must contain @")
    .isLength({
      min: 4,
      max: 2000
    });
  // check for password
  req.check("password", "Password is required!").notEmpty();
  req
    .check("password")
    .isLength({ min: 6 })
    .withMessage("Password must contain atleast 6 characters!")
    .matches(/\d/)
    .withMessage("Password must contain a number!");
  // check for errors
  const errors = req.validationErrors();
  // if error show the first one as they happen
  if (errors) {
    const firstError = errors.map(error => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  // proceed to next middleware
  next();
};

exports.passwordResetValidator = (req, res, next) => {
  // check for new Password
  req.check("newPassword", "Password is required").notEmpty();
  req
    .check("newPassword")
    .isLength({ min: 6 })
    .withMessage("Password must contain atleast 6 characters!")
    .matches(/\d/)
    .withMessage("Password must contain a number!");

  // check for errors
  const errors = req.validationErrors();
  // if error show the first one as they happen
  if (errors) {
    const firstError = errors.map(error => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  // proceed to next middleware
  next();
};

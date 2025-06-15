import { body } from "express-validator";

const registerUserValidator = () => {
  return [
    (req, res, next) => { console.log("Running registerUserValidator"); next(); },
    body("username")
      .isString()
      .withMessage("Username must be a string")
      .isLength({ min: 3, max: 12 })
      .withMessage("Username must be 3 to 12 characters long"),
    body("email")
      .isEmail()
      .withMessage("Valid email required"),
    body("password")
      .isLength({ min: 8, max: 20 })
      .withMessage("Password must be between 8 and 20 characters"),
    body("fullname")
      .isString()
      .withMessage("Full name must be a string")
      .isLength({ min: 3 })
      .withMessage("Full name must be at least 3 characters"),
  ];
};

const loginUserValidator = () => {
  return [
    body("email").isEmail().withMessage("enter valid email"),
    body("password").isLength({min: 2})
  ]
}

export {registerUserValidator, loginUserValidator};

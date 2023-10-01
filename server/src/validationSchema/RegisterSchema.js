import { check } from "express-validator";

export const RegisterSchema = [
  // for name
  check("name")
    .trim()
    .replace(/\s/g, "")
    .isAlphanumeric()

    .withMessage("Name should not contain empty spaces"),

  //for username
  check("username", "username is required")
    .exists()
    .isAlphanumeric()
    .withMessage("username should  contains Aplhanumeric characters only ")
    .trim()
    .isLength({ min: 3, max: 35 }),

  //for password
  check("password", "password is required")
    .isLength({ min: 3, max: 35 })
    .trim(),

  //for email
  check("email", "email is required").exists().isEmail(),
];

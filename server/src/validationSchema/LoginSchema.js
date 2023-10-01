import { check } from "express-validator";

export const LoginSchema = [
 
  //for username
  check("username", "username is required")
    .exists()
    .isAlphanumeric()
    .withMessage("username should  contains Aplhanumeric characters only ")
    .trim()
    .isLength({ min: 3, max: 35 }),

  //for password
  check("password", "password is required")
    .isLength({ min: 3, max: 80 })
    .trim(),

];

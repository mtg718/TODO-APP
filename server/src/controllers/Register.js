import { validationResult } from "express-validator";
import { jsonGenerator } from "../utils/helper.js";
import { StatusCode, JWT_TOKEN_SECRET } from "../utils/constant.js";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import Jwt from "jsonwebtoken";

const Register = async (req, res) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    const { name, username, password, email } = req.body;
    // password hashing
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // if user exist already not create in database
    const userExist = await User.findOne({
      $or: [
        {
          email: email,
        },
        {
          username: username,
        },
      ],
    });

    if (userExist) {
      return res.json(
        jsonGenerator(
          StatusCode.UNPROCESSABLE_ENTITY,
          "User or Email already exisys"
        )
      );
    }

    //save to database

    try {
      const result = await User.create({
        name: name,
        email: email,
        password: hashPassword,
        username: username,
      });

      const token = Jwt.sign({ userId: result._id }, JWT_TOKEN_SECRET);

    return  res.json(
        jsonGenerator(StatusCode.SUCCESS, "Registartion Successfull", {
          userId: result._id,
          token: token,
        })
      );
    } catch (err) {
      console.log(err);
    }
  }

  //else show error with status code
  res.json(
    jsonGenerator(
      StatusCode.VALIDATION_ERROR,
      "Validation error",
      errors.mapped()
    )
  );
};

export default Register;

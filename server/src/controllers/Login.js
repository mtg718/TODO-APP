import { validationResult } from "express-validator";
import User from "../models/User.js";
import { jsonGenerator } from "../utils/helper.js";
import { JWT_TOKEN_SECRET, StatusCode } from "../utils/constant.js";
import bcrypt from 'bcrypt';
import  Jwt  from "jsonwebtoken";

const Login = async (req, res) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.json(
        jsonGenerator(
          StatusCode.UNPROCESSABLE_ENTITY,
          "Invalid Username or password "
        )
      );
    }
// compare entered password with database password to verify the user
    const verified = bcrypt.compareSync(password,user.password);

    if(!verified){
        return res.json(
          jsonGenerator(
            StatusCode.UNPROCESSABLE_ENTITY,
            "Invalid Username or password "
          )
        );
    }

    const token = Jwt.sign({userId:user._id},JWT_TOKEN_SECRET)

    return res.json(jsonGenerator(StatusCode.SUCCESS,"Login Successfull",{userId:user._id,token:token}))
  }

  res.json(jsonGenerator(StatusCode.VALIDATION_ERROR,"Validation Error",errors.mapped()))
};

export default Login;

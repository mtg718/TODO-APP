import { JWT_TOKEN_SECRET, StatusCode } from "../utils/constant.js"
import { jsonGenerator } from "../utils/helper.js"

import  Jwt from "jsonwebtoken"
const AuthMiddleware= (req,res,next)=>{
    if(req.headers["auth"]===undefined){
        return res.json(jsonGenerator(StatusCode.AUTH_ERROR,"Access Denied"))
    }

    //else check token if not undefined

    const token= req.headers["auth"];

    try{
const decoded = Jwt.verify(token,JWT_TOKEN_SECRET);
console.log(decoded);

req.userId= decoded.userId;

return next();

    }
    catch(error){
return res.json(jsonGenerator(StatusCode.UNPROCESSABLE_ENTITY,"Invalid Token"))

    }
}

export default AuthMiddleware;
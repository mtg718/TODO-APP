
import User from '../models/User.js'
import {StatusCode} from '../utils/constant.js'
import {jsonGenerator} from '../utils/helper.js'
// import Todo from "../models/Todo.js";
export const GetTodos= async(req,res)=>{
try {
    
const list= await User.findById(req.userId)
.select("-password")
.populate("todos")
.exec();

return res.json(jsonGenerator(StatusCode.SUCCESS,"All todo list",list))

} catch (error) {
    
    return res.json(jsonGenerator(StatusCode.UNPROCESSABLE_ENTITY,"Error found",error))
}

}
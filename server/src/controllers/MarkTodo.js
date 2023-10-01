import { validationResult } from "express-validator";
import { jsonGenerator } from "../utils/helper.js";
import { StatusCode } from "../utils/constant.js";
import Todo from "../models/Todo.js";

export const MarkTodo = async (req, res) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.json(
      jsonGenerator(
        StatusCode.VALIDATION_ERROR,
        "todo id is required",
        error.mapped()
      )
    );
  }
  try {
    const todo = await Todo.findOneAndUpdate(
      {
        _id: req.body.todo_id,
        userId: req.userId,
      },
      [
        {
          $set: {
            isCompleted: {
              $eq: [false, "$isCompleted"],
            },
          },
        },
      ]
    );

    if (todo) {
      return res.json(jsonGenerator(StatusCode.SUCCESS, "updated", todo));
    }
  } catch (error) {
    return res.json(
      jsonGenerator(StatusCode.UNPROCESSABLE_ENTITY, "could not update", null)
    );
  }
};

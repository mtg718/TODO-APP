import React from "react";
import moment from 'moment/moment'
import {  toast } from "react-toastify";
import { deleteTodoApi, markTodoApi } from "../../services/api.js";

const Todo = ({ todo, setRefreshList }) => {
  
  
  const handleDelete = async () => {
    const result = await deleteTodoApi({
      todo_id: todo._id,
    });
    console.log("delete todo", result);

    if (result.data.status === 200) {
      setRefreshList(new Date())
      toast("Task is deleted Successfully");
    } else {
      toast("Failed to delete,please try again");
    }
  };

const handleMarkTodo = async () => {
  const result = await markTodoApi({
    todo_id: todo._id,
  });
  console.log("mark todo", result);

  if (result.data.status === 200) {
    setRefreshList(new Date());
    toast(result.data.message);
  } else {
    toast("Failed to mark,please try again");
  }
};


  return (
    <div
      className="col-sm-7 mx-3 my-2 alert "
      style={{ backgroundColor: "#8b509d", color: "black",boxShadow:"1px 2px 3px black" }}
    >
      <div className="card-header ">
        {todo.isCompleted ? "Completed" : "Not Completed"}
        <hr />
      </div>

      <div className="card-body">
        <h4
          className="card-title"
          style={{ textDecoration: todo.isCompleted ? "line-through" : "none" }}
        >
          {todo.desc}
        </h4>
        <p className="card-text">{moment(todo.date).fromNow()}</p>
      </div>

      <div
        className="actionButtons"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: "1.2rem",
          gap: "1rem",
        }}
      >
        <div className="deleteButton">
          <button
            style={{
              backgroundColor: "pink",
              borderRadius: "8px",
              padding: "8px 15px",

              fontWeight: "550",
              border: "1px solid black",
              border: "none",
              boxShadow: "1px 2px 3px black",
            }}
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
        <div className="markTodoButton">
          <button
            onClick={handleMarkTodo}
            style={{
              backgroundColor: "pink",
              borderRadius: "8px",

              padding: "8px 15px",
              border: "1px solid black",
              border: "none",
              fontWeight: "550",
              boxShadow: "1px 2px 3px black",
            }}
          >
            {todo.isCompleted ? "Mark Undone" : "Mark Done"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Todo;

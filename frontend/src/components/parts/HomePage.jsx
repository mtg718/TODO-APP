import React, { useEffect, useState } from "react";
import Header from "./Header.jsx";
import Todo from "./Todo.jsx";
import AddTodoModal from "./AddTodoModal.jsx";
import { useNavigate } from "react-router-dom";
import { getTodoListApi, getToken } from "../../services/api.js";
import { ToastContainer, toast } from "react-toastify";


const HomePage = () => {
 
 
  const navigation = useNavigate();
const [searchText, setSearchText] = useState("");
  const [list, setList] = useState([]);
  const [refreshList, setRefreshList] = useState();
  const [filteredList, setFilteredList] = useState([]);


  useEffect(() => {
    // hiding home screen for non-logged users
    if (!getToken()) {
      navigation("/login");
    }
fetchTodoList();
   
  }, [refreshList]);

useEffect(() => {
 if(searchText===''){
  setFilteredList(list)
 }else{
const filterlist= list.filter(todo=>todo.desc.toLowerCase().includes(searchText.toLowerCase().trim()))
setFilteredList(filterlist);

 }


}, [list,searchText])



async function fetchTodoList(){
  const result = await getTodoListApi();
console.log('todolist',result);

if(result.status===200 && result.data.status===200){
  setList(result.data.data.todos.reverse());
}

}



  return (
    <div>
      <Header searchText={searchText} setSearchText={setSearchText} />
      <hr style={{ marginTop: "-5px", height: "1px" }} />
      <ToastContainer />
      <div className="container">
        <div className="row justify-content-md-center mt-4">
          {filteredList.map((todo) => (
            <Todo todo={todo} key={todo._id} setRefreshList={setRefreshList} />
          ))}

          {filteredList.length === 0 && (
            <div className="notFoundTodos">
              
              <h2>No tasks found !</h2>
            </div>
          )}
        </div>
      </div>

      <div
        className=""
        style={{ position: "fixed", right: 100, top: 150, zIndex: 1030 }}
      >
        <button
          style={{
            backgroundColor: "#adb5bd",
            color: "black",
            padding: "10px 25px",
            fontWeight: "400",
            fontSize: "20px",
            border: "none",
            backgroundColor: "pink",
          }}
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          className="btn btn-outline-warning"
        >
          Add Task
        </button>
      </div>

      <AddTodoModal setRefreshList={setRefreshList} />
    </div>
  );
};

export default HomePage;

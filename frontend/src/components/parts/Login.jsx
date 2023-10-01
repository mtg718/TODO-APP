import React, { useEffect, useState } from "react";
import { login } from "../../services/api.js";
// import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./Header.jsx";

const Login = ({ user, setUser }) => {
  const navigation = useNavigate();
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

 useEffect(() => {
   const user = localStorage.getItem("user");
   if (user) {
     return navigation("/");
   }
 }, []);


  //for server errors
  const [errors, setErrors] = useState(null);

  //when user fill the form it will be called

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const result = await login(form);
    console.log("form", form);
    setErrors(null);

    if (result.status === 200) {
      if (result.data.status === 200) {
        localStorage.setItem("user", JSON.stringify(result.data.data));
        //after data creation navigate to home page
        navigation("/");
        return;
      }

      //check validation error
      if (result.data.status === 201) {
        setErrors(result.data.data);
        return;
      }

      if (result.data.status === 202) {
        toast(result.data.message);
        return;
      }
    }
  };

  return (
    <>
      <Header />
      <hr
        style={{ marginTop: "-5px", height: "1px" }}
      />
      <div className="container">
        <ToastContainer />
        <div className="row justify-content-center mt-4">
          <div className="col-lg-5 card border-primary mt-4">
            <div className="card-body">
              <h4 className="card-title" style={{display:'flex',justifyContent:"center"}}>Login</h4>
              <hr />
              <div className="form-group">
                <label htmlFor="exampleInputEmail1" className="form-label mt-4">
                  Email or username
                </label>
                <input
                  type="text"
                  onChange={handleChange}
                  name="username"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter email or username"
                />

                {errors?.username && (
                  <small id="emailHelp" className="form-text text-primary" >
                    {errors.username.msg}
                  </small>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="exampleInputEmail1" className="form-label mt-4">
                  Password
                </label>
                <input
                  type="password"
                  onChange={handleChange}
                  name="password"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter password"
                />

                {errors?.password && (
                  <small id="emailHelp" className="form-text text-primary">
                    {errors.password.msg}
                  </small>
                )}
              </div>

              <div className="row justify-content-md-center form-group mt-4">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="col-sm-6 btn btn-primary center"
                  style={{borderRadius:'50px'}}
                >
                  Login Here
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

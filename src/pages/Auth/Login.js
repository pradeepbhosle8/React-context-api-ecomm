import React, { useState } from "react";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useAuth } from "../../context/auth";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [auth, setAuth] = useAuth();

  const goToRegister = () => {
    navigate("/register");
  };

  const handelLoginSubmit = async (e) => {
    e.preventDefault();
    // console.log(email, password);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/login`,
        { email, password }
      );

      if (res.data.success) {
        console.log("res success");
        toast.success(res.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        console.log("res unsuccessful");
        toast.error(res.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <div className="container">
      <ToastContainer />
      <div className="wrapper">
        <div className="card mt-5">
          <div className="card-header  bg-warning">
            <h3 className="text-center">SignIn</h3>
          </div>
          <div className="card-body">
            <form onSubmit={handelLoginSubmit}>
              <div className="mb-3">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  id="email"
                  value={email}
                  placeholder="Email Id"
                  className="form-control"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  placeholder="Password"
                  className="form-control"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="mb-3 d-flex justify-content-between">
                <button className="btn btn-primary" type="submit">
                  Login
                </button>
                <p>
                  <NavLink to="/forgot"> Forgot Password</NavLink>
                </p>
              </div>
              <hr />
              <div className="d-flex justify-content-between">
                <p>If you are not Register Please Register First </p>
                <button className="btn btn-info btn-sm" onClick={goToRegister}>
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

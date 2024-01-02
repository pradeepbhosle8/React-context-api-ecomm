import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");

  const navigate = useNavigate();

  //  Registration Submitted
  const handelRegisterSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/register`,
        { name, email, password, phone, address, answer }
      );

      if (res.data.success) {
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
        
        navigate("/login");

        setName("");
        setEmail("");
        setPassword("");
        setPhone("");
        setAddress("");
      } else {
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
      console.log(error.message);
      toast.error("Something went wrong", error.message);
    }
  };

  return (
    <div className="container">
      <ToastContainer />
      <div className="wrapper col-lg-6 col-sm-12  m-auto">
        <div className="card mt-5">
          <div className="card-header bg-warning">
            <div className="title text-center">
              {" "}
              <h3>SignUp</h3>
            </div>
          </div>
          <div className="card-body col-lg-12 col-sm-9 m-auto">
            <form onSubmit={handelRegisterSubmit}>
              <div className="mb-3">
                <label htmlFor="Name">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  id="Name"
                  placeholder="Full Name"
                  className="form-control"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="Email">Email Id</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="Email"
                  placeholder="Email ID"
                  className="form-control"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  placeholder="Password"
                  className="form-control"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  type="number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  id="phoneNumber"
                  placeholder="Phone Number"
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="address">Address</label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  id="address"
                  cols="5"
                  rows="3"
                  className="form-control"
                  placeholder="Address"
                  required
                ></textarea>
              </div>

              <div className="mb-3">
                <label htmlFor="answer"> What is your Pet Name ?</label>
                <input type="text" 
                       value={answer} 
                       id="answer"
                       className="form-control"
                       placeholder="What is your Pet Name"
                       onChange={(e)=> setAnswer(e.target.value)} 
                       required />
              </div>

              <div className="d-flex justify-content-between mb-3">
                <button className="btn btn-primary col-3" type="submit">
                  Submit
                </button>
                <button className="btn btn-secondary col-3" type="reset">
                  Reset
                </button>
              </div>
              <hr />
              <p>
                If are you already register go to{" "}
                <NavLink to={"/login"}>Login</NavLink>{" "}
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

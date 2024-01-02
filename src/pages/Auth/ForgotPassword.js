import axios from "axios";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");

  const navigate = useNavigate();

  const handelforgotSubmit = async (e) => {
    e.preventDefault();
    console.log(email, newPassword, answer);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/forgotPassword`,
        {
          email,
          newPassword,
          answer,
        }
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
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong ", {
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
            <h3 className="text-center">Reset Password</h3>
          </div>
          <div className="card-body">
            <form onSubmit={handelforgotSubmit}>
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
                <label htmlFor="password">New Password</label>
                <input
                  type="password"
                  id="password"
                  value={newPassword}
                  placeholder="Password"
                  className="form-control"
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="answer">Answer</label>
                <input
                  type="text"
                  id="answer"
                  value={answer}
                  placeholder="What is Your Pet Name?"
                  className="form-control"
                  onChange={(e) => setAnswer(e.target.value)}
                />
              </div>

              <div className="mb-3 d-flex justify-content-between">
                <button className="btn btn-primary" type="submit">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

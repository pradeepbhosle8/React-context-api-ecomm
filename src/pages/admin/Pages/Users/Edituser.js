import React, { useState, useEffect } from "react";
import Layout from "../../AdminLayout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Edituser = () => {
  const navigate = useNavigate();
  const params = useParams();

  const handleGoBack = () => {
    navigate("/dashboard/admin/user/");
  };

  const [users, setUsers] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "",
    address: "",
    answer: "",
  });

  const { name, email, password, phone, role, address, answer } = users;

  const onInputChange = (e) => {
    setUsers({
      ...users,
      [e.target.name]: e.target.value,
    });
  };

  const getSingleUser = async () => {
    try {
      const user = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/users/User/${params.id}`
      );
      //   console.log(user);
      setUsers(user.data.user);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const handelUsersSubmit = async (e) => {
    e.preventDefault();
    // console.log(name, email, password, phone, role, address, answer);
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/users/User/${params.id}`,
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

        navigate("/dashboard/admin/user/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getSingleUser();
  }, []);

  return (
    <>
      <Layout title={"Update User"}>
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-12">
                <div className="card">
                  <div className="card-header bg-primary">
                    <h3 className="text-white float-start">Update User</h3>
                    <button
                      className="btn btn-light float-end btn-sm"
                      onClick={handleGoBack}
                    >
                      Go Back
                    </button>
                  </div>
                  <div className="card-body">
                    <form onSubmit={handelUsersSubmit}>
                      <div className="mb-3">
                        <label htmlFor="Name">Full Name</label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => onInputChange(e)}
                          id="Name"
                          name="name"
                          placeholder="Full Name"
                          className="form-control"
                        />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="Email">Email Id</label>
                        <input
                          type="email"
                          value={email}
                          name="email"
                          onChange={(e) => onInputChange(e)}
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
                          name="password"
                          onChange={(e) => onInputChange(e)}
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
                          name="phone"
                          onChange={(e) => onInputChange(e)}
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
                          onChange={(e) => onInputChange(e)}
                          id="address"
                          name="address"
                          cols="5"
                          rows="3"
                          className="form-control"
                          placeholder="Address"
                          required
                        ></textarea>
                      </div>

                      <div className="mb-3">
                        <label htmlFor="answer"> What is your Pet Name ?</label>
                        <input
                          type="text"
                          value={answer}
                          id="answer"
                          name="answer"
                          className="form-control"
                          placeholder="What is your Pet Name"
                          onChange={(e) => onInputChange(e)}
                          required
                        />
                      </div>

                      <div className="d-flex justify-content-between mb-3">
                        <button className="btn btn-primary col-3" type="submit">
                          Submit
                        </button>
                        <button
                          className="btn btn-secondary col-3"
                          type="reset"
                        >
                          Reset
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Edituser;

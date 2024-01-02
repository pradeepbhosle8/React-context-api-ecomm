import React from "react";
import { useAuth } from "../../context/auth";
import { NavLink, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

const UserSidebar = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const handelLogOut = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.info("Logged out Successfully", {
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
  };

  return (
    <>
      <aside
        className="main-sidebar elevation-4 sidebar-light-primary"
        style={{ float: "left", position: "static" }}
      >
        <a href="index3.html" className="brand-link bg-cyan">
          <img
            src={require("../../assets/images/AdminLTELogo.png")}
            alt="Pradeep Bhosle Logo"
            className="brand-image img-circle elevation-3"
          />
          <span className="brand-text font-weight-light">{auth.user.name}</span>
        </a>

        <div className="sidebar">
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              <img
                src={require("../../assets/images/user2-160x160.jpg")}
                className="img-circle elevation-2"
                alt="User Image"
              />
            </div>
            <div className="info">
              <span className="d-block">{auth.user.name}</span>
              <span className="text-sm">{auth.user.phone}</span>
            </div>
          </div>

          <div className="form-inline">
            <div className="input-group" data-widget="sidebar-search">
              <input
                className="form-control form-control-sidebar"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <div className="input-group-append">
                <button className="btn btn-sidebar">
                  <i className="fas fa-search fa-fw"></i>
                </button>
              </div>
            </div>
          </div>

          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              <li className="nav-item ">
                <NavLink to="/dashboard/user" className="nav-link">
                  <i className="nav-icon fas fa-tachometer-alt"></i>
                  <p>Dashboard Panel</p>
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/dashboard/user/Profile" className="nav-link ">
                  <p>Profile</p>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/dashboard/user/Orders" className="nav-link">
                  <p>Order</p>
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
};

export default UserSidebar;

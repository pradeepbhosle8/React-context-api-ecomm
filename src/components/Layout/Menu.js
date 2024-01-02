import React from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/auth";
import { toast } from "react-toastify";

import { useCart } from "../../context/cart";

const Menu = () => {
  const navigate = useNavigate();
  const goToLogin = () => {
    navigate("/login");
  };

  const [auth, setAuth] = useAuth();

  const [cart] = useCart();

  const handelLogOut = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    localStorage.removeItem("cart");
    window.location.reload();
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
    navigate("/");
  };

  return (
    <>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        {!auth.user ? (
          ""
        ) : (
          <li>
            <NavLink
              to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
            >
              Dashboard
            </NavLink>
          </li>
        )}

        <li>
          <NavLink to="/about">About us</NavLink>
        </li>
        <li>
          <NavLink to="/contact">Contact us</NavLink>
        </li>
        <li>
          <NavLink to="/policy">Policy</NavLink>
        </li>
      </ul>
      <ul
        style={{
          backgroundColor: "#fff",
          borderRadius: "10px",
          padding: "4px",
        }}
      >
        <li>
          <button
            type="button"
            className="btn btn-outline-primary position-relative me-3"
            onClick={() => navigate("/cart")}
          >
            Cart
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {cart?.length}
              <span className="visually-hidden">unread messages</span>
            </span>
          </button>
        </li>

        {!auth.user ? (
          <li>
            <button
              type="button"
              className="btn btn-light position-relative"
              onClick={goToLogin}
            >
              <i className="fa fa-sign-in me-2"></i>
              Login
            </button>
          </li>
        ) : (
          <>
            <button type="button" className="btn btn-light position-relative">
              <i className="fa fa-user me-2"></i>
              {auth.user.name}
            </button>
            <button
              type="button"
              className="btn btn-light position-relative"
              onClick={handelLogOut}
            >
              <i className="fa fa-sign-in me-2"></i>
              LogOut
            </button>
          </>
        )}
      </ul>
    </>
  );
};

export default Menu;

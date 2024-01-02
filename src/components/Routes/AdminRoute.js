import React, { useState, useEffect } from "react";

import { useAuth } from "../../context/auth";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";
import { toast } from "react-toastify";

const AdminRoute = () => {
  const [ok, setOk] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/adminAuth`
      );
      console.log(auth.user.role);
      console.log(res);
      if (auth?.user?.role === 1) {
        if (res.data.ok) {
          // console.log("true");
          setOk(true);
        } else {
          // console.log("false");
          setOk(false);
        }
      }
    };

    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner path="" />;
};

export default AdminRoute;

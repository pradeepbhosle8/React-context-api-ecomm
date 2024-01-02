import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

const Private = () => {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const authChcek = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/userAuth`
        // {
        //   headers: {
        //     Authorization: auth?.token,
        //   },
        // }
      );

      if (auth?.user?.role === 0) {
        if (res.data.ok) {
          setOk(true);
        } else {
          setOk(false);
        }
      }
    };
    if (auth?.token) authChcek();
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner path="" />;
};

export default Private;

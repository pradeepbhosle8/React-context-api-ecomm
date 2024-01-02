import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchFilter } from "../../context/searchFilter";

const Search = () => {
  const [values, setValues] = useSearchFilter();
  const navigate = useNavigate();

  const handelSubmit = async (e) => {
    e.preventDefault();
    console.log("working");
    try {
      console.log(values);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/products/product-search/${values.keyword}`
      );
      console.log(data);
      setValues({ ...values, results: data.result });
      navigate("/searchProduct");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form onSubmit={handelSubmit}>
        <div className="input-group mb-2">
          <input
            type="text"
            className="form-control"
            value={values.keyword}
            onChange={(e) => setValues({ ...values, keyword: e.target.value })}
            placeholder="Search this Products"
          />
          <div className="input-group-append">
            <button className="btn btn-secondary" type="submit">
              <i className="fa fa-search"></i>
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Search;

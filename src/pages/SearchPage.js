import React, { useState } from "react";
import Layout from "../components/Layout/Layout";
import { useSearchFilter } from "../context/searchFilter";
import { Link } from "react-router-dom";

const SearchPage = () => {
  const [values, setValues] = useSearchFilter();
  return (
    <>
      <Layout title={"Search Product"}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12 order-2 col-right-main row">
              <div className="d-flex justify-content-between align-items-center border rounded m-2 mb-3 ">
                <h3>Search Results</h3>
                <h6>Total Search Products {values.results.length}</h6>
              </div>

              {values?.results.map((product, i) => {
                return (
                  <div className="col-sm-3" key={i}>
                    <div className="box_main">
                      <Link to={`/product/${product.slug}`}>
                        <h4 className="shirt_text" title={product.name}>
                          {product.name.substring(0, 20)}
                        </h4>
                      </Link>
                      <p className="price_text">
                        ${" "}
                        <span
                          style={{
                            color: "#f26522",
                            fontWeight: "bold",
                          }}
                        >
                          {product.price}
                        </span>
                      </p>
                      <div className="tshirt_img">
                        <img
                          src={`${process.env.REACT_APP_API}/api/v1/products/product-photo/${product._id}`}
                          alt=""
                          className="img img-responsive"
                        />
                      </div>
                      <p>{product.description.substring(0, 80)}...</p>
                      <div className="btn_main">
                        <div className="buy_bt">
                          <button className="btn btn-primary btn-sm">
                            Add To Cart
                          </button>
                        </div>
                        <div className="seemore_bt btn btn-sm btn-outline-info">
                          <Link to={`/product/${product.slug}`}>See More</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default SearchPage;

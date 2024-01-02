import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/auth";
import axios from "axios";
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";
import { Link, useParams } from "react-router-dom";

import { useCart } from "../context/cart";
import { toast } from "react-toastify";

const HomePage = () => {
  const param = useParams();
  const [cart, setCart] = useCart();

  const [auth, setAuth] = useAuth();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

  const [checked, setChecked] = useState([]);
  const [disabled, setDisabled] = useState(false);

  const [minValue, setMinValue] = useState("100");
  const [maxValue, setMaxValue] = useState("50000");

  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(false);

  const [values, setValues] = useState([]);

  const minmaxValue = (event) => {
    setMinValue(event[0]);
    setMaxValue(event[1]);
    // console.log(minValue, maxValue);
  };

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/products/product-list/${page}`
      );
      setLoading(false);
      // console.log(data.products.category);
      if (data?.success) {
        setProducts(data.products);
        // setCategory(data.products.category);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // total is the total number of products
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/products/product-count`
      );
      console.log(data);
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  // loadmore
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/products/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data.products]);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getTotal();
    if (page === 1) return;
    loadMore();
  }, [page]);

  // get All Categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/getCategory`
      );
      if (data.success) {
        setCategories(data.categories);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // check if category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((category) => category !== id);
    }
    setChecked(all);
  };

  // get filter products

  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/products/productFilter`,
        {
          checked,
          minValue,
          maxValue,
        }
      );
      // console.log(data);
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  const onChange = (checked: boolean) => {
    setDisabled(checked);
  };

  useEffect(() => {
    if (!checked.length || (!minValue.length && !maxValue.length))
      getAllProducts();
  }, [checked.length, minValue.length, maxValue.length]);

  useEffect(() => {
    if (checked.length || (minValue.length && maxValue.length)) filterProduct();
  }, [checked, minValue, maxValue]);

  useEffect(() => {
    getAllCategory();
  }, []);

  return (
    <Layout title={"Ecommerce App - Home Page"}>
      {/* <!-- fashion section start --> */}
      <div className="fashion_section">
        <div id="main_slider" className="carousel slide" data-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div className="container">
                {/* {JSON.stringify(checked, null, 4)} */}

                {/* <pre>{JSON.stringify(auth, null, 4)}</pre> */}
                <div className="fashion_section_2">
                  <div className="row">
                    <div className="col-lg-3 order-1 col-left-sidebar">
                      <div className="sidebar">
                        <div className="block-filter">
                          <div className="block-title">
                            <strong>Shop By</strong>
                            <p>8:43:05</p>
                          </div>
                          <div className="block-content">
                            <dl className="filter-option">
                              <dt className="filter-options-title">Category</dt>
                              <dd className="filter-options-content">
                                <ol className="items">
                                  {categories?.map((category, i) => {
                                    return (
                                      <li className="my item" key={i}>
                                        <input
                                          type="checkbox"
                                          className="form-check-input"
                                          onChange={(e) =>
                                            handleFilter(
                                              e.target.checked,
                                              category._id
                                            )
                                          }
                                        />
                                        <span className="ms-2">
                                          {category.name}
                                        </span>
                                      </li>
                                    );
                                  })}
                                </ol>
                              </dd>
                            </dl>
                            <Nouislider
                              range={{ min: 50, max: 50000 }}
                              start={[50, 10050]}
                              connect
                              tooltips={true}
                              onChange={minmaxValue}
                              style={{ marginTop: "50px" }}
                            />
                            {Math.round(minValue)} - {Math.round(maxValue)}
                          </div>
                          <button
                            className="btn btn-primary btn-sm"
                            onClick={() => window.location.reload()}
                          >
                            Reset
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-9 order-2 col-right-main row">
                      <div></div>
                      {products?.map((product, i) => {
                        return (
                          <div className="col-sm-4" key={i}>
                            <div className="box_main">
                              <Link to={`/product/${product.slug}`}>
                                <h4 className="shirt_text" title={product.name}>
                                  {product.name.substring(0, 20)}
                                </h4>
                              </Link>
                              <p className="price_text">
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
                                  <button
                                    className="btn btn-primary btn-sm"
                                    onClick={() => {
                                      setCart([...cart, product]);
                                      localStorage.setItem(
                                        "cart",
                                        JSON.stringify([...cart, product])
                                      );
                                      toast.success("Product added to cart");
                                    }}
                                  >
                                    Add To Cart
                                  </button>
                                </div>
                                <div className="seemore_bt btn btn-sm btn-outline-info">
                                  <Link to={`/product/${product.slug}`}>
                                    See More
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                      <div className="m-2 p-3">
                        {products && products.length < total && (
                          <button
                            className="btn btn-warning btn-sm"
                            onClick={(e) => {
                              e.preventDefault();
                              setPage(page + 1);
                            }}
                          >
                            {loading ? (
                              <div
                                class="spinner-border text-primary"
                                role="status"
                              >
                                <span class="visually-hidden">Loading...</span>
                              </div>
                            ) : (
                              "LoadMore"
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;

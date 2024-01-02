import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import axios from "axios";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Layout from "../components/Layout/Layout";

const SingleProduct = () => {
  const params = useParams();
  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState("");

  const [relatedProducts, setRelatedProducts] = useState([]);

  const navigate = useNavigate();

  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/products/getSingleProducts/${params.slug}`
      );
      console.log(data);
      if (data?.success) {
        setProduct(data.product);
        setCategory(data.product.category);
        getSimilarProduct(data?.product._id, data?.product.category._id);
      } else {
        console.log("Error getting");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (params?.slug) getSingleProduct();
  }, [params?.slug]);

  // get similar products
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/products/product-similar/${pid}/${cid}`
      );
      console.log(data?.products);
      if (data) {
        setRelatedProducts(data?.products);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Layout>
        <div id="singleProductView">
          <div className="container">
            <div className="row">
              <article className="col-md-12 border rounded shadow-sm">
                <div className="col-12 img-product-gallery-wrapper">
                  <div className="row">
                    <div className="col-lg-6">
                      <Carousel>
                        <div>
                          <img
                            src={`${process.env.REACT_APP_API}/api/v1/products/product-photo/${product._id}`}
                            className="img img-responsive"
                          />
                          <p className="legend">{product.name}</p>
                        </div>
                        <div>
                          <img
                            src={`${process.env.REACT_APP_API}/api/v1/products/product-photo/${product._id}`}
                            className="img img-responsive"
                          />
                          <p className="legend">{product.name}</p>
                        </div>
                        <div>
                          <img
                            src={`${process.env.REACT_APP_API}/api/v1/products/product-photo/${product._id}`}
                            className="img img-responsive"
                          />
                          <p className="legend">{product.name}</p>
                        </div>
                        <div>
                          <img
                            src={`${process.env.REACT_APP_API}/api/v1/products/product-photo/${product._id}`}
                            className="img img-responsive"
                          />
                          <p className="legend">{product.name}</p>
                        </div>
                      </Carousel>
                    </div>
                    <div className="col-lg-6 imgDescWrapper">
                      <h2>{product.name}</h2>
                      <h5>{category.name}</h5>
                      <p>{product.description}</p>
                      <h3>{product.price}</h3>

                      <button className="btn btn-primary">Buy Now</button>
                    </div>
                  </div>
                </div>
              </article>
              <article className="col-md-12 mt-3">
                <div className="container">
                  <div className="row">
                    <div className="p-1 border rounded mb-3">
                      <h2>Similar Product</h2>
                    </div>
                    {/* {JSON.stringify(relatedProducts, null, 4)} */}
                    {relatedProducts.length < 1 ? (
                      <div>No Similar product Found</div>
                    ) : (
                      relatedProducts?.map((product, i) => {
                        return (
                          <div className="col-sm-4" key={i}>
                            <div className="box_main">
                              <a
                                onClick={() =>
                                  navigate(`/product/${product.slug}`)
                                }
                              >
                                <h4 className="shirt_text" title={product.name}>
                                  {product.name.substring(0, 20)}
                                </h4>
                              </a>
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
                                  <a
                                    onClick={() =>
                                      navigate(`/product/${product.slug}`)
                                    }
                                  >
                                    See More
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default SingleProduct;

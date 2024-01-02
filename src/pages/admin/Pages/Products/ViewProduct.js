import axios from "axios";
import Layout from "../../AdminLayout/Layout";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ViewProduct = () => {
  const params = useParams();
  const [product, setProducts] = useState([]);
  const [category, setCategory] = useState("");

  const navigate = useNavigate();

  const getSingleProduct = async () => {
    console.log("getSingleProduct Runs");
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/products/getSingleProducts/${params.slug}`
      );
      console.log(data);
      if (data?.success) {
        setProducts(data.product);
        setCategory(data.product.category);
      } else {
        toast.error("error.message");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
    // console.log(singleProduct);
  };

  const handleGoBack = () => {
    navigate("/dashboard/admin/products");
  };

  useEffect(() => {
    console.log("UseEffect Runs");
    getSingleProduct();
    // console.log(product.category.name);
  }, []);

  return (
    <>
      <Layout title={"ViewProduct"}>
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-12">
                <div className="card">
                  <div className="card-header">
                    <h2 className="float-start">View Product</h2>
                    <button
                      className="btn btn-info float-end btn-sm"
                      onClick={handleGoBack}
                    >
                      Go Back
                    </button>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table  table-borderless table-stripe table-hover ">
                        <thead className="table-primary">
                          <tr>
                            <th>Product</th>
                            <th>Details</th>
                          </tr>
                        </thead>
                        {console.log("product data  Runs")}

                        <tbody>
                          <tr>
                            <td className="fw-bold">Name</td>
                            <td>{product.name}</td>
                          </tr>
                          <tr>
                            <td className="fw-bold">Slug</td>
                            <td>{product.slug}</td>
                          </tr>
                          <tr>
                            <td className="fw-bold">Description</td>
                            <td>{product.description}</td>
                          </tr>
                          <tr>
                            <td className="fw-bold">Category</td>

                            <td></td>
                          </tr>

                          <tr>
                            <td className="fw-bold">Price</td>
                            <td> &#8377; {product.price}</td>
                          </tr>
                          <tr>
                            <td className="fw-bold">Quantity</td>
                            <td>{product.quantity}</td>
                          </tr>
                          <tr>
                            <td className="fw-bold">photo</td>
                            <td>
                              {/* {console.log(data)}s */}
                              {/* src={`${process.env.REACT_APP_API}/api/v1/products/product-photo/${product._id}`} */}
                              <img
                                src={`${process.env.REACT_APP_API}/api/v1/products/product-photo/${product._id}`}
                                alt=""
                                className="img img-responsive"
                                style={{ height: "150px" }}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td className="fw-bold">Shipping Address</td>
                            <td>{product.shippingAddress ? "Yes" : "No"}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
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

export default ViewProduct;

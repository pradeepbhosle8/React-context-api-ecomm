import React, { useState } from "react";
import Layout from "../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const CartPage = () => {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();

  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // remove cart item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  // total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
    }
  };

  // payment click handler
  const handelPayment = async () => {
    console.log("Working");
    try {
      setLoading(true);
      // const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/products/payment`,
        {
          // nonce,
          cart,
        }
      );
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Layout>
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <h1 className="text-center bg-light p-2">
                {`Hello ${auth?.token && auth?.user?.name}`}
              </h1>
              <h4 className="text-center">
                {cart?.length > 1
                  ? `You Have ${cart.length} item in your cart ${
                      auth?.token ? "" : "Please Login to Checkout"
                    } `
                  : "Your Cart is Empty"}
              </h4>
            </div>
          </div>

          {/* order and chkout page            */}
        </div>
        {cart?.length > 1 ? (
          <div className="container mt-3 border p-3 rounded shadow">
            <div className="row">
              <div className="col-md-9">
                <div className="card">
                  {/* <div className="card-header">
                  <h6>Checkout Products list</h6>
                </div> */}
                  <div className="card-body">
                    <div className="responsive-table">
                      <table className="table table-bordered  table-sm table-valign-middle ">
                        <thead>
                          <tr>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {cart?.map((product, index) => {
                            return (
                              <tr key={index}>
                                <td>
                                  <figure className="itemside  d-flex ">
                                    <div className="aside ">
                                      <img
                                        src={`${process.env.REACT_APP_API}/api/v1/products/product-photo/${product._id}`}
                                        className="img img-responsive"
                                        style={{ height: "60px" }}
                                      />
                                    </div>
                                    <figcaption className="info ms-4">
                                      <a href="#" className="title text-dark">
                                        {product.name}
                                      </a>
                                      <p className="text-muted small">
                                        {product.description.substring(0, 100)}
                                      </p>
                                    </figcaption>
                                  </figure>
                                </td>
                                <td>
                                  <select className="form-control">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                  </select>
                                </td>
                                <td>
                                  <div className="price-wrap">
                                    <var className="price fw-bold">
                                      {product.price.toLocaleString("en-IN", {
                                        style: "currency",
                                        currency: "INR",
                                      })}
                                    </var>
                                  </div>
                                </td>
                                <td>
                                  <a
                                    href=""
                                    className="btn btn-danger"
                                    onClick={() => removeCartItem(product._id)}
                                  >
                                    <i className="fa fa-trash"></i>
                                  </a>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                      <div
                        onClick={() => navigate("/")}
                        style={{ cursor: "pointer" }}
                      >
                        <i className="fa fa-arrow-left"></i> Go to back
                      </div>{" "}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card">
                  <div className="card-header p-1">
                    <h4>Cart Summery</h4>
                  </div>
                  <div className="card-body text-center">
                    <p>Total | Checkout | Payment</p>
                    <hr />
                    <h4>Total: {totalPrice()}</h4>
                    {auth?.user?.address ? (
                      <>
                        <div className="mb-3">
                          <h4>Current Address</h4>
                          <h6>
                            Address: <span>{auth.user.address}</span>
                          </h6>
                          <button
                            className="btn btn-outline-warning"
                            onClick={() => navigate("/dashboard/user/profile")}
                          >
                            Update Address
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="mt-3">
                        {auth?.token ? (
                          <button
                            className="btn btn-outline-warning"
                            onClick={() => navigate("/dashboard/user/profile")}
                          >
                            Update Address
                          </button>
                        ) : (
                          <div>
                            <button
                              className="btn btn-outline-warning"
                              onClick={() =>
                                navigate("/login", {
                                  state: "/cart",
                                })
                              }
                            >
                              Plase Login to checkout
                            </button>
                          </div>
                        )}
                      </div>
                    )}

                    <button className="btn btn-primary" onClick={handelPayment}>
                      Pay
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <table className="table ">
            <tbody>
              <tr>
                <td>No Cart Avaliable</td>
                <td onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
                  {" "}
                  <i className="fa fa-arrow-left"></i> Go to back
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </Layout>
    </>
  );
};

export default CartPage;

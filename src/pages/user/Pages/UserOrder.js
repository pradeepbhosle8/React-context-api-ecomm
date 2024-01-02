import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout/Layout";
import UserSidebar from "../UserSidebar";
import axios from "axios";
import { useAuth } from "../../../context/auth";
import moment from "moment";

const UserOrder = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/orders`
      );
      if (data?.success) {
        setOrders(data?.orders);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Layout>
      <UserSidebar />
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-lg-12 col-ms-6">
                <div className="card">
                  <div className="card-header">
                    <h2>Orders</h2>
                  </div>
                  <div className="card-body">
                    {/* {JSON.stringify(orders, null, 4)} */}
                    {orders.map((o, i) => {
                      return (
                        <div key={i}>
                          <table className="table table-bordered table-hover">
                            <thead className="table-light">
                              <tr>
                                <th>#</th>
                                <th>Status</th>
                                <th>Buyers</th>
                                <th>date</th>
                                <th>Payment</th>
                                <th>Quantity</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>{i + 1}</td>
                                <td>{o?.status}</td>
                                <td>{o?.buyers?.name}</td>
                                <td>{moment(o?.createdAt).fromNow()}</td>
                                <td>
                                  {o?.payment === "success" ? (
                                    <span className="fw-bold text-success">
                                      Success
                                    </span>
                                  ) : (
                                    <span className="fw-bold text-danger">
                                      Failed
                                    </span>
                                  )}
                                </td>
                                <td>{o?.products?.length}</td>
                              </tr>
                            </tbody>
                          </table>
                          <div className="container">
                            {/* {JSON.stringify(o.products)} */}
                            {o?.products?.map((p, i) => {
                              return (
                                <table
                                  className="table table-bordered  table-sm table-valign-middle "
                                  key={i}
                                >
                                  <tbody>
                                    <tr>
                                      <td
                                        width="150px"
                                        style={{ textAlign: "center" }}
                                      >
                                        <figure className="itemside ">
                                          <div className="aside ">
                                            <img
                                              src={`${process.env.REACT_APP_API}/api/v1/products/product-photo/${p._id}`}
                                              className="img img-responsive"
                                              style={{ height: "60px" }}
                                            />
                                          </div>
                                        </figure>
                                      </td>
                                      <td>
                                        <figcaption className="info ms-4 d-flex justify-content-between">
                                          <a
                                            href="#"
                                            className="title text-dark"
                                          >
                                            {p.name}
                                          </a>

                                          <span className="fw-bold me-5">
                                            {p.price.toLocaleString("en-IN", {
                                              style: "currency",
                                              currency: "INR",
                                            })}
                                          </span>
                                        </figcaption>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
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

export default UserOrder;

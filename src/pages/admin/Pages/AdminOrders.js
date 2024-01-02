import React, { useState, useEffect } from "react";
import Layout from "../AdminLayout/Layout";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/auth";
import moment from "moment";

const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "deliverd",
    "cancel",
  ]);
  const [changeStatus, setCHangeStatus] = useState("");
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/all-orders`
      );
      console.log(data);
      if (data) {
        setOrders(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    console.log(orderId);
    console.log(value);
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth/order-status/${orderId}`,
        {
          status: value,
        }
      );
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Layout title={"Admin Orders"}>
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-12">
                <h1>Orders</h1>
                <div className="col-sm-12">
                  <div className="card">
                    <div className="card-header ">
                      <h3 className="card-title">Orders</h3>
                    </div>
                    <div className="card-body">
                      <div className="card-body  p-0">
                        <div className="table-responsive">
                          <table className="table table-bordered table-hover table-striped">
                            <thead className="table-primary">
                              <tr>
                                <th scope="col">#</th>
                                <th scope="col">Status</th>
                                <th scope="col">Buyer</th>
                                <th scope="col"> date</th>
                                <th scope="col">Payment</th>
                                <th scope="col">Quantity</th>
                              </tr>
                            </thead>

                            <tbody>
                              {orders?.map((o, i) => {
                                return (
                                  <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>
                                      <select
                                        className="form-select"
                                        onChange={(value) =>
                                          handleChange(
                                            o._id,
                                            value.target.value
                                          )
                                        }
                                        defaultValue={o?.status}
                                      >
                                        <option value="DEFAULT">
                                          Please Select Status
                                        </option>
                                        {status.map((s, i) => (
                                          <option key={i} value={s}>
                                            {s}
                                          </option>
                                        ))}
                                      </select>
                                    </td>
                                    <td>{o?.buyers?.name}</td>
                                    <td>{moment(o?.createAt).fromNow()}</td>
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
                                );
                              })}
                            </tbody>
                          </table>
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
    </>
  );
};

export default AdminOrders;

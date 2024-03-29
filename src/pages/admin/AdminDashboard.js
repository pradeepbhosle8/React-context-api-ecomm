import React from "react";
import "./admin.css";

import Header from "./AdminLayout/Header";
import Sidebar from "./AdminLayout/Sidebar";
import Footer from "./AdminLayout/Footer";
import Layout from "./AdminLayout/Layout";

const AdminDashboard = () => {
  return (
    <>
      <Layout title={"Admin Dashboard"}>
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Dashboard</h1>
              </div>
              <div className="col-sm-6"></div>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-6">
                <div className="card">
                  <div className="card-header border-0">
                    <h3 className="card-title">Products</h3>
                    <div className="card-tools">
                      <a href="#" className="btn btn-tool btn-sm">
                        <i className="fas fa-download" />
                      </a>
                      <a href="#" className="btn btn-tool btn-sm">
                        <i className="fas fa-bars" />
                      </a>
                    </div>
                  </div>
                  <div className="card-body table-responsive p-0">
                    <table className="table table-striped table-valign-middle">
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th>Price</th>
                          <th>Sales</th>
                          <th>More</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <img
                              src="dist/img/default-150x150.png"
                              alt="Product 1"
                              className="img-circle img-size-32 mr-2"
                            />
                            Some Product
                          </td>
                          <td>$13 USD</td>
                          <td>
                            <small className="text-success mr-1">
                              <i className="fas fa-arrow-up" />
                              12%
                            </small>
                            12,000 Sold
                          </td>
                          <td>
                            <a href="#" className="text-muted">
                              <i className="fas fa-search" />
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <img
                              src="dist/img/default-150x150.png"
                              alt="Product 1"
                              className="img-circle img-size-32 mr-2"
                            />
                            Another Product
                          </td>
                          <td>$29 USD</td>
                          <td>
                            <small className="text-warning mr-1">
                              <i className="fas fa-arrow-down" />
                              0.5%
                            </small>
                            123,234 Sold
                          </td>
                          <td>
                            <a href="#" className="text-muted">
                              <i className="fas fa-search" />
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <img
                              src="dist/img/default-150x150.png"
                              alt="Product 1"
                              className="img-circle img-size-32 mr-2"
                            />
                            Amazing Product
                          </td>
                          <td>$1,230 USD</td>
                          <td>
                            <small className="text-danger mr-1">
                              <i className="fas fa-arrow-down" />
                              3%
                            </small>
                            198 Sold
                          </td>
                          <td>
                            <a href="#" className="text-muted">
                              <i className="fas fa-search" />
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <img
                              src="dist/img/default-150x150.png"
                              alt="Product 1"
                              className="img-circle img-size-32 mr-2"
                            />
                            Perfect Item
                            <span className="badge bg-danger">NEW</span>
                          </td>
                          <td>$199 USD</td>
                          <td>
                            <small className="text-success mr-1">
                              <i className="fas fa-arrow-up" />
                              63%
                            </small>
                            87 Sold
                          </td>
                          <td>
                            <a href="#" className="text-muted">
                              <i className="fas fa-search" />
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="card">
                  <div className="card-header border-0">
                    <h3 className="card-title">Products</h3>
                    <div className="card-tools">
                      <a href="#" className="btn btn-tool btn-sm">
                        <i className="fas fa-download" />
                      </a>
                      <a href="#" className="btn btn-tool btn-sm">
                        <i className="fas fa-bars" />
                      </a>
                    </div>
                  </div>
                  <div className="card-body table-responsive p-0">
                    <table className="table table-striped table-valign-middle">
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th>Price</th>
                          <th>Sales</th>
                          <th>More</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <img
                              src="dist/img/default-150x150.png"
                              alt="Product 1"
                              className="img-circle img-size-32 mr-2"
                            />
                            Some Product
                          </td>
                          <td>$13 USD</td>
                          <td>
                            <small className="text-success mr-1">
                              <i className="fas fa-arrow-up" />
                              12%
                            </small>
                            12,000 Sold
                          </td>
                          <td>
                            <a href="#" className="text-muted">
                              <i className="fas fa-search" />
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <img
                              src="dist/img/default-150x150.png"
                              alt="Product 1"
                              className="img-circle img-size-32 mr-2"
                            />
                            Another Product
                          </td>
                          <td>$29 USD</td>
                          <td>
                            <small className="text-warning mr-1">
                              <i className="fas fa-arrow-down" />
                              0.5%
                            </small>
                            123,234 Sold
                          </td>
                          <td>
                            <a href="#" className="text-muted">
                              <i className="fas fa-search" />
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <img
                              src="dist/img/default-150x150.png"
                              alt="Product 1"
                              className="img-circle img-size-32 mr-2"
                            />
                            Amazing Product
                          </td>
                          <td>$1,230 USD</td>
                          <td>
                            <small className="text-danger mr-1">
                              <i className="fas fa-arrow-down" />
                              3%
                            </small>
                            198 Sold
                          </td>
                          <td>
                            <a href="#" className="text-muted">
                              <i className="fas fa-search" />
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <img
                              src="dist/img/default-150x150.png"
                              alt="Product 1"
                              className="img-circle img-size-32 mr-2"
                            />
                            Perfect Item
                            <span className="badge bg-danger">NEW</span>
                          </td>
                          <td>$199 USD</td>
                          <td>
                            <small className="text-success mr-1">
                              <i className="fas fa-arrow-up" />
                              63%
                            </small>
                            87 Sold
                          </td>
                          <td>
                            <a href="#" className="text-muted">
                              <i className="fas fa-search" />
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
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

export default AdminDashboard;

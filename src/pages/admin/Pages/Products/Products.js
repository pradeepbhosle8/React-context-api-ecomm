import React, { useState, useEffect } from "react";
import Layout from "../../AdminLayout/Layout";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";

const Products = () => {
  const [products, setProducts] = useState([]);
  // const [category, setCategory] = useState("");
  const navigation = useNavigate();

  // pagination
  const [pageNumber, setPageNumber] = useState(0);
  const userPerPage = 10;
  const pagesVisited = pageNumber * userPerPage;

  const getAllProducts = async () => {
    console.log("All Products run");
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/products/getProducts`
      );
      console.log(data);
      if (data?.success) {
        setProducts(data.products);
        // setCategory(data.products.category);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // create product navigation
  const handleCreateProduct = () => {
    navigation("/dashboard/admin/createProduct");
  };
  // View Product Navigate
  const handleViewProduct = (slug) => {
    console.log(slug);
    navigation(`/dashboard/admin/products/viewProduct/${slug}`);
  };
  // Edit Product Navigate
  const handleEditProduct = (slug) => {
    navigation(`/dashboard/admin/products/editProduct/${slug}`);
  };

  // Delete Product
  const handleDeleteProduct = async (id) => {
    // console.log(id);
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/products/delete-product/${id}`
      );
      if (data?.success) {
        toast.success(data.message);
        getAllProducts();
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const handlePageClick = (data) => {
    // console.log(data.selected);
    setPageNumber(data.selected);
  };

  const pageCount = Math.ceil(products.length / userPerPage);

  useEffect(() => {
    console.log("UseEffect run map run");
    getAllProducts();

    // console.log("UseEffect run map run");
  }, []);

  return (
    <>
      <Layout title={"Products"}>
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-12">
                <div className="card">
                  <div className="card-header ">
                    <h3 className="float-start">Product</h3>
                    <button
                      className="btn btn-primary btn-sm float-end"
                      onClick={handleCreateProduct}
                    >
                      <i className="fa fa-fw fa-plus me-1"></i> Create Product
                    </button>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive p-0">
                      <table className="table table-bordered table-hover table-sm table-valign-middle ">
                        <thead className="table-primary">
                          <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Slug</th>
                            <th width="250">Description</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Quantity</th>
                            <th>photo</th>
                            <th>Shipping Address</th>
                            <th width="130">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {products
                            ?.slice(pagesVisited, pagesVisited + userPerPage)
                            .map((item, i) => {
                              console.log("Product map run");
                              return (
                                <tr key={i}>
                                  <td>{item._id}</td>
                                  <td>{item.name}</td>
                                  <td>{item.slug}</td>
                                  <td>
                                    {item.description.substring(0, 50)}...
                                  </td>
                                  <td> &#8377; {item.price}</td>
                                  <td>{item.category.name}</td>
                                  <td style={{ textAlign: "right" }}>
                                    {item.quantity}
                                  </td>
                                  <td>
                                    <img
                                      src={`${process.env.REACT_APP_API}/api/v1/products/product-photo/${item._id}`}
                                      alt=""
                                      className="img img-responsive"
                                      style={{
                                        height: "40px",
                                        border: "4px solid #e1e1e1",
                                      }}
                                    />
                                  </td>
                                  <td>
                                    {item.shippingAddress ? (
                                      <span className="text-white badge rounded-pill bg-primary ">
                                        Yes{" "}
                                      </span>
                                    ) : (
                                      <span className="text-white badge rounded-pill bg-danger">
                                        No
                                      </span>
                                    )}
                                  </td>
                                  <td align="center">
                                    <button
                                      className="btn btn-info btn-sm me-1 p-0"
                                      onClick={() => {
                                        handleViewProduct(item.slug);
                                      }}
                                    >
                                      <i className="fa fa-fw fa-eye text-dark"></i>
                                    </button>

                                    <button
                                      className="btn btn-primary btn-sm me-1 p-0"
                                      onClick={() => {
                                        handleEditProduct(item.slug);
                                      }}
                                    >
                                      <i className="fa fa-fw fa-pencil-square-o"></i>
                                    </button>

                                    <button
                                      className="btn btn-danger btn-sm me-1 p-0"
                                      onClick={() => {
                                        handleDeleteProduct(item._id);
                                      }}
                                    >
                                      <i className="fa fa-fw fa-trash"></i>
                                    </button>
                                  </td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </table>
                    </div>
                    <ReactPaginate
                      previousLabel={"Previous"}
                      nextLabel={"Next"}
                      breakLabel={"..."}
                      pageCount={pageCount}
                      marginPagesDisplayed={2}
                      pageRangeDisplayed={3}
                      onPageChange={handlePageClick}
                      containerClassName={"pagination float-end"}
                      pageClassName={"page-item"}
                      pageLinkClassName={"page-link"}
                      previousClassName={"page-item"}
                      previousLinkClassName={"page-link"}
                      nextClassName={"page-item"}
                      nextLinkClassName={"page-link"}
                      breakClassName={"page-item"}
                      breakLinkClassName={"page-link"}
                      activeClassName={"active"}
                      itemsPerPage={4}
                    />
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

export default Products;

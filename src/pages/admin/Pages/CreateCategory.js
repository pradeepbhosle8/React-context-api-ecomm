import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Layout from "../AdminLayout/Layout";
import axios from "axios";
import CategoryForm from "./Category/CategoryForm.js";
import { Modal } from "antd";
import ViewCategory from "./Category/ViewCategory";
import EditCategory from "./Category/EditCategory";
import ReactPaginate from "react-paginate";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  // pagination
  const [pageNumber, setPageNumber] = useState(0);
  const userPerPage = 10;
  const pagesVisited = pageNumber * userPerPage;

  // category section
  const [name, setName] = useState("");
  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/category/create-category`,
        { name }
      );
      console.log(data.category.name);
      if (data?.success) {
        toast.success(`${data.category.name} created successfully`);
        getAllCategories();
        setName("");
        handleClosedModel();
      } else {
        toast.error(`${data.category.name} could not be created`);
        setName("");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in input felids");
      setName("");
    }
  };

  // console.log(document.querySelector(".modal-backdrop"));

  // model pop uo close
  const handleClosedModel = () => {
    document.querySelectorAll(".modal").classList.remove("show");
    document.querySelector(".modal-backdrop").remove();
  };

  // get all categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/getCategory`
      );
      if (data.success) {
        setCategories(data.categories);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting all categories");
    }
  };

  // category Update Submission function
  const handelUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log(selected);
      // console.log(e);
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data.success) {
        toast.success(data.message);
        setSelected(null);
        setUpdatedName("");

        document.getElementById("EditCategoryModal").classList.remove("show");
        document.querySelector(".modal-backdrop").remove();
        getAllCategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong update category ");
    }
  };

  // category Delete submission function
  const handelDeleteSubmit = async (id) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/category/deleteCategory/${id}`
      );
      if (data.success) {
        toast.success(data.message);
        setSelected(null);
        setUpdatedName("");

        getAllCategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong deleting category");
    }
  };

  const handlePageClick = (data) => {
    // console.log(data.selected);
    setPageNumber(data.selected);
  };

  const pageCount = Math.ceil(categories.length / userPerPage);

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <>
      <Layout title={"Create Category"}>
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-12">
                <h1>Category</h1>
                <div className="col-sm-12">
                  <div className="card">
                    <div className="card-header ">
                      <h3 className="card-title">Category</h3>
                      <button
                        className="btn btn-primary btn-sm float-end"
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                      >
                        <i className="fa fa-fw fa-plus me-1"></i> Category
                      </button>
                    </div>
                    <div className="card-body">
                      <div className="card-body table-responsive p-0">
                        <table className="table table-hover table-sm table-valign-middle ">
                          <thead className="table-primary">
                            <tr>
                              <th>ID</th>
                              <th>Name</th>
                              <th>Slug</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {/* {console.log(categories)} */}
                            {categories ? (
                              categories?.length > 0 &&
                              categories
                                .slice(pagesVisited, pagesVisited + userPerPage)
                                .map((item, i) => {
                                  return (
                                    <tr key={i}>
                                      <td>{item._id}</td>
                                      <td>{item.name}</td>
                                      <td>{item.slug}</td>
                                      <td>
                                        <button
                                          className="btn btn-info btn-sm me-1"
                                          onClick={() => {
                                            setUpdatedName(item.name);
                                          }}
                                          data-bs-toggle="modal"
                                          data-bs-target="#viewCategoryModal"
                                        >
                                          <i className="fa fa-fw fa-eye text-dark"></i>
                                        </button>
                                        <button
                                          className="btn btn-primary btn-sm me-1"
                                          onClick={() => {
                                            setUpdatedName(item.name);
                                            setSelected(item);
                                          }}
                                          data-bs-toggle="modal"
                                          data-bs-target="#EditCategoryModal"
                                        >
                                          <i className="fa fa-fw fa-pencil-square-o"></i>
                                        </button>
                                        <button
                                          className="btn btn-danger btn-sm"
                                          onClick={() => {
                                            handelDeleteSubmit(item._id);
                                          }}
                                        >
                                          <i className="fa fa-fw fa-trash"></i>
                                        </button>
                                      </td>
                                    </tr>
                                  );
                                })
                            ) : (
                              <div
                                className="spinner-border text-primary"
                                role="status"
                              >
                                <span className="visually-hidden">
                                  Loading...
                                </span>
                              </div>
                            )}
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
        </div>

        <CategoryForm
          handleCategorySubmit={handleCategorySubmit}
          value={name}
          setValue={setName}
        />

        <ViewCategory value={updatedName} setValue={setUpdatedName} />

        <EditCategory
          value={updatedName}
          setValue={setUpdatedName}
          handleCategorySubmit={handelUpdateSubmit}
        />
      </Layout>
    </>
  );
};

export default CreateCategory;

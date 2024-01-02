import React, { useState, useEffect } from "react";
import Layout from "../AdminLayout/Layout";
import axios from "axios";
import { toast } from "react-toastify";
import format from "date-fns/format";
import { parseISO } from "date-fns";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";

const Users = () => {
  const [users, setUsers] = useState([]);

  // pagination
  const [pageNumber, setPageNumber] = useState(0);
  const userPerPage = 10;
  const pagesVisited = pageNumber * userPerPage;

  const navigate = useNavigate();
  const getAllUsers = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/users/usersAll`
      );
      // console.log(data.users);
      if (data?.success) {
        setUsers(data.users);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // handle Navigate Edit Product
  const handleEditUser = (id) => {
    // console.log(id);
    navigate(`/dashboard/admin/user/editUser/${id}`);
  };

  const handleDeleteUser = (id) => {
    console.log(id);
  };

  const handlePageClick = (data) => {
    // console.log(data.selected);
    setPageNumber(data.selected);
  };

  const pageCount = Math.ceil(users.length / userPerPage);

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div>
      <Layout title={"User"}>
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Users</h1>
                <div className="col-sm-6"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-12">
                <div className="card">
                  <div className="card-header">
                    <h3 className="float-start">User Info</h3>
                  </div>
                  <div className="card-body">
                    <div className="table table-responsive">
                      <table className="table table-hover table-sm ">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone No.</th>
                            <th>Answer</th>
                            <th>Address</th>
                            <th>Role</th>
                            <th>Create Date</th>
                            <th>Update Date</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {/* {console.log(users)} */}
                          {users ? (
                            users.length > 0 &&
                            users
                              .slice(pagesVisited, pagesVisited + userPerPage)
                              .map((user, index) => {
                                return (
                                  <tr key={index}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.answer}</td>
                                    <td>{user.address}</td>
                                    <td>{user.role}</td>
                                    <td>
                                      {format(
                                        parseISO(user.createdAt),
                                        "dd/MM/yyyy"
                                      )}
                                    </td>

                                    <td>
                                      {format(
                                        parseISO(user.updatedAt),
                                        "dd/MM/yyyy"
                                      )}
                                    </td>
                                    <td>
                                      <button
                                        className="btn btn-primary btn-sm me-1"
                                        onClick={() => {
                                          handleEditUser(user._id);
                                        }}
                                      >
                                        <i className="fa fa-fw fa-pencil-square-o"></i>
                                      </button>

                                      <button
                                        className="btn btn-danger btn-sm me-1"
                                        onClick={() => {
                                          handleDeleteUser(user._id);
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
      </Layout>
    </div>
  );
};

export default Users;

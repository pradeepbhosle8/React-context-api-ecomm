import React from "react";
import Layout from "../../../components/Layout/Layout";
import UserSidebar from "../UserSidebar";
import { useAuth } from "../../../context/auth";

const UserProfile = () => {
  const [auth, setAuth] = useAuth();

  return (
    <Layout>
      <UserSidebar />
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              {/* <div className="col-sm-12">{JSON.stringify(auth, null, 4)}</div> */}
              <div className="col-lg-12 col-sm-6 ">
                <div className="card">
                  <div className="card-header">
                    <h3>Profile Details</h3>
                  </div>
                  <div className="card-body">
                    <table className="table table-bordered table-hover table-stripe">
                      <thead>
                        <tr>
                          <th width="200px">Name : </th>
                          <td>{auth.user.name}</td>
                        </tr>
                        <tr>
                          <th>Email : </th>
                          <td>{auth.user.email}</td>
                        </tr>
                        <tr>
                          <th>Mobile Number : </th>
                          <td>{auth.user.phone}</td>
                        </tr>
                        <tr>
                          <th>Address : </th>
                          <td>{auth.user.address}</td>
                        </tr>
                      </thead>
                    </table>
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

export default UserProfile;

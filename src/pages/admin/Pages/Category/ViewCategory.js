import React from "react";

const ViewCategory = ({ handleCategorySubmit, value, setValue }) => {
  //   console.log(value, setValue);
  return (
    <>
      <div
        className="modal fade"
        id="viewCategoryModal"
        tabIndex={-1}
        aria-labelledby="viewCategoryModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header bg-primary ">
              <h1
                className="modal-title fs-5 text-white"
                id="viewCategoryModalLabel"
              >
                View Category
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <form onSubmit={handleCategorySubmit}>
                <div className="mb-3">
                  <label htmlFor="name"> Category</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Enter New Category Name"
                    value={value}
                    disabled
                  />
                </div>
                {/* <div className="form-group">
                  <button className="btn btn-primary" type="submit">
                    Submit
                  </button>
                </div> */}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewCategory;

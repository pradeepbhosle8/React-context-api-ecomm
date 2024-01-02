import React from "react";

const EditCategory = ({ handleCategorySubmit, value, setValue }) => {
  return (
    <>
      {/* Modal */}
      <div
        className="modal fade"
        id="EditCategoryModal"
        tabIndex={-1}
        aria-labelledby="EditCategoryModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header bg-primary ">
              <h1
                className="modal-title fs-5 text-white"
                id="EditCategoryModalLabel"
              >
                Update Category
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
                  <label htmlFor="name">Enter New Category</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Enter New Category Name"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <button className="btn btn-primary" type="submit">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditCategory;

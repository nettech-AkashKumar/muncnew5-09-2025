import React, {useState} from "react";

const CategoryModal = ({
  modalId,
  title,
  // isEditMode,
  categoryName,
  categorySlug,
  onCategoryChange,
  onSlugChange,
  onSubmit,
  submitLabel = "Submit",
  errors={}
}) => {

  
  return (
    <div className="modal" id={modalId} tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header" style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
            <h5 className="modal-title">{title}</h5>
            <button
              type="button"
              className=""
              data-bs-dismiss="modal"
              aria-label="Close"
              style={{color:'white', backgroundColor:'red', borderRadius:'50%'}}
            >x</button>
          </div>

          <form onSubmit={onSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">
                  Category Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={categoryName}
                  onChange={onCategoryChange}
                  required
                />
                {errors.categoryName && (
                  <p className="text-danger">{errors.categoryName}</p>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Category Slug <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={categorySlug}
                  onChange={onSlugChange}
                  required
                />
                {errors.categorySlug && (
                  <p className="text-danger">{errors.categorySlug}</p>
                )}
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                {submitLabel}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;

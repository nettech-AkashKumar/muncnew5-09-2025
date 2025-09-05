import React from 'react'

const Quotation = () => {
  return (
    <div>
      <div className="page-wrapper">
  <div className="content">
    <div className="page-header">
      <div className="add-item d-flex">
        <div className="page-title">
          <h4>Quotation List</h4>
          <h6>Manage Your Quotation</h6>
        </div>
      </div>
      <ul className="table-top-head">
        <li>
          <a data-bs-toggle="tooltip" data-bs-placement="top" title="Pdf"><img src="assets/img/icons/pdf.svg" alt="img" /></a>
        </li>
        <li>
          <a data-bs-toggle="tooltip" data-bs-placement="top" title="Excel"><img src="assets/img/icons/excel.svg" alt="img" /></a>
        </li>
        <li>
          <a data-bs-toggle="tooltip" data-bs-placement="top" title="Refresh"><i className="ti ti-refresh" /></a>
        </li>
        <li>
          <a data-bs-toggle="tooltip" data-bs-placement="top" title="Collapse" id="collapse-header"><i className="ti ti-chevron-up" /></a>
        </li>
      </ul>
      <div className="page-btn">
        <a href="#" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#add-quotation"><i className="ti ti-circle-plus me-1" />Add Quotation</a>
      </div>
    </div>
    {/* /product list */}
    <div className="card">
      <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
        <div className="search-set">
          <div className="search-input">
            <span className="btn-searchset"><i className="ti ti-search fs-14 feather-search" /></span>
          </div>
        </div>
        <div className="d-flex table-dropdown my-xl-auto right-content align-items-center flex-wrap row-gap-3">
          <div className="dropdown me-2">
            <a href="javascript:void(0);" className="dropdown-toggle btn btn-white btn-md d-inline-flex align-items-center" data-bs-toggle="dropdown">
              Product
            </a>
            <ul className="dropdown-menu  dropdown-menu-end p-3">
              <li>
                <a href="javascript:void(0);" className="dropdown-item rounded-1">Lenovo IdeaPad 3</a>
              </li>
              <li>
                <a href="javascript:void(0);" className="dropdown-item rounded-1">Beats Pro</a>
              </li>
              <li>
                <a href="javascript:void(0);" className="dropdown-item rounded-1">Nike Jordan</a>
              </li>
              <li>
                <a href="javascript:void(0);" className="dropdown-item rounded-1">Apple Series 5 Watch</a>
              </li>
            </ul>
          </div>
          <div className="dropdown me-2">
            <a href="javascript:void(0);" className="dropdown-toggle btn btn-white btn-md d-inline-flex align-items-center" data-bs-toggle="dropdown">
              Customer
            </a>
            <ul className="dropdown-menu  dropdown-menu-end p-3">
              <li>
                <a href="javascript:void(0);" className="dropdown-item rounded-1">Carl Evans</a>
              </li>
              <li>
                <a href="javascript:void(0);" className="dropdown-item rounded-1">Minerva Rameriz</a>
              </li>
              <li>
                <a href="javascript:void(0);" className="dropdown-item rounded-1">Robert Lamon</a>
              </li>
              <li>
                <a href="javascript:void(0);" className="dropdown-item rounded-1">Patricia Lewis</a>
              </li>
            </ul>
          </div>
          <div className="dropdown me-2">
            <a href="javascript:void(0);" className="dropdown-toggle btn btn-white btn-md d-inline-flex align-items-center" data-bs-toggle="dropdown">
              Status
            </a>
            <ul className="dropdown-menu  dropdown-menu-end p-3">
              <li>
                <a href="javascript:void(0);" className="dropdown-item rounded-1">Sent</a>
              </li>
              <li>
                <a href="javascript:void(0);" className="dropdown-item rounded-1">Pending</a>
              </li>
              <li>
                <a href="javascript:void(0);" className="dropdown-item rounded-1">Ordered</a>
              </li>
            </ul>
          </div>
          <div className="dropdown">
            <a href="javascript:void(0);" className="dropdown-toggle btn btn-white btn-md d-inline-flex align-items-center" data-bs-toggle="dropdown">
              Sort By : Last 7 Days
            </a>
            <ul className="dropdown-menu  dropdown-menu-end p-3">
              <li>
                <a href="javascript:void(0);" className="dropdown-item rounded-1">Recently Added</a>
              </li>
              <li>
                <a href="javascript:void(0);" className="dropdown-item rounded-1">Ascending</a>
              </li>
              <li>
                <a href="javascript:void(0);" className="dropdown-item rounded-1">Desending</a>
              </li>
              <li>
                <a href="javascript:void(0);" className="dropdown-item rounded-1">Last Month</a>
              </li>
              <li>
                <a href="javascript:void(0);" className="dropdown-item rounded-1">Last 7 Days</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table datatable">
            <thead className="thead-light">
              <tr>
                <th className="no-sort">
                  <label className="checkboxs">
                    <input type="checkbox" id="select-all" />
                    <span className="checkmarks" />
                  </label>
                </th>
                <th>Product Name</th>
                <th>Custmer Name</th>
                <th>Status</th>
                <th>Total</th>
                <th className="no-sort" />
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <label className="checkboxs">
                    <input type="checkbox" />
                    <span className="checkmarks" />
                  </label>
                </td>
                <td>
                  <div className="d-flex align-items-center me-2">
                    <a href="javascript:void(0);" className="avatar avatar-md me-2">
                      <img src="assets/img/products/stock-img-01.png" alt="product" />
                    </a>
                    <a href="javascript:void(0);">Lenovo 3rd Generation</a>
                  </div>
                </td>
                <td>
                  <div className="d-flex align-items-center">
                    <a href="javascript:void(0);" className="avatar avatar-md me-2">
                      <img src="assets/img/users/user-27.jpg" alt="product" />
                    </a>
                    <a href="javascript:void(0);">Carl Evans</a>
                  </div>
                </td>
                <td><span className="badge badge-success">Sent</span></td>
                <td>$550</td>
                <td>
                  <div className="edit-delete-action d-flex align-items-center">
                    <a className="me-2 p-2 mb-0 d-flex align-items-center border p-1 rounded" href="javascript:void(0);">
                      <i data-feather="eye" className="action-eye" />
                    </a>
                    <a className="me-2 p-2 mb-0 d-flex align-items-center border p-1 rounded" data-bs-toggle="modal" data-bs-target="#edit-quotation">
                      <i data-feather="edit" className="feather-edit" />
                    </a>
                    <a className="me-2 p-2 mb-0 d-flex align-items-center border p-1 rounded" href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#delete">
                      <i data-feather="trash-2" className="feather-trash-2" />
                    </a>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    {/* /product list */}
  </div>

</div>

    </div>
  )
}

export default Quotation

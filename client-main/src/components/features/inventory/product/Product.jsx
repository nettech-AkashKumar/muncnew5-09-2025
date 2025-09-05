// // final
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { FaFileExcel, FaFilePdf, FaPencilAlt } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import { FaShoppingBag } from "react-icons/fa";
// import "../../../../styles/product/product-list.css";
// import BASE_URL from "../../../../pages/config/config";
// import { CiCirclePlus } from "react-icons/ci";

// function ProductList() {
//   const [products, setProducts] = useState([]);
//   console.log("Products:", products);
//   const [activeTabs, setActiveTabs] = useState({});
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProducts = async () => {
//       const token = localStorage.getItem("token"); // Make sure the token is stored here after login

//       try {
//         const res = await axios.get(`${BASE_URL}/api/products`,{
//            headers: {
//           Authorization: `Bearer ${token}`, // ✅ token sent properly
//         },
//         });
//         setProducts(res.data);
//         // Initialize all to "general"
//         const initialTabs = res.data.reduce((acc, product) => {
//           acc[product._id] = "general";
//           return acc;
//         }, {});
//         setActiveTabs(initialTabs);
//       } catch (err) {
//         console.error("Failed to fetch products", err);
//       }
//     };
//     fetchProducts();
//   }, []);

//   const handleTabClick = (productId, tab) => {
//     setActiveTabs((prev) => ({ ...prev, [productId]: tab }));
//   };

//   return (
//     <div className="page-wrapper ">
//       <div className="content">
//         <div className="page-header">
//           <div className="add-item d-flex">
//             <div className="page-title">
//               <h4 className="fw-bold">Products</h4>
//               <h6>Manage your products</h6>
//             </div>
//           </div>

//           <div className="table-top-head me-2">
//             <li><button type="button" className="icon-btn" title="Pdf"><FaFilePdf /></button></li>
//             <li><label className="icon-btn m-0" title="Import Excel"><input type="file" accept=".xlsx, .xls" hidden /><FaFileExcel style={{ color: "green" }} /></label></li>
//             <li><button type="button" className="icon-btn" title="Export Excel"><FaFileExcel /></button></li>
//           </div>
//           <div className="d-flex gap-2">
//             {/* <a className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#add-purchase"><CiCirclePlus className="me-1" />Add Products</a> */}
//             {/* <a className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#view-notes"><i data-feather="download" className="me-2" />Import Purchase</a> */}
//           </div>
//         </div>

//         {products.length === 0 ? (
//           <p>Loading products...</p>
//         ) : (
//           products.map((product) => (
//             <div className="">
//               {/* All Content */}
//               <div className="contents gap-2">
//                 {/* Tabs */}
//                 <div className="button-group">
//                   {["general", "pricing", "description", "variants"].map(
//                     (tab) => (
//                       <div
//                         key={tab}
//                         className={`button-${activeTabs[product._id] === tab ? "active" : "inactive"
//                           } button-${tab}`}
//                         onClick={() => handleTabClick(product._id, tab)}
//                       >
//                         <p>
//                           {tab === "general"
//                             ? "General Information"
//                             : tab === "pricing"
//                               ? "Pricing & Tax"
//                               : tab === "description"
//                                 ? "Description & Media"
//                                 : "Variants"}
//                         </p>
//                       </div>
//                     )
//                   )}
//                 </div>

//                 {/* Toggle Sections */}
//                 <div className="toggle-section mb-3">
//                   {activeTabs[product._id] === "general" && (
//                     <div className="section-container">
//                       {/* Heading */}
//                       <div className="section-header">
//                         <div className="section-title">
//                           <div className="icon-container">
//                             <FaShoppingBag />
//                           </div>
//                           <div>
//                             <h1 className="section-title-text">
//                               {product.productName}
//                             </h1>
//                             <p className="section-subtitle">
//                               {/* SKU-KAPL-021 • Goods • Available Qty - 76kg */}
//                               SKU-{product.sku} • Available Qty -{" "}
//                               {product.quantity} {product.unit}
//                             </p>
//                           </div>
//                         </div>
//                         <div className="edit-icon" style={{ cursor: "pointer" }} onClick={() => navigate(`/product/edit/${product._id}`)}>
//                           <FaPencilAlt />
//                         </div>
//                       </div>

//                       {/* All Categories */}
//                       <div className="categories">
//                         {/* Category */}
//                         <div className="category">
//                           <div className="category-item">
//                             <p className="label">Category</p>
//                             <p className="value">
//                               {product.category?.categoryName}
//                             </p>
//                           </div>
//                           <div className="category-item">
//                             <p className="label">Supplier SKU</p>
//                             <p className="value">KAPL-011</p>
//                           </div>
//                           <div className="category-item">
//                             <p className="label">Reorder Level</p>
//                             <p className="value">{product.reorderLevel}</p>
//                           </div>
//                         </div>

//                         {/* Brands */}
//                         <div className="category">
//                           <div className="category-item">
//                             <p className="label">Brands/Manufacturer</p>
//                             <p className="value">{product.brand?.brandName}</p>
//                           </div>
//                           <div className="category-item">
//                             <p className="label">Barcode</p>
//                             <p className="value">{product.itemBarcode}</p>
//                             {/* <p className="value">EAN - 1234 5678 9090</p> */}
//                           </div>
//                           <div className="category-item">
//                             <p className="label">Initial Stock Quantity</p>
//                             <p className="value">{product.initialStock}</p>
//                           </div>
//                         </div>

//                         {/* Product Type */}
//                         <div className="category">
//                           <div className="category-item">
//                             <p className="label">Product Type</p>
//                             <p className="value">{product.itemType}</p>
//                           </div>
//                           <div className="category-item">
//                             <p className="label">Warehouse Location</p>
//                             <p className="value">{product.warehouse}</p>
//                           </div>
//                           <div className="category-item">
//                             <p className="label">Track by</p>
//                             <p className="value">Serial No.</p>
//                           </div>
//                         </div>

//                         {/* Supplier & Warehouse */}
//                         <div className="category">
//                           <div className="category-item">
//                             <p className="label">Supplier</p>
//                             <p className="value">{product.supplierName || '-'}</p>
//                           </div>
//                           <div className="category-item">
//                             <p className="label">Warehouse</p>
//                             <p className="value">{product.warehouseName || '-'}</p>
//                           </div>
//                           <div className="category-item">
//                             <p className="label">Lead Time</p>
//                             <p className="value">{product.leadTime}</p>
//                           </div>
//                           <div className="category-item">
//                             <p className="label">Status</p>
//                             <p className="value">{product.trackType}</p>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   )}

//                   {activeTabs[product._id] === "pricing" && (
//                     <div className="section-container">
//                       {/* Heading */}
//                       <div className="section-header">
//                         <div className="section-title">
//                           <div className="icon-container">
//                             <FaShoppingBag />
//                           </div>
//                           <div>
//                             <p className="section-title-text">{product.productName}</p>
//                             <p className="section-subtitle">
//                               SKU-{product.sku} • Available Qty -{" "}
//                               {product.quantity} {product.unit}
//                             </p>
//                           </div>
//                         </div>
//                         <div className="edit-icon">
//                           <FaPencilAlt />
//                         </div>
//                       </div>

//                       {/* All Categories */}
//                       <div className="categories">
//                         {/* Category */}
//                         <div className="category">
//                           <div className="category-item">
//                             <p className="label">Purchase Price</p>
//                             <p className="value">{product.purchasePrice}</p>
//                           </div>
//                           <div className="category-item">
//                             <p className="label">Unit</p>
//                             <p className="value">{product.unit}</p>
//                           </div>
//                           <div className="category-item">
//                             <p className="label">HSN / SAC</p>
//                             <p className="value">{product.hsnCode || '-'}</p>
//                           </div>
//                         </div>

//                         {/* Brands */}
//                         <div className="category">
//                           <div className="category-item">
//                             <p className="label">Selling price</p>
//                             <p className="value">{product.sellingPrice}</p>
//                           </div>
//                           <div className="category-item">
//                             <p className="label">Discount</p>
//                             <p className="value">{product.discountValue}</p>
//                             {/* <p className="value">EAN - 1234 5678 9090</p> */}
//                           </div>
//                           <div className="category-item">
//                             <p className="label">GST Rate</p>
//                             <p className="value">{product.tax}</p>
//                           </div>
//                         </div>

//                         {/* Product Type */}
//                         <div className="category">
//                           <div className="category-item">
//                             <p className="label">Wholesale Price / Bulk Price</p>
//                             <p className="value">{product.wholesalePrice}</p>
//                           </div>
//                           <div className="category-item">
//                             <p className="label">Discount Period</p>
//                             {/* <p className="value">{product.purchasePrice}</p> */}
//                           </div>
//                         </div>

//                         {/* Supplier */}
//                         <div className="category">
//                           <div className="category-item">
//                             <p className="label">Quantity</p>
//                             <p className="value"> {product.quantity}</p>
//                           </div>

//                         </div>
//                       </div>
//                     </div>
//                   )}

//                   {activeTabs[product._id] === "description" && (
//                     <div className="section-container">
//                       {/* Description & Media Content */}
//                       <div className="section-header">
//                         <div className="section-title">
//                           <div className="icon-container">
//                             <FaShoppingBag />
//                           </div>
//                           <div>
//                             <h1 className="section-title-text">
//                               {product.productName}
//                             </h1>
//                             <p className="section-subtitle">
//                               SKU-{product.sku} • Available Qty -{" "}
//                               {product.quantity} {product.unit}
//                             </p>
//                           </div>
//                         </div>
//                         <div className="edit-icon">
//                           <FaPencilAlt />
//                         </div>
//                       </div>
//                       <div>
//                         <div className="media-content">
//                           {product.images?.[0] && (
//                             <img
//                               src={product.images[0].url}
//                               alt={product.productName}
//                               className="media-image"
//                               style={{ height: "250px", width: "255px" }}
//                             />
//                           )}

//                           <div>
//                             <div className="seo-content">
//                               <div>
//                                 <p className="label">SEO META TITLE</p>
//                                 <p className="value">{product.seoTitle}</p>
//                               </div>
//                               <div>
//                                 <p className="label">SEO META Description</p>
//                                 <p className="value">{product.seoDescription}</p>
//                               </div>
//                             </div>
//                             <div>
//                               <p className="label">Description</p>
//                               <p className="value">{product.description}</p>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   )}

//                   {activeTabs[product._id] === "variants" && product.variants && (
//                     <div className="section-container">
//                       {/* Variants Content */}
//                       <div className="section-header">
//                         <div className="section-title">
//                           <div className="icon-container">
//                             <FaShoppingBag />
//                           </div>
//                           <div>
//                             <h1 className="section-title-text">
//                               {product.productName}
//                             </h1>
//                             <p className="section-subtitle">
//                               SKU-{product.sku} • Available Qty -{" "}
//                               {product.quantity} {product.unit}
//                             </p>
//                           </div>
//                         </div>
//                         <div className="edit-icon">
//                           <FaPencilAlt />
//                         </div>
//                       </div>
//                       <div className="variants mb-4">
//                         <div className="variants-header">
//                           <p className="label">Variant</p>
//                         </div>
//                         {Object.entries(product.variants).map(
//                           ([variant, qty]) => (
//                             <div key={variant} className="variants-content">
//                               <p>{variant}</p>
//                               <p>{qty}</p>
//                             </div>
//                           )
//                         )}
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }

// export default ProductList;
// // --------------------------------------------------



// final
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { FaFileExcel, FaFilePdf, FaPencilAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingBag } from "react-icons/fa";
import "../../../../styles/product/product-list.css";
import BASE_URL from "../../../../pages/config/config";
import { CiCirclePlus } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaAngleLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa";

function ProductList() {

  const [products, setProducts] = useState([]);
  // console.log("Products:", products);
  const [activeTabs, setActiveTabs] = useState({});
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/products`);
        setProducts(res.data);
        // Initialize all to "general"
        const initialTabs = res.data.reduce((acc, product) => {
          acc[product._id] = "general";
          return acc;
        }, {});
        setActiveTabs(initialTabs);
      } catch (err) {
        console.error("Failed to fetch products", err);
      }
    };
    fetchProducts();
  }, []);

  const handleTabClick = (productId, tab) => {
    setActiveTabs((prev) => ({ ...prev, [productId]: tab }));
  };

  //expiry code----------------------------------------------------------------------------------------------------------------------------------------------------------------------
  const [expiringProducts, setExpiringProducts] = useState([]);

  const getExpiryStatus = (expiryValue) => {
    const qtyString = Array.isArray(expiryValue) && expiryValue.length > 0 ? expiryValue[0] : expiryValue;

    if (typeof qtyString === "string" && qtyString.match(/^\d{2}-\d{2}-\d{4}$/)) {
      const [day, month, year] = qtyString.split("-").map(Number);
      const expiryDate = new Date(year, month - 1, day);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      expiryDate.setHours(0, 0, 0, 0);

      if (!isNaN(expiryDate.getTime())) {
        const diffTime = expiryDate - today;
        const daysDiff = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (daysDiff <= 0) return "Expired";
        if (daysDiff <= 2) return "Expiring Soon";
      }
    }
    return "";
  };

  const [expiringCount, setExpiringCount] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/products`);
        setProducts(res.data);

        let names = [];
        const count = res.data.reduce((acc, product) => {
          if (product.variants && product.variants.Expiry) {
            const status = getExpiryStatus(product.variants.Expiry);
            if (status === "Expired" || status === "Expiring Soon") {
              acc++;
              names.push(product.productName); // collect product name
            }
          }
          return acc;
        }, 0);

        setExpiringCount(count);
        setExpiringProducts(names);

        // Initialize tabs
        const initialTabs = res.data.reduce((acc, product) => {
          acc[product._id] = "general";
          return acc;
        }, {});
        setActiveTabs(initialTabs);
      } catch (err) {
        console.error("Failed to fetch products", err);
      }
    };
    fetchProducts();
  }, []);

  //popup-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  const [popup, setPopup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null); // store product
  const formRef = useRef(null);

  const handlePopupOpen = (product) => {
    setSelectedProduct(product); // set product
    setPopup(true); // open popup
  };

  const closeForm = () => {
    setPopup(false);
    setSelectedProduct(null); // clear selected product
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        closeForm();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const totalItems = products.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = products.slice(startIndex, endIndex);

  //delete product--------------------------------------------------------------------------------------------------------------------------------------------------------

  const handleDelete = async (product) => {
    console.log("Deleting product:", product);
    if (window.confirm(`Are you sure you want to delete ${product.productName}?`)) {
      try {
        await axios.delete(`${BASE_URL}/api/products/pro/${product._id}`);
        setProducts((prevProducts) =>
          prevProducts.filter((p) => p._id !== product._id)
        );
        if (paginatedData.length === 1 && currentPage > 1) {
          setCurrentPage((prev) => prev - 1);
        }
        alert("Product deleted successfully!");
      } catch (err) {
        console.error("Failed to delete product:", err.response?.data || err);
        alert(
          `Failed to delete product: ${err.response?.data?.message || err.message
          }`
        );
      }
    }
  };

  return (
    <>
    
      

      <div style={{padding:"100px 270px"}}>
        <div
          style={{
            background: "#fff",
            padding: "10px 20px",
            borderRadius: "12px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            marginTop: "0px",
          }}
        >
          <div style={{display:'flex',justifyContent:'space-between'}}>
          <div>
            <h5 style={{ marginBottom: "10px", fontWeight: "700", color: "#333" }}>
            Products
            </h5>
            <h6 style={{ fontWeight: '400' }}>Manage Your Products</h6>
          </div>
          
          <div className="d-flex gap-2">
            <Link to="/add-product"><a className="btn btn-primary" style={{marginTop:'5px'}}><CiCirclePlus className="me-1" />Add Products</a></Link>
          </div>
          </div>

          <div style={{ marginTop: '15px' }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
              }}
            >
              <thead>
                <tr style={{ background: "#f5f5f5", textAlign: "left" }}>
                  <th style={{ padding: "12px", borderTopLeftRadius: '12px' }}>Product Name</th>
                  <th style={{}}>SKU</th>
                  <th style={{}}>Available QTY</th>
                 
                  <th style={{}}>Status</th>
                
                  <th style={{}}>Selling price</th>
                 
                  <th style={{ textAlign: 'center', borderTopRightRadius: '12px' }}>Action</th>

                </tr>
              </thead>
              <tbody>
                {paginatedData.length === 0 ? (
                  <tr>
                    <td colSpan="6" style={{ textAlign: "center", padding: "12px" }}>
                      No products available
                    </td>
                  </tr>
                ) : (
                  paginatedData.map((product) => (
                    <tr key={product._id} style={{ borderBottom: "1px solid #eee", }}>
                      <td style={{ display: "flex", alignItems: 'center', gap: '10px', padding: '5px' }}>
                        {product.images?.[0] && (
                          <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            backgroundColor: 'white',
                            width: '40px',
                            height: '40px',
                            alignItems: 'center',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            border: '1px solid #ccc',
                            padding: '2px',
                          }}>
                            <img
                              src={product.images[0].url}
                              alt={product.productName}
                              style={{
                                height: "100%",
                                width: "100%",
                                objectFit: 'contain',
                              }}
                            />
                          </div>
                        )}
                        {!product.images?.[0] && (
                          <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            backgroundColor: 'white',
                            width: '40px',
                            height: '40px',
                            alignItems: 'center',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            border: '1px solid #ccc',
                            padding: '2px',
                          }}>
                            <span style={{ color: '#ccc', fontSize: '8px' }}>No Image</span>
                          </div>
                        )}
                        {product.productName}
                      </td>
                      <td style={{}}>{product.sku}</td>
                      <td style={{}}>{product.quantity} {product.unit}</td>
                     
                      <td style={{}}>{product.trackType}</td>
                      
                      <td style={{ padding: "12px" }}>₹{product.sellingPrice}</td>
                      
                      <td style={{}}>
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "5px" }}>
                          <button
                            style={{
                              // background: "#007bff",
                              // color: "#fff",
                              border: "none",
                              padding: "6px 12px",
                              borderRadius: "6px",
                              cursor: "pointer",
                              marginRight: "8px",
                            }}
                            onClick={() => handlePopupOpen(product)}
                          >
                            <IoEyeOutline />
                          </button>
                          <button
                            style={{
                              // background: "#007bff",
                              // color: "#fff",
                              border: "none",
                              padding: "6px 12px",
                              borderRadius: "6px",
                              cursor: "pointer",
                              marginRight: "8px",
                            }}
                            onClick={() => navigate(`/product/edit/${product._id}`)}
                          >
                            <FiEdit />
                          </button>
                          <button
                            style={{
                              // background: "#dc3545",
                              // color: "#fff",
                              border: "none",
                              padding: "6px 12px",
                              borderRadius: "6px",
                              cursor: "pointer",
                            }}
                            onClick={() => handleDelete(product)}
                          >

                            <RiDeleteBinLine />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
          marginTop: "20px",
          gap: "20px",
        }}
      >
        <div>{itemsPerPage} per page</div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span>
            {startIndex + 1}-{Math.min(endIndex, totalItems)} of {totalItems}
          </span>
          <span style={{ color: "grey" }}>|</span>
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            style={{
              border: "none",
              background: "none",
              cursor: currentPage === 1 ? "not-allowed" : "pointer",
            }}
          >
            <FaAngleLeft />
          </button>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            style={{
              border: "none",
              background: "none",
              cursor: currentPage === totalPages ? "not-allowed" : "pointer",
            }}
          >
            <FaChevronRight />
          </button>
        </div>
      </div>


      {/* popup */}
      {popup && (
        <div style={{
          position: 'fixed',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(199, 197, 197, 0.4)',
          backdropFilter: 'blur(1px)',
          display: 'flex',
          justifyContent: 'center',
          zIndex: '10',
          overflowY: 'auto',
        }}
        >
          <div ref={formRef} style={{ width: '1300px', height: '670px', margin: 'auto', padding: '10px 16px', overflowY: 'auto', borderRadius: '8px', backgroundColor: '#fff', boxShadow: '0 4px 8px rgba(0,0,0,0.2)', }}>

            <div className="">
              {/* All Content */}
              <div className="contents gap-2">
                {/* Heading */}
                <div className="section-header">
                  <div className="section-title">
                    <div className="icon-container" style={{ height: '70px', width: '70px', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '8px', overflow: 'hidden', border: '1px solid #ccc', padding: '2px', }}>
                      {/* <FaShoppingBag /> */}
                      {selectedProduct.images?.[0] && (
                        <img
                          src={selectedProduct.images[0].url}
                          alt={selectedProduct.productName}
                          className="media-image"
                          style={{ height: "100%", width: "100%", objectFit: 'contain' }}
                        />
                      )}
                    </div>

                    <div>
                      <h1 className="section-title-text">
                        {selectedProduct.productName}
                      </h1>
                      <p className="section-subtitle">
                        {/* SKU-KAPL-021 • Goods • Available Qty - 76kg */}
                        SKU-{selectedProduct.sku} • Available Qty -{" "}
                        {selectedProduct.quantity} {selectedProduct.unit}
                        {selectedProduct.variants && Object.keys(selectedProduct.variants).includes("Expiry") ? (
                          Object.entries(selectedProduct.variants)
                            .filter(([variant]) => variant === "Expiry")
                            .map(([variant, qty]) => {
                              let statusText = "";
                              let displayQty = "0"; // Default display value
                              let statusdisc = "";
                              // Extract qtyString from array or use qty directly
                              const qtyString = Array.isArray(qty) && qty.length > 0 ? qty[0] : qty;
                              // Set displayQty to qtyString if it's a string, else keep "0"
                              if (typeof qtyString === "string") {
                                displayQty = qtyString;
                              }
                              // Process date if qtyString matches DD-MM-YYYY format
                              if (typeof qtyString === "string" && qtyString.match(/^\d{2}-\d{2}-\d{4}$/)) {
                                try {
                                  const [day, month, year] = qtyString.split("-").map(Number);
                                  const expiryDate = new Date(year, month - 1, day);
                                  const today = new Date(); // Current date (August 27, 2025, 5:44 PM IST)
                                  today.setHours(0, 0, 0, 0); // Reset time to midnight
                                  expiryDate.setHours(0, 0, 0, 0); // Reset time for expiry
                                  if (!isNaN(expiryDate.getTime())) {
                                    const diffTime = expiryDate - today;
                                    const daysDiff = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                                    if (daysDiff <= 0) {
                                      statusdisc = "Expired";
                                    } else if (daysDiff <= 2) {
                                      statusdisc = "Expiring Soon";
                                    } else {
                                      statusdisc = "";
                                    }
                                  } else {
                                    console.log("Invalid date for qtyString:", qtyString); // Debug: Log invalid date
                                  }
                                } catch (error) {
                                  console.log("Error parsing date for qtyString:", qtyString, error); // Debug: Log errors
                                }
                              } else {
                                console.log("Non-string or invalid format qtyString:", qtyString); // Debug: Log invalid format
                              }
                              return (
                                <span key={variant} style={{ color: "red" }}>{statusdisc ? " • " + statusdisc : ""}</span>
                              );
                            })
                        ) : (
                          <span key="Expiry"></span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Tabs */}
                <div className="button-group">
                  {["general", "pricing", "description", "variants"].map(
                    (tab) => (
                      <div
                        key={tab}
                        className={`button-${activeTabs[selectedProduct._id] === tab ? "active" : "inactive"
                          } button-${tab}`}
                        onClick={() => handleTabClick(selectedProduct._id, tab)}
                      >
                        <p style={{ fontSize: '15px', fontWeight: '600', textTransform: 'none',cursor:'pointer' }}>
                          {tab === "general"
                            ? "General Information"
                            : tab === "pricing"
                              ? "Pricing & Tax"
                              : tab === "description"
                                ? "Description & Media"
                                : "Variants"}
                        </p>
                      </div>
                    )
                  )}
                </div>

                {/* Toggle Sections */}
                <div className="toggle-section mb-3">

                  {activeTabs[selectedProduct._id] === "general" && (
                    <div className="section-container">


                      {/* All Categories */}
                      <div className="categories">
                        {/* Category */}
                        <div className="category">
                          <div className="category-item">
                            <p className="label">Category</p>
                            <p className="value" style={{ textTransform: 'capitalize',padding:'4px 10px',fontSize:'20px',marginTop:'-20px' }}>
                              {selectedProduct.category?.categoryName}
                            </p>
                          </div>
                          <div className="category-item">
                            <p className="label">Supplier SKU</p>
                            <p className="value" style={{ textTransform: 'capitalize',padding:'4px 10px',fontSize:'20px',marginTop:'-20px' }}>
                              KAPL-011
                            </p>
                          </div>
                          <div className="category-item">
                            <p className="label">Reorder Level</p>
                            <p className="value" style={{ textTransform: 'capitalize',padding:'4px 10px',fontSize:'20px',marginTop:'-20px' }}>
                              {selectedProduct.reorderLevel}
                            </p>
                          </div>
                        </div>

                        {/* Brands */}
                        <div className="category">
                          <div className="category-item">
                            <p className="label">Brands/Manufacturer</p>
                            <p className="value" style={{ textTransform: 'capitalize',padding:'4px 10px',fontSize:'20px',marginTop:'-20px' }}>
                              {selectedProduct.brand?.brandName}
                            </p>
                          </div>
                          <div className="category-item">
                            <p className="label">Barcode</p>
                            <p className="value" style={{ textTransform: 'capitalize',padding:'4px 10px',fontSize:'20px',marginTop:'-20px' }}>
                              {selectedProduct.itemBarcode}
                            </p>
                            {/* <p className="value">EAN - 1234 5678 9090</p> */}
                          </div>
                          <div className="category-item">
                            <p className="label">Initial Stock Quantity</p>
                            <p className="value" style={{ textTransform: 'capitalize',padding:'4px 10px',fontSize:'20px',marginTop:'-20px' }}>
                              {selectedProduct.initialStock}
                            </p>
                          </div>
                        </div>

                        {/* Product Type */}
                        <div className="category">
                          <div className="category-item">
                            <p className="label">Product Type</p>
                            <p className="value" style={{ textTransform: 'capitalize',padding:'4px 10px',fontSize:'20px',marginTop:'-20px' }}>
                              {selectedProduct.itemType}
                            </p>
                          </div>
                          <div className="category-item">
                            <p className="label">Warehouse Location</p>
                            <p className="value" style={{ textTransform: 'capitalize',padding:'4px 10px',fontSize:'20px',marginTop:'-20px' }}>
                              {selectedProduct.warehouse}
                            </p>
                          </div>
                          <div className="category-item">
                            <p className="label">Track by</p>
                            <p className="value" style={{ textTransform: 'capitalize',padding:'4px 10px',fontSize:'20px',marginTop:'-20px' }}>
                              Serial No.
                            </p>
                          </div>
                        </div>

                        {/* Supplier & Warehouse */}
                        <div className="category">
                          <div className="category-item">
                            <p className="label">Supplier</p>
                            <p className="value" style={{ textTransform: 'capitalize',padding:'4px 10px',fontSize:'20px',marginTop:'-20px' }}>
                              {selectedProduct.supplierName || '-'}
                            </p>
                          </div>
                          <div className="category-item">
                            <p className="label">Warehouse</p>
                            <p className="value" style={{ textTransform: 'capitalize',padding:'4px 10px',fontSize:'20px',marginTop:'-20px' }}>
                              {selectedProduct.warehouseName || '-'}
                            </p>
                          </div>
                          <div className="category-item">
                            <p className="label">Lead Time</p>
                            <p className="value" style={{ textTransform: 'capitalize',padding:'4px 10px',fontSize:'20px',marginTop:'-20px' }}>
                              {selectedProduct.leadTime}
                            </p>
                          </div>
                          <div className="category-item">
                            <p className="label">Status</p>
                            <p className="value" style={{ textTransform: 'capitalize',padding:'4px 10px',fontSize:'20px',marginTop:'-20px' }}>
                              {selectedProduct.trackType}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTabs[selectedProduct._id] === "pricing" && (
                    <div className="section-container">


                      {/* All Categories */}
                      <div className="categories">
                        {/* Category */}
                        <div className="category">
                          <div className="category-item">
                            <p className="label">Purchase Price</p>
                            <p className="value" style={{ textTransform: 'capitalize',padding:'4px 10px',fontSize:'20px',marginTop:'-20px' }}>
                              {selectedProduct.purchasePrice}
                            </p>
                          </div>
                          <div className="category-item">
                            <p className="label">Unit</p>
                            <p className="value" style={{ textTransform: 'capitalize',padding:'4px 10px',fontSize:'20px',marginTop:'-20px' }}>
                              {selectedProduct.unit}
                            </p>
                          </div>
                          <div className="category-item">
                            <p className="label">HSN / SAC</p>
                            <p className="value" style={{ textTransform: 'capitalize',padding:'4px 10px',fontSize:'20px',marginTop:'-20px' }}>
                              {selectedProduct.hsnCode || '-'}
                            </p>
                          </div>
                        </div>

                        {/* Brands */}
                        <div className="category">
                          <div className="category-item">
                            <p className="label">Selling price</p>
                            <p className="value" style={{ textTransform: 'capitalize',padding:'4px 10px',fontSize:'20px',marginTop:'-20px' }}>
                              {selectedProduct.sellingPrice}
                            </p>
                          </div>
                          <div className="category-item">
                            <p className="label">Discount</p>
                            <p className="value" style={{ textTransform: 'capitalize',padding:'4px 10px',fontSize:'20px',marginTop:'-20px' }}>
                              {selectedProduct.discountValue}
                            </p>
                            {/* <p className="value">EAN - 1234 5678 9090</p> */}
                          </div>
                          <div className="category-item">
                            <p className="label">GST Rate</p>
                            <p className="value" style={{ textTransform: 'capitalize',padding:'4px 10px',fontSize:'20px',marginTop:'-20px' }}>
                              {selectedProduct.tax}
                            </p>
                          </div>
                        </div>

                        {/* Product Type */}
                        <div className="category">
                          <div className="category-item">
                            <p className="label">Wholesale Price / Bulk Price</p>
                            <p className="value" style={{ textTransform: 'capitalize',padding:'4px 10px',fontSize:'20px',marginTop:'-20px' }}>
                              {selectedProduct.wholesalePrice}
                            </p>
                          </div>
                          <div className="category-item">
                            <p className="label">Discount Period</p>
                            {/* <p className="value">{product.purchasePrice}</p> */}
                          </div>
                        </div>

                        {/* Supplier */}
                        <div className="category">
                          <div className="category-item">
                            <p className="label">Quantity</p>
                            <p className="value" style={{ textTransform: 'capitalize',padding:'4px 10px',fontSize:'20px',marginTop:'-20px' }}> 
                              {selectedProduct.quantity}
                            </p>
                          </div>

                        </div>
                      </div>
                    </div>
                  )}

                  {activeTabs[selectedProduct._id] === "description" && (
                    <div className="section-container">

                      <div>
                        <div className="media-content">
                          <div style={{ display: 'flex', justifyContent: 'center', width: '200px', height: '200px', alignItems: 'center', overflow: 'hidden', padding: '2px', marginRight: '20px', }}>
                            {selectedProduct.images?.[0] && (
                            <img
                              src={selectedProduct.images[0].url}
                              alt={selectedProduct.productName}
                              className="media-image"
                              style={{ height: "100%", width: "100%",objectFit: 'contain' }}
                            />
                          )}
                          </div>

                          <div>
                            <div className="seo-content">
                              <div>
                                <p className="label">SEO META TITLE</p>
                                <p className="value" style={{ textTransform: 'capitalize',padding:'4px 10px',fontSize:'20px',marginTop:'-20px' }}>
                                  {selectedProduct.seoTitle}
                                </p>
                              </div>
                              <div>
                                <p className="label">SEO META Description</p>
                                <p className="value" style={{ textTransform: 'capitalize',padding:'4px 10px',fontSize:'20px',marginTop:'-20px' }}>
                                  {selectedProduct.seoDescription}
                                </p>
                              </div>
                            </div>
                            <div>
                              <p className="label">Description</p>
                              <p className="value" style={{ fontWeight:'400',padding:'4px 10px',fontSize:'15px',marginTop:'-20px' }}>
                                {selectedProduct.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTabs[selectedProduct._id] === "variants" && selectedProduct.variants && (
                    <div className="section-container">

                      <div className="variants mb-4">
                        <div className="variants-header">
                          <p className="label">Variant</p>
                        </div>
                        {Object.entries(selectedProduct.variants).map(
                          ([variant, qty]) => (
                            <div key={variant} className="variants-content">
                              <p>{variant}</p>
                              <p>{qty}</p>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}

export default ProductList;

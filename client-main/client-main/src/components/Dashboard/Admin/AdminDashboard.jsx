import Graph from '../../Graph';
import React, { useEffect, useState } from 'react'
import { getTotalStockValue } from '../../../utils/getTotalStockValue';
import BASE_URL from '../../../pages/config/config'
// import '../../../styles/dashboard/admindashboard.css'
import '../../../styles/style.css'


const AdminDashboard = () => {
    // Helper to get absolute loss value
    const getLoss = () => {
        const profit = getProfit();
        return profit < 0 ? Math.abs(profit) : 0;
    };
    // useEffect(() => {
    //     const fetchProducts = async () => {
    //         try {
    //             const res = await axios.get('/api/products');
    //             const products = res.data || [];
    //             const today = new Date();
    //             const tenDaysLater = new Date();
    //             tenDaysLater.setDate(today.getDate() + 10);
    //             const filtered = products.filter(product => {
    //                 const expiryArr = product.variants?.get?.('Expiry') || product.variants?.['Expiry'];
    //                 if (!expiryArr || expiryArr.length === 0) return false;
    //                 return expiryArr.some(dateStr => {
    //                     const [day, month, year] = dateStr.split('-').map(Number);
    //                     if (!day || !month || !year) return false;
    //                     const expDate = new Date(year, month - 1, day);
    //                     return expDate >= today && expDate <= tenDaysLater;
    //                 });
    //             });
    //             setExpiredProducts(filtered);
    //         } catch (err) {
    //             setExpiredProducts([]);
    //         } finally {
    //             setExpiredLoading(false);
    //         }
    //     };
    //     fetchProducts();
    // }, []);
        useEffect(() => {
            const fetchProducts = async () => {
                try {
                    const res = await axios.get('/api/products');
                    const products = res.data || [];
                    // Use same logic as ExpriedProduct.jsx
                    const expired = products.filter(product => {
                        const expiryArr = product.variants?.get?.('Expiry') || product.variants?.['Expiry'];
                        if (!expiryArr || expiryArr.length === 0) return false;
                        return expiryArr.some(dateStr => {
                            const [day, month, year] = dateStr.split('-').map(Number);
                            if (!day || !month || !year) return false;
                            const expDate = new Date(year, month - 1, day);
                            const today = new Date();
                            return expDate < today;
                        });
                    });
                    setExpiredProducts(expired);
                } catch (err) {
                    setExpiredProducts([]);
                } finally {
                    setExpiredLoading(false);
                }
            };
            fetchProducts();
        }, []);
    // Profit/Loss calculation based on price and quantity
    const getProfit = () => {
        // Calculate total purchase cost
        let totalPurchase = 0;
        if (Array.isArray(recentPurchases)) {
            recentPurchases.forEach(purchase => {
                if (Array.isArray(purchase.products)) {
                    purchase.products.forEach(prod => {
                        totalPurchase += (Number(prod.purchasePrice) || 0) * (Number(prod.quantity) || 0);
                    });
                }
            });
        }
        // Calculate total sales revenue
        let totalSales = 0;
        if (Array.isArray(recentSales)) {
            recentSales.forEach(sale => {
                if (Array.isArray(sale.products)) {
                    sale.products.forEach(prod => {
                        totalSales += (Number(prod.sellingPrice) || 0) * (Number(prod.saleQty) || 0);
                    });
                }
            });
        }
        // Profit = Total Sales - Total Purchase
        return totalSales - totalPurchase;
    };
    const [recentPurchases, setRecentPurchases] = useState([]);
    const [activeTransactionTab, setActiveTransactionTab] = useState('sales');
    // const [recentPurchases, setRecentPurchases] = useState([]);
    const [user, setUser] = useState(null);
    const [notificationCount, setNotificationCount] = useState(0);
    const userObj = JSON.parse(localStorage.getItem("user"));
    const userId = userObj?.id || userObj?._id; // Handle both id and _id
    const token = localStorage.getItem("token");

    const [totalInvoiceDue, setTotalInvoiceDue] = useState(0);
    const [invoiceDueCount, setInvoiceDueCount] = useState(0);
    const [invoiceDueGrowth, setInvoiceDueGrowth] = useState(0);
    const [totalPurchaseReturnValue, setTotalPurchaseReturnValue] = useState(0);
    const [totalSupplier, setTotalSupplier] = useState(0);
    const [totalCustomer, setTotalCustomer] = useState(0);
    const [totalPurchaseAmount, setTotalPurchaseAmount] = useState(0);
    const [totalStockValue, setTotalStockValue] = useState(0);
    const [totalReturnAmount, setTotalReturnAmount] = useState(0);
    const [lowStockProducts, setLowStockProducts] = useState([]);
    const [recentSales, setRecentSales] = useState([]);
    const [totalSaleValue, setTotalSaleValue] = useState(0);
    const [totalSalesReturnValue, setTotalSalesReturnValue] = useState(0);
      const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [warned, setWarned] = useState(false);

    const [allSales, setAllSales] = useState([]);
    const [allPurchases, setAllPurchases] = useState([]);
    const [allSalesReturns, setAllSalesReturns] = useState([]);
    const [allPurchaseReturns, setAllPurchaseReturns] = useState([]);

    // console.log("Total Stock Value:", totalStockValue);
    // console.log("Total Purchase Amount:", totalPurchaseAmount);
    // console.log("Total Return Amount:", totalReturnAmount);
    // console.log("Low Stock Products:", invoiceDueCount);


        // Top Selling Products (by sale quantity)
    const topSellingProducts = (() => {
        const productSales = {};
        recentSales.forEach(sale => {
            sale.products?.forEach(prod => {
                const name = prod.productName || prod.name || 'N/A';
                productSales[name] = (productSales[name] || 0) + (prod.saleQty || 0);
            });
        });
        return Object.entries(productSales)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([name, qty]) => ({ name, qty }));
    })();
    
        // // Top Selling Products (by sale quantity)
        //         const topSellingProducts = (() => {
        //             const salesMap = {};
        //             recentSales.forEach(sale => {
        //                 sale.products?.forEach(prod => {
        //                     const pid = prod.productId?._id || prod.productId || prod._id;
        //                     if (!pid) return;
        //                     if (!salesMap[pid]) salesMap[pid] = 0;
        //                     salesMap[pid] += prod.saleQty || 0;
        //                 });
        //             });

        //             // For each top product, fetch sellingPrice and availableQty from products array
        //             const merged = Object.entries(salesMap)
        //                 .map(([pid, soldQty]) => {
        //                     const prod = products.find(p => p._id === pid);
        //                     let sellingPrice = '-';
        //                     let availableQuantity = '-';
        //                     if (prod) {
        //                         // Try to get sellingPrice from product or from variants
        //                         sellingPrice = prod.sellingPrice || (prod.variants?.sellingPrice) || '-';
        //                         // Try to get availableQty from product or from newQuantity
        //                         if (typeof prod.availableQty === 'number') {
        //                             availableQuantity = prod.availableQty;
        //                         } else if (typeof prod.quantity === 'number') {
        //                             availableQuantity = prod.quantity;
        //                         } else if (Array.isArray(prod.newQuantity)) {
        //                             availableQuantity = prod.newQuantity.reduce((acc, n) => acc + (Number(n) || 0), 0);
        //                         }
        //                     }
        //                     return {
        //                         productId: pid,
        //                         name: prod?.productName || prod?.name || 'N/A',
        //                         image: prod?.images?.[0]?.url || '',
        //                         sellingPrice,
        //                         sellQuantity: soldQty,
        //                         sku: prod?.sku || '-',
        //                         availableQuantity,
        //                     };
        //                 })
        //                 .sort((a, b) => b.sellQuantity - a.sellQuantity)
        //                 .slice(0, 5);
        //             return merged;
        //         })();




  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('/api/products');
        setProducts(res.data);
      } catch (err) {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (!loading && products.length > 0 && !warned) {
      const today = new Date();
      const tenDaysLater = new Date(today);
      tenDaysLater.setDate(today.getDate() + 10);
      const soonToExpire = products.filter(product => {
        const expiryArr = product.variants?.get?.('Expiry') || product.variants?.['Expiry'];
        if (!expiryArr || expiryArr.length === 0) return false;
        return expiryArr.some(dateStr => {
          // Accept formats like '30-08-2025'
          const [day, month, year] = dateStr.split('-').map(Number);
          if (!day || !month || !year) return false;
          const expDate = new Date(year, month - 1, day);
          return expDate >= today && expDate <= tenDaysLater;
        });
      });
      if (soonToExpire.length > 0) {
        window.toast && window.toast.warn('Some products are expiring within 10 days!');
        setWarned(true);
      }
    }
  }, [loading, products, warned]);

    // Expired products state
    const [expiredProducts, setExpiredProducts] = useState([]);
    const [expiredLoading, setExpiredLoading] = useState(true);

    useEffect(() => {
        // Fetch recent purchases
        fetch(`${BASE_URL}/api/purchases?limit=5&sort=desc`)
            .then(res => res.json())
            .then(data => {
                setRecentPurchases(Array.isArray(data.purchases) ? data.purchases : []);
            });


        // Fetch all invoices and calculate total due and count
        fetch(`${BASE_URL}/api/invoice/allinvoice`)
            .then(res => res.json())
            .then(data => {
                const invoices = Array.isArray(data.invoices) ? data.invoices : [];
                // Each row: { invoice, sale }
                let totalDue = 0;
                let dueCount = 0;
                invoices.forEach(row => {
                    const inv = row.invoice || {};
                    const sale = row.sale || {};
                    const due = Number(inv.dueAmount || sale.dueAmount || 0);
                    if (due > 0) dueCount++;
                    totalDue += due;
                });
                setTotalInvoiceDue(totalDue);
                setInvoiceDueCount(dueCount);
                // Example growth calculation: compare with last month
                // (Assume API returns lastMonthDueCount)
                if (typeof data.lastMonthDueCount === 'number' && data.lastMonthDueCount > 0) {
                    setInvoiceDueGrowth(Math.round(((dueCount - data.lastMonthDueCount) / data.lastMonthDueCount) * 100));
                } else {
                    setInvoiceDueGrowth(0);
                }
            });


        // Fetch total purchase return value
        fetch(`${BASE_URL}/api/purchase-returns?limit=1000000`)
            .then(res => res.json())
            .then(data => {
                const returns = data.returns || [];
                const totalReturnValue = returns.reduce((acc, ret) => acc + (ret.grandTotal || 0), 0);
                setTotalPurchaseReturnValue(totalReturnValue);
            });


        // Fetch suppliers
        fetch(`${BASE_URL}/api/suppliers`)
            .then(res => res.json())
            .then(data => setTotalSupplier(Array.isArray(data) ? data.length : 0));
        // Fetch customers
        fetch(`${BASE_URL}/api/customers`)
            .then(res => res.json())
            .then(data => setTotalCustomer(Array.isArray(data) ? data.length : 0));
        // Fetch purchases and returns
        fetch(`${BASE_URL}/api/purchases/report`)
            .then(res => res.json())
            .then(data => {
                setTotalPurchaseAmount(data?.totals?.purchase || 0);
                setTotalReturnAmount(data?.totals?.return || 0);
            });
        // Fetch total stock value
        getTotalStockValue().then(val => setTotalStockValue(val));
        // Fetch low stock products
        fetch(`${BASE_URL}/api/products?limit=1000000`)
            .then(res => res.json())
            .then(data => {
                const allProducts = data.products || data || [];
                const lowStock = allProducts
                    .map(p => {
                        let availableQty = 0;
                        if (typeof p.availableQty === 'number') {
                            availableQty = p.availableQty;
                        } else {
                            const quantity = Number(p.quantity ?? 0);
                            let newQuantitySum = 0;
                            if (Array.isArray(p.newQuantity)) {
                                newQuantitySum = p.newQuantity.reduce((acc, n) => {
                                    const num = Number(n);
                                    return acc + (isNaN(num) ? 0 : num);
                                }, 0);
                            } else if (typeof p.newQuantity === 'number') {
                                newQuantitySum = Number(p.newQuantity);
                            }
                            availableQty = quantity + newQuantitySum;
                        }
                        return { ...p, availableQty };
                    })
                    .filter(p => typeof p.quantityAlert === 'number' && p.availableQty <= p.quantityAlert && p.availableQty > 0);
                setLowStockProducts(lowStock.slice(0, 5)); // Show top 5
            });

            
        // Fetch recent sales for Recent Transactions
        fetch(`${BASE_URL}/api/sales?limit=5&sort=desc`)
            .then(res => res.json())
            .then(data => {
                setRecentSales((data.sales || []).slice(0, 5));
                // Calculate total sale value
                const totalValue = (data.sales || []).reduce((acc, sale) => acc + (sale.grandTotal || 0), 0);
                setTotalSaleValue(totalValue);
            });

        // Fetch total sales return value
        fetch(`${BASE_URL}/api/sales-returns?limit=1000000`)
            .then(res => res.json())
            .then(data => {
                const returns = data.returns || [];
                const totalReturnValue = returns.reduce((acc, ret) => acc + (ret.grandTotal || 0), 0);
                setTotalSalesReturnValue(totalReturnValue);
            });
    }, []);

    

// 🔹 helper function for fetch
const fetchData = async (url) => {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch " + url);
    return await res.json();
  } catch (err) {
    console.error(err);
    return {};
  }
};

// 🔹 fetch all sales
const fetchSales = async () => {
  const data = await fetchData(`${BASE_URL}/api/sales?limit=1000000`);
  const sales = data.sales || [];
  setAllSales(sales);
  setRecentSales(sales.slice(0, 5));
  setTotalSaleValue(sales.reduce((acc, sale) => acc + (sale.grandTotal || 0), 0));
};

// 🔹 fetch all purchases
const fetchPurchases = async () => {
  const data = await fetchData(`${BASE_URL}/api/purchases?limit=1000000`);
  setAllPurchases(data.purchases || []);
};

// 🔹 fetch all sales returns
const fetchSalesReturns = async () => {
    const data = await fetchData(`${BASE_URL}/api/sales-returns?limit=1000000`);
    const returns = Array.isArray(data.returns) ? data.returns : [];
    setAllSalesReturns(returns);
    const totalReturnValue = returns.length > 0
        ? returns.map(ret => Number(ret.grandTotal) || 0).reduce((acc, val) => acc + val, 0)
        : 0;
    setTotalSalesReturnValue(totalReturnValue);
};

// 🔹 fetch all purchase returns
const fetchPurchaseReturns = async () => {
  const data = await fetchData(`${BASE_URL}/api/purchase-returns?limit=1000000`);
  setAllPurchaseReturns(data.returns || []);
};

// 🔹 useEffect
useEffect(() => {
  fetchSales();
  fetchPurchases();
  fetchSalesReturns();
  fetchPurchaseReturns();
}, []);

// Calculate total purchase and return values from allPurchases and allPurchaseReturns
useEffect(() => {
  if (allPurchases.length > 0) {
    setTotalPurchaseAmount(
      allPurchases.reduce((acc, purchase) => acc + (purchase.grandTotal || 0), 0)
    );
  }

  if (allPurchaseReturns.length > 0) {
    setTotalReturnAmount(
      allPurchaseReturns.reduce((acc, ret) => acc + (ret.grandTotal || 0), 0)
    );
  }
}, [allPurchases, allPurchaseReturns]);



    return (
        <div className="page-wrapper">
            <div className="content">
                <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-2">

                    <div className="mb-3">
                        <h1 className="mb-1">Welcome,    {userObj?.firstName || 'User'} {userObj?.lastName || ''}</h1>
                        <p className="fw-medium">You have <span className="text-primary fw-bold">200+</span> Orders, Today</p>
                        {/* <div className="mt-3">
                            <h5>Recent Purchases</h5>
                            <ul>
                                {recentPurchases.length === 0 ? (
                                    <li>No recent purchases found.</li>
                                ) : (
                                    recentPurchases.map((purchase) => (
                                        <li key={purchase._id}>
                                            {purchase.referenceNumber} - {purchase.supplier ? `${purchase.supplier.firstName} ${purchase.supplier.lastName}` : 'N/A'} - {new Date(purchase.purchaseDate).toLocaleDateString()}
                                        </li>
                                    ))
                                )}
                            </ul>
                        </div> */}
                    </div>
                    <div className="input-icon-start position-relative mb-3">
                        <span className="input-icon-addon fs-16 text-gray-9">
                            <i className="ti ti-calendar" />
                        </span>
                        <input type="text" className="form-control date-range bookingrange" placeholder="Search Product" />
                    </div>
                </div>
                <div className="alert bg-orange-transparent alert-dismissible fade show mb-4">
                    <div style={{ overflowX: 'auto', whiteSpace: 'nowrap', maxWidth: '100%' }}>
                        {lowStockProducts.length > 0 ? lowStockProducts.map((prod, idx) => (
                            <span key={prod._id || idx} style={{ display: 'inline-block', marginRight: 24 }}>
                                <span><i className="ti ti-info-circle fs-14 text-orange me-2" />Your Product </span>
                                <span className="text-orange fw-semibold">{prod.productName || prod.name || '-'} is running Low, </span>
                                already below {prod.availableQty} Pcs.,
                                <a href="javascript:void(0);" className="link-orange text-decoration-underline fw-semibold" data-bs-toggle="modal" data-bs-target="#add-stock">Add Stock</a>
                            </span>
                        )) : (
                            <span>No low stock products.</span>
                        )}
                    </div>
                    <button type="button" className="btn-close text-gray-9 fs-14" data-bs-dismiss="alert" aria-label="Close"><i className="ti ti-x" /></button>
                </div>
                <div className="row">
                    {/* Invoice Due */}
                    {/* <div className="col-xl-3 col-sm-6 col-12 d-flex">
                        <div className="card bg-warning sale-widget flex-fill">
                            <div className="card-body d-flex align-items-center justify-content-between">
                                <div className="d-flex align-items-center">
                                    <span className="sale-icon bg-white text-warning">
                                        <i className="ti ti-currency-rupee fs-24" />
                                    </span>
                                    <div className="ms-2">
                                        <p className="text-white mb-1">Invoice Due</p>
                                        <div className="d-inline-flex align-items-center flex-wrap gap-2">
                                            <h4 className="text-white">₹ {totalInvoiceDue.toLocaleString()}</h4>
                                            <span className="badge badge-soft-warning"><i className="ti ti-arrow-up me-1" />{invoiceDueGrowth}% vs Last Month</span>
                                        </div>
                                        <p className="text-white mb-0 fs-14">Total Due Invoices: {invoiceDueCount}</p>
                                    </div>
                                </div>
                                <button className="btn btn-light btn-sm" onClick={() => window.location.href = '/invoice'}>View All</button>
                            </div>
                        </div>
                    </div> */}
                    <div className="col-xl-3 col-sm-6 col-12 d-flex">
                        <div className="card bg-primary sale-widget flex-fill">
                            <div className="card-body d-flex align-items-center">
                                <span className="sale-icon bg-white text-primary">
                                    <i className="ti ti-file-text fs-24" />
                                </span>
                                <div className="ms-2">
                                    <p className="text-white mb-1">Total Sales</p>
                                    <div className="d-inline-flex align-items-center flex-wrap gap-2">
                                        <h4 className="text-white">₹ {totalSaleValue.toLocaleString()}</h4>
                                        {/* <span className="badge badge-soft-primary"><i
                                            className="ti ti-arrow-up me-1" />+22%</span> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-sm-6 col-12 d-flex">
                        <div className="card bg-secondary sale-widget flex-fill">
                            <div className="card-body d-flex align-items-center">
                                <span className="sale-icon bg-white text-secondary">
                                    <i className="ti ti-repeat fs-24" />
                                </span>
                                <div className="ms-2">
                                    <p className="text-white mb-1">Total Sales Return</p>
                                    <div className="d-inline-flex align-items-center flex-wrap gap-2">
                                        <h4 className="text-white">₹ {totalSalesReturnValue.toLocaleString()}</h4>
                                        {/* <span className="badge badge-soft-danger"><i
                                            className="ti ti-arrow-down me-1" />-22%</span> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-sm-6 col-12 d-flex">
                        <div className="card bg-teal sale-widget flex-fill">
                            <div className="card-body d-flex align-items-center">
                                <span className="sale-icon bg-white text-teal">
                                    <i className="ti ti-gift fs-24" />
                                </span>
                                <div className="ms-2">
                                    <p className="text-white mb-1">Total Purchase</p>
                                    <div className="d-inline-flex align-items-center flex-wrap gap-2">
                                        <h4 className="text-white">₹ {totalStockValue.toLocaleString()}</h4>
                                        {/* <span className="badge badge-soft-success"><i
                                            className="ti ti-arrow-up me-1" />+22%</span> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-sm-6 col-12 d-flex">
                        <div className="card bg-info sale-widget flex-fill">
                            <div className="card-body d-flex align-items-center">
                                <span className="sale-icon bg-white text-info">
                                    <i className="ti ti-brand-pocket fs-24" />
                                </span>
                                <div className="ms-2">
                                    <p className="text-white mb-1">Total Purchase Return</p>
                                    <div className="d-inline-flex align-items-center flex-wrap gap-2">
                                        <h4 className="text-white">₹ {totalPurchaseReturnValue.toLocaleString()}</h4>
                                        {/* <span className="badge badge-soft-success"><i
                                            className="ti ti-arrow-up me-1" />+22%</span> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {/* Profit */}
                    <div className="col-xl-3 col-sm-6 col-12 d-flex">
                        <div className="card revenue-widget flex-fill">
                            <div className="card-body">
                                <div className="d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom">
                                    <div>
                                        <h4 className="mb-1">₹ {getProfit().toLocaleString()}</h4>
                                        <p className={getProfit() >= 0 ? 'text-success' : 'text-danger'}>
                                            Profit: ₹ {getProfit() >= 0 ? getProfit().toLocaleString() : 0}<br />
                                            Loss: <span className="text-danger">₹ {getLoss().toLocaleString()}</span>
                                        </p>
                                    </div>
                                    <span className="revenue-icon bg-cyan-transparent text-cyan">
                                        <i className="fa-solid fa-layer-group fs-16" />
                                    </span>
                                </div>
                                <div className="d-flex align-items-center justify-content-between">
                                    <p className="mb-0"><span className={`fs-13 fw-bold ${getProfit() >= 0 ? 'text-success' : 'text-danger'}`}>{getProfit() >= 0 ? '+' : ''}{getProfit().toLocaleString()} ({getProfit() >= 0 ? 'Profit' : 'Loss'})</span></p>
                                    <a href="profit-and-loss.html" className="text-decoration-underline fs-13 fw-medium">View
                                        All</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* /Profit */}
                    {/* Invoice */}
                    <div className="col-xl-3 col-sm-6 col-12 d-flex">
                        <div className="card revenue-widget flex-fill">
                            <div className="card-body">
                                <div className="d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom">
                                    <div>
                                        <h4 className="mb-1">₹ {totalInvoiceDue.toLocaleString()}</h4>
                                        <p>Invoice Due</p>
                                    </div>
                                    <span className="revenue-icon bg-teal-transparent text-teal">
                                        <i className="ti ti-chart-pie fs-16" />
                                    </span>
                                </div>
                                <div className="d-flex align-items-center justify-content-between">
                                    <p className="mb-0"><span className="fs-13 fw-bold text-success">+35%</span> vs Last Month
                                    </p>
                                    <a href="/invoice" className="text-decoration-underline fs-13 fw-medium">View
                                        All</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* /Invoice */}
                    {/* Expenses */}
                    <div className="col-xl-3 col-sm-6 col-12 d-flex">
                        <div className="card revenue-widget flex-fill">
                            <div className="card-body">
                                <div className="d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom">
                                    <div>
                                        <h4 className="mb-1">0</h4>
                                        <p>Total Expenses</p>
                                    </div>
                                    <span className="revenue-icon bg-orange-transparent text-orange">
                                        <i className="ti ti-lifebuoy fs-16" />
                                    </span>
                                </div>
                                <div className="d-flex align-items-center justify-content-between">
                                    <p className="mb-0"><span className="fs-13 fw-bold text-success">+41%</span> vs Last Month
                                    </p>
                                    <a href="expense-list.html" className="text-decoration-underline fs-13 fw-medium">View
                                        All</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* /Expenses */}
                    {/* Returns */}
                    <div className="col-xl-3 col-sm-6 col-12 d-flex">
                        <div className="card revenue-widget flex-fill">
                            <div className="card-body">
                                <div className="d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom">
                                    <div>
                                        <h4 className="mb-1">$78,458,798</h4>
                                        <p>Total Payment Returns</p>
                                    </div>
                                    <span className="revenue-icon bg-indigo-transparent text-indigo">
                                        <i className="ti ti-hash fs-16" />
                                    </span>
                                </div>
                                <div className="d-flex align-items-center justify-content-between">
                                    <p className="mb-0"><span className="fs-13 fw-bold text-danger">-20%</span> vs Last Month
                                    </p>
                                    <a href="sales-report.html" className="text-decoration-underline fs-13 fw-medium">View
                                        All</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* /Returns */}
                </div>
                <div className="row">
                    {/* Sales & Purchase Graphs */}
                    <div className="row">
                        <div className="col-md-6">
                            <div className="card mb-4">
                                <div className="card-header">Purchase Analytics</div>
                                <div className="card-body">
                                    <Graph
                                        title="Purchase Quantity & Price by Product"
                                        labels={lowStockProducts.map(p => p.name || p.productName || '-')}
                                        datasets={[{
                                            label: 'Quantity',
                                            data: lowStockProducts.map(p => p.availableQty || p.quantity || 0),
                                            backgroundColor: 'rgba(75,192,192,0.6)'
                                        }, {
                                            label: 'Price',
                                            data: lowStockProducts.map(p => p.purchasePrice || p.price || 0),
                                            backgroundColor: 'rgba(255,99,132,0.6)'
                                        }]}
                                        dates={lowStockProducts.map(p => p.purchaseDate || p.date || '')}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="card mb-4">
                                <div className="card-header">Sales Analytics</div>
                                <div className="card-body">
                                    <Graph
                                        title="Sales Qty & Selling Price by Product"
                                        labels={recentSales.flatMap(sale => sale.products ? sale.products.map(p => p.productName || p.name || '-') : [])}
                                        datasets={[{
                                            label: 'Sold Qty',
                                            data: recentSales.flatMap(sale => sale.products ? sale.products.map(p => p.saleQty || p.quantity || 0) : []),
                                            backgroundColor: 'rgba(153,102,255,0.6)'
                                        }, {
                                            label: 'Selling Price',
                                            data: recentSales.flatMap(sale => sale.products ? sale.products.map(p => p.sellingPrice || 0) : []),
                                            backgroundColor: 'rgba(255,206,86,0.6)'
                                        }]}
                                        dates={recentSales.flatMap(sale => sale.products ? sale.products.map(p => sale.saleDate || sale.date || '') : [])}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className="col-xxl-8 col-xl-7 col-sm-12 col-12 d-flex">
                        <div className="card flex-fill">
                            <div className="card-header d-flex justify-content-between align-items-center">
                                <div className="d-inline-flex align-items-center">
                                    <span className="title-icon bg-soft-primary fs-16 me-2"><i
                                        className="ti ti-shopping-cart" /></span>
                                    <h5 className="card-title mb-0">Sales &amp; Purchase</h5>
                                </div>
                                <ul className="nav btn-group custom-btn-group">
                                    <a className="btn btn-outline-light" href="javascript:void(0);">1D</a>
                                    <a className="btn btn-outline-light" href="javascript:void(0);">1W</a>
                                    <a className="btn btn-outline-light" href="javascript:void(0);">1M</a>
                                    <a className="btn btn-outline-light" href="javascript:void(0);">3M</a>
                                    <a className="btn btn-outline-light" href="javascript:void(0);">6M</a>
                                    <a className="btn btn-outline-light active" href="javascript:void(0);">1Y</a>
                                </ul>
                            </div>
                            <div className="card-body pb-0">
                                <div>
                                    <div className="d-flex align-items-center gap-2">
                                        <div className="border p-2 br-8">
                                            <p className="d-inline-flex align-items-center mb-1"><i
                                                className="ti ti-circle-filled fs-8 text-primary-300 me-1" />Total
                                                Purchase</p>
                                            <h4>3K</h4>
                                        </div>
                                        <div className="border p-2 br-8">
                                            <p className="d-inline-flex align-items-center mb-1"><i
                                                className="ti ti-circle-filled fs-8 text-primary me-1" />Total Sales</p>
                                            <h4>1K</h4>
                                        </div>
                                    </div>
                                    <div id="sales-daychart" />
                                </div>
                            </div>
                        </div>
                    </div> */}
                       {/* Recent Sales */}
                    <div className="col-xxl-8 col-xl-7 col-sm-12 col-12 d-flex">
                        <div className="card flex-fill">
                            <div className="card-header d-flex justify-content-between align-items-center flex-wrap gap-3">
                                <div className="d-inline-flex align-items-center">
                                    <span className="title-icon bg-soft-pink fs-16 me-2"><i className="ti ti-box" /></span>
                                    <h5 className="card-title mb-0">Recent Sales</h5>
                                </div>
                                <div className="dropdown">
                                    <a href="javascript:void(0);" className="dropdown-toggle btn btn-sm btn-white"
                                        data-bs-toggle="dropdown" aria-expanded="false">
                                        <i className="ti ti-calendar me-1" />Weekly
                                    </a>
                                    <ul className="dropdown-menu p-3">
                                        <li>
                                            <a href="javascript:void(0);" className="dropdown-item">Today</a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0);" className="dropdown-item">Weekly</a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0);" className="dropdown-item">Monthly</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table table-borderless custom-table">
                                        <thead className="thead-light">
                                            <tr>
                                                <th>Date</th>
                                                <th>Customer</th>
                                                <th>Product</th>
                                                {/* <th>Image</th>  */}
                                                <th>Sale Qty</th>
                                                <th>Selling Price</th>
                                                <th>Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {recentSales.length > 0 ? recentSales.map(sale => (
                                                sale.products && sale.products.length > 0 ? sale.products.map((product, idx) => (
                                                    <tr key={sale._id + '-' + idx}>
                                                        <td>{sale.saleDate ? new Date(sale.saleDate).toLocaleDateString() : '-'}</td>
                                                        {/* <td>
                                                            <div className="d-flex align-items-center file-name-icon">
                                                                <a href="javascript:void(0);" className="avatar avatar-md">
                                                                    <img src={sale.customer?.image || "assets/img/customer/customer16.jpg"} className="img-fluid" alt="img" />
                                                                </a>
                                                                <div className="ms-2">
                                                                    <h6><a href="javascript:void(0);" className="fw-bold">{sale.customer?.name || '-'}</a></h6>
                                                                </div>
                                                            </div>
                                                        </td> */}
                                                        <td>
                                                            <div className="d-flex align-items-center file-name-icon">
                                                                <a
                                                                    href="/customers"
                                                                    className="avatar avatar-md d-flex align-items-center justify-content-center rounded-circle text-white"
                                                                >
                                                                    {sale.customer?.image ? (
                                                                        <img
                                                                            src={sale.customer.image}
                                                                            className="img-fluid rounded-circle"
                                                                            alt="img"
                                                                        />
                                                                    ) : (
                                                                        <span className="fw-bold text-uppercase">
                                                                            {sale.customer?.name
                                                                                ? `${sale.customer.name.split(" ")[0]?.charAt(0) || ""}${sale.customer.name.split(" ").length > 1
                                                                                    ? sale.customer.name.split(" ").slice(-1)[0].charAt(0)
                                                                                    : ""
                                                                                }`
                                                                                : "-"}
                                                                        </span>
                                                                    )}
                                                                </a>
                                                                <div className="ms-2">
                                                                    <h6>
                                                                        <a href="javascript:void(0);" className="fw-bold">
                                                                            {sale.customer?.name || "-"}
                                                                        </a>
                                                                    </h6>
                                                                </div>
                                                            </div>
                                                        </td>


                                                        <td>{product.productName || product.name || '-'}</td>

                                                        <td>{product.saleQty || product.quantity || '-'}</td>
                                                        <td>₹{product.sellingPrice || '-'}</td>
                                                        <td>₹{(product.saleQty || product.quantity || 0) * (product.sellingPrice || 0)}</td>
                                                    </tr>
                                                )) : (
                                                    <tr key={sale._id}>
                                                        <td>{sale.saleDate ? new Date(sale.saleDate).toLocaleDateString() : '-'}</td>
                                                        <td>
                                                            <div className="d-flex align-items-center file-name-icon">
                                                                <a href="javascript:void(0);" className="avatar avatar-md">
                                                                    <img src={sale.customer?.image || "assets/img/customer/customer16.jpg"} className="img-fluid" alt="img" />
                                                                </a>
                                                                <div className="ms-2">
                                                                    <h6><a href="javascript:void(0);" className="fw-bold">{sale.customer?.name || '-'}</a></h6>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td colSpan="5" className="text-center text-muted">No products found.</td>
                                                    </tr>
                                                )
                                            )) : (
                                                <tr>
                                                    <td colSpan="7" className="text-center text-muted">No sales found.</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* /Recent Sales */}
                    {/* /Sales & Purchase */}
                    {/* Top Selling Products */}
                    <div className="col-xxl-4 col-xl-5 d-flex">
                        <div className="card flex-fill">
                            <div className="card-header">
                                <div className="d-inline-flex align-items-center">
                                    <span className="title-icon bg-soft-info fs-16 me-2"><i
                                        className="ti ti-info-circle" /></span>
                                    <h5 className="card-title mb-0">Overall Information</h5>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="row g-3">
                                    <div className="col-md-4">
                                        <div className="info-item border bg-light p-3 text-center">
                                            <div className="mb-2 text-info fs-24">
                                                <i className="ti ti-user-check" />
                                            </div>
                                            <p className="mb-1">Suppliers</p>
                                            <h5>{totalSupplier}</h5>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="info-item border bg-light p-3 text-center">
                                            <div className="mb-2 text-orange fs-24">
                                                <i className="ti ti-users" />
                                            </div>
                                            <p className="mb-1">Customer</p>
                                            <h5>{totalCustomer}</h5>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="info-item border bg-light p-3 text-center">
                                            <div className="mb-2 text-teal fs-24">
                                                <i className="ti ti-shopping-cart" />
                                            </div>
                                            <p className="mb-1">Orders</p>
                                            <h5>487</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer pb-sm-0">
                                <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                                    <h5>Customers Overview</h5>
                                    <div className="dropdown dropdown-wraper">
                                        <a href="javascript:void(0);" className="dropdown-toggle btn btn-sm btn-white"
                                            data-bs-toggle="dropdown" aria-expanded="false">
                                            <i className="ti ti-calendar me-1" />Today
                                        </a>
                                        <ul className="dropdown-menu p-3">
                                            <li>
                                                <a href="javascript:void(0);" className="dropdown-item">Today</a>
                                            </li>
                                            <li>
                                                <a href="javascript:void(0);" className="dropdown-item">Weekly</a>
                                            </li>
                                            <li>
                                                <a href="javascript:void(0);" className="dropdown-item">Monthly</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="row align-items-center">
                                    <div className="col-sm-5">
                                        <div id="customer-chart" />
                                    </div>
                                    <div className="col-sm-7">
                                        <div className="row gx-0">
                                            <div className="col-sm-6">
                                                <div className="text-center border-end">
                                                    <h2 className="mb-1">5.5K</h2>
                                                    <p className="text-orange mb-2">First Time</p>
                                                    <span
                                                        className="badge badge-success badge-xs d-inline-flex align-items-center"><i
                                                            className="ti ti-arrow-up-left me-1" />25%</span>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="text-center">
                                                    <h2 className="mb-1">3.5K</h2>
                                                    <p className="text-teal mb-2">Return</p>
                                                    <span
                                                        className="badge badge-success badge-xs d-inline-flex align-items-center"><i
                                                            className="ti ti-arrow-up-left me-1" />21%</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {/* Top Selling Products */}
                    <div className="col-xxl-4 col-md-6 d-flex">
                        <div className="card flex-fill">
                            <div className="card-header d-flex justify-content-between align-items-center flex-wrap gap-3">
                                <div className="d-inline-flex align-items-center">
                                    <span className="title-icon bg-soft-pink fs-16 me-2"><i className="ti ti-box" /></span>
                                    <h5 className="card-title mb-0">Top Selling Products</h5>
                                </div>
                                <div className="dropdown">
                                    <a href="javascript:void(0);" className="dropdown-toggle btn btn-sm btn-white"
                                        data-bs-toggle="dropdown" aria-expanded="false">
                                        <i className="ti ti-calendar me-1" />Today
                                    </a>
                                    <ul className="dropdown-menu p-3">
                                        <li>
                                            <a href="javascript:void(0);" className="dropdown-item">Today</a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0);" className="dropdown-item">Weekly</a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0);" className="dropdown-item">Monthly</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="card-body sell-product">
    {topSellingProducts.length === 0 ? (
        <div className="text-muted">No sales data available.</div>
    ) : (
        topSellingProducts.map((p, idx) => (
            <div
                key={p.productId || idx}
                className="d-flex align-items-center justify-content-between border-bottom py-2"
            >
                <div className="d-flex align-items-center">
                    <a href="javascript:void(0);" className="avatar avatar-lg">
                        <img
                            src={p.image || "assets/img/products/product-01.jpg"}
                            alt={p.name}
                            className="img-fluid"
                            style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: '6px' }}
                        />
                    </a>
                    <div className="ms-2">
                        <h6 className="fw-bold mb-1">
                            <a href="javascript:void(0);">{p.name}</a>
                        </h6>
                        <div className="d-flex align-items-center item-list">
                            <p className="mb-0 me-3">₹{p.sellingPrice}</p>
                            <p className="mb-0">{p.sellQuantity} Sold</p>
                        </div>
                        <div className="d-flex align-items-center item-list">
                            <span className="me-3">SKU: {p.sku}</span>
                            <span>Available: {p.availableQuantity}</span>
                        </div>
                    </div>
                </div>
            </div>
        ))
    )}
</div>

                          
{/* <div className="card shadow-sm border-0 mb-4">
  <div className="card-body">
    {topSellingProducts.length === 0 ? (
      <div className="text-muted">No sales data available.</div>
    ) : (
      <table className="table table-striped align-middle mb-0">
        <thead className="table-light">
          <tr>
            <th>Product</th>
            <th>Sell Qty</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {topSellingProducts.map((p, idx) => (
            <tr key={p.productId}>
              <td>{p.name}</td>
              <td>{p.sellQuantity}</td>
              <td>{p.availableQuantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
</div> */}
                        </div>
                    </div>
                    {/* /Top Selling Products */}
                    {/* Low Stock Products */}
                    <div className="col-xxl-4 col-md-6 d-flex">
                        <div className="card flex-fill">
                            <div className="card-header d-flex justify-content-between align-items-center flex-wrap gap-3">
                                <div className="d-inline-flex align-items-center">
                                    <span className="title-icon bg-soft-danger fs-16 me-2"><i
                                        className="ti ti-alert-triangle" /></span>
                                    <h5 className="card-title mb-0">Low Stock Products</h5>
                                </div>
                                <a href="/low-stocks" className="fs-13 fw-medium text-decoration-underline">View All</a>
                            </div>
                            <div className="card-body">
                                {lowStockProducts.length > 0 ? lowStockProducts.map(product => (
                                    <div className="d-flex align-items-center justify-content-between mb-4" key={product._id}>
                                        <div className="d-flex align-items-center">
                                            <a href="javascript:void(0);" className="avatar avatar-lg">
                                                {product.images?.[0] && (
                                                    <img src={product.images[0].url} alt={product.productName} />
                                                )}
                                            </a>
                                            <div className="ms-2">
                                                <h6 className="fw-bold mb-1"><a href="javascript:void(0);">{product.productName || product.name || 'N/A'}</a></h6>
                                                <p className="fs-13">ID : {product.sku || product._id}</p>
                                            </div>
                                        </div>
                                        <div className="text-end">
                                            <p className="fs-13 mb-1">Instock</p>
                                            <h6 className="text-orange fw-medium">{product.availableQty}</h6>
                                        </div>
                                    </div>
                                )) : <div className="text-center text-muted">No low stock products.</div>}
                            </div>
                        </div>
                    </div>
                    {/* /Low Stock Products */}
                    {/* Recent Sales */}
                    {/* <div className="col-xxl-4 col-md-12 d-flex">
                        <div className="card flex-fill">
                            <div className="card-header d-flex justify-content-between align-items-center flex-wrap gap-3">
                                <div className="d-inline-flex align-items-center">
                                    <span className="title-icon bg-soft-pink fs-16 me-2"><i className="ti ti-box" /></span>
                                    <h5 className="card-title mb-0">Recent Sales</h5>
                                </div>
                                <div className="dropdown">
                                    <a href="javascript:void(0);" className="dropdown-toggle btn btn-sm btn-white"
                                        data-bs-toggle="dropdown" aria-expanded="false">
                                        <i className="ti ti-calendar me-1" />Weekly
                                    </a>
                                    <ul className="dropdown-menu p-3">
                                        <li>
                                            <a href="javascript:void(0);" className="dropdown-item">Today</a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0);" className="dropdown-item">Weekly</a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0);" className="dropdown-item">Monthly</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table table-borderless custom-table">
                                        <thead className="thead-light">
                                            <tr>
                                                <th>Date</th>
                                                <th>Customer</th>
                                                <th>Product</th>
                                                <th>Image</th>
                                                <th>Sale Qty</th>
                                                <th>Selling Price</th>
                                                <th>Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {recentSales.length > 0 ? recentSales.map(sale => (
                                                sale.products && sale.products.length > 0 ? sale.products.map((product, idx) => (
                                                    <tr key={sale._id + '-' + idx}>
                                                        <td>{sale.saleDate ? new Date(sale.saleDate).toLocaleDateString() : '-'}</td>
                                                        <td>
                                                            <div className="d-flex align-items-center file-name-icon">
                                                                <a href="javascript:void(0);" className="avatar avatar-md">
                                                                    <img src={sale.customer?.image || "assets/img/customer/customer16.jpg"} className="img-fluid" alt="img" />
                                                                </a>
                                                                <div className="ms-2">
                                                                    <h6><a href="javascript:void(0);" className="fw-bold">{sale.customer?.name || '-'}</a></h6>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>{product.productName || product.name || '-'}</td>
                                                        <td>
                                                            <img src={product.image || product.images?.[0] || "assets/img/products/product-01.jpg"} alt="product" style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: '6px' }} />
                                                        </td>
                                                        <td>{product.saleQty || product.quantity || '-'}</td>
                                                        <td>₹{product.sellingPrice || '-'}</td>
                                                        <td>₹{(product.saleQty || product.quantity || 0) * (product.sellingPrice || 0)}</td>
                                                    </tr>
                                                )) : (
                                                    <tr key={sale._id}>
                                                        <td>{sale.saleDate ? new Date(sale.saleDate).toLocaleDateString() : '-'}</td>
                                                        <td>
                                                            <div className="d-flex align-items-center file-name-icon">
                                                                <a href="javascript:void(0);" className="avatar avatar-md">
                                                                    <img src={sale.customer?.image || "assets/img/customer/customer16.jpg"} className="img-fluid" alt="img" />
                                                                </a>
                                                                <div className="ms-2">
                                                                    <h6><a href="javascript:void(0);" className="fw-bold">{sale.customer?.name || '-'}</a></h6>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td colSpan="5" className="text-center text-muted">No products found.</td>
                                                    </tr>
                                                )
                                            )) : (
                                                <tr>
                                                    <td colSpan="7" className="text-center text-muted">No sales found.</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div> */}
                    {/* /Recent Sales */}
                      <div className="col-xl-4 col-sm-12 col-12 d-flex">
                        <div className="card flex-fill">
                            <div className="card-header d-flex align-items-center justify-content-between flex-wrap gap-3">
                                <div className="d-inline-flex align-items-center">
                                    <span className="title-icon bg-soft-orange fs-16 me-2"><i className="ti ti-flag" /></span>
                                    <h5 className="card-title mb-0">Recent Transactions</h5>
                                </div>
                                <a href="online-orders.html" className="fs-13 fw-medium text-decoration-underline">View
                                    All</a>
                            </div>
                            <div className="card-body p-0">
                                <ul className="nav nav-tabs nav-justified transaction-tab">
                                    <li className="nav-item"><a className="nav-link active" href="#sale"
                                        data-bs-toggle="tab">Sale</a></li>
                                    <li className="nav-item"><a className="nav-link" href="#purchase-transaction"
                                        data-bs-toggle="tab">Purchase</a></li>
                                    
                                    <li className="nav-item"><a className="nav-link" href="#invoices"
                                        data-bs-toggle="tab">Invoices</a></li>
                                </ul>
                                <div className="tab-content">
                                    <div className="tab-pane show active" id="sale">
                                        <div className="table-responsive">
                                            <table className="table table-borderless custom-table">
                                                <thead className="thead-light">
                                                    <tr>
                                                        <th>Date</th>
                                                        <th>Customer</th>
                                                        <th>Status</th>
                                                        <th>Total</th>
                                                        <th>Reference</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {recentSales.length > 0 ? recentSales.map(sale => (
                                                        <tr key={sale._id}>
                                                            <td>{sale.saleDate ? new Date(sale.saleDate).toLocaleDateString() : '-'}</td>
                                                            <td>
                                                                <div className="d-flex align-items-center file-name-icon">
                                                                    <a href="javascript:void(0);"                                                                    className="avatar avatar-md d-flex align-items-center justify-content-center rounded-circle text-white"
>
{sale.customer?.image ? (
                                                                        <img
                                                                            src={sale.customer.image}
                                                                            className="img-fluid rounded-circle"
                                                                            alt="img"
                                                                        />
                                                                    ) : (
                                                                        <span className="fw-bold text-uppercase">
                                                                            {sale.customer?.name
                                                                                ? `${sale.customer.name.split(" ")[0]?.charAt(0) || ""}${sale.customer.name.split(" ").length > 1
                                                                                    ? sale.customer.name.split(" ").slice(-1)[0].charAt(0)
                                                                                    : ""
                                                                                }`
                                                                                : "-"}
                                                                        </span>
                                                                    )}                                                                    </a>
                                                                    <div className="ms-2">
                                                                        <h6><a href="javascript:void(0);" className="fw-bold">{sale.customer?.name || '-'}</a></h6>
                                                                        <span className="fs-13 text-orange">{sale.referenceNumber || '-'}</span>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td><span className={`badge badge-xs d-inline-flex align-items-center ${sale.status === 'Completed' ? 'badge-success' : sale.status === 'Draft' ? 'badge-pink' : 'badge-warning'}`}><i className="ti ti-circle-filled fs-5 me-1" />{sale.status}</span></td>
                                                            <td className="fs-16 fw-bold text-gray-9">₹{sale.grandTotal || '-'}</td>
                                                            <td>{sale.referenceNumber || '-'}</td>
                                                        </tr>
                                                    )) : (
                                                        <tr>
                                                            <td colSpan="5" className="text-center text-muted">No sales found.</td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="purchase-transaction">
                                        <div className="table-responsive">
                                            <table className="table table-borderless custom-table">
                                                <thead className="thead-light">
                                                    <tr>
                                                        <th>Date</th>
                                                        <th>Supplier</th>
                                                        <th>Status</th>
                                                        <th>Total</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {recentPurchases.length === 0 ? (
                                                        <li>No recent purchases found.</li>
                                                    ) : (
                                                        recentPurchases.map((purchase) => (
                                                            <tr>
                                                                <td>{new Date(purchase.purchaseDate).toLocaleDateString()}</td>
                                                               
                                                                <td>
                                                                    <div className="d-flex align-items-center file-name-icon">
                                                                        <a href="javascript:void(0);" className="avatar avatar-md">
                                                                            <img src={sale.customer?.image || "assets/img/customer/customer16.jpg"} className="img-fluid" alt="img" />
                                                                        </a>
                                                                        <div className="ms-2">
                                                                            <h6><a href="javascript:void(0);" className="fw-bold">{purchase.supplier ? `${purchase.supplier.firstName} ${purchase.supplier.lastName}` : 'N/A'}</a></h6>
                                                                            <span className="fs-13 text-orange">{purchase.referenceNumber || '-'}</span>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td><span
                                                                    className="badge badge-success badge-xs d-inline-flex align-items-center"><i
                                                                        className="ti ti-circle-filled fs-5 me-1" />{purchase.status}</span>
                                                                </td>
                                                                <td className="text-gray-9">₹{purchase.grandTotal}</td>
                                                            </tr>

                                                        ))
                                                    )}


                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                  
                                    <div className="tab-pane" id="invoices">
                                        <div className="table-responsive">
                                            <table className="table table-borderless custom-table">
                                                <thead className="thead-light">
                                                    <tr>
                                                        <th>Customer</th>
                                                        <th>Due Amount</th>
                                                        <th>Paid Amount</th>
                                                        <th>Status</th>
                                                        <th>Amount</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {recentSales.length === 0 ? (
                                                        <li>No recent sales found.</li>
                                                    ) : (
                                                        recentSales.map((sale) => (
                                                           
                                                            <tr key={sale._id}>
                                                                <td>
                                                                    <div className="d-flex align-items-center file-name-icon">
                                                                        <a href="javascript:void(0);" className="avatar avatar-md">
                                                                            <img src={sale.customer?.image || "assets/img/customer/customer16.jpg"} className="img-fluid" alt="img" />
                                                                        </a>
                                                                        <div className="ms-2">
                                                                            <h6><a href="javascript:void(0);" className="fw-bold">{sale.customer?.name || '-'}</a></h6>
                                                                            <span className="fs-13 text-orange">{sale.invoiceId || sale.referenceNumber} </span>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>{sale.dueAmount}.</td>
                                                                <td>{sale.paidAmount}.</td>
                                                                <td><span
                                                                    className="badge badge-success badge-xs d-inline-flex align-items-center"><i
                                                                        className="ti ti-circle-filled fs-5 me-1" />{sale.status}</span>
                                                                </td>
                                                                <td className="text-gray-9">₹{sale.grandTotal}</td>
                                                            </tr>
                                                        ))
                                                    )}


                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    
                    {/* Recent Transactions */}
                    {/* <div className="col-xl-6 col-sm-12 col-12 d-flex">
                        <div className="card flex-fill">
                            <div className="card-header d-flex align-items-center justify-content-between flex-wrap gap-3">
                                <div className="d-inline-flex align-items-center">
                                    <span className="title-icon bg-soft-orange fs-16 me-2"><i className="ti ti-flag" /></span>
                                    <h5 className="card-title mb-0">Recent Transactions</h5>
                                </div>
                                <a href="online-orders.html" className="fs-13 fw-medium text-decoration-underline">View
                                    All</a>
                            </div>
                            <div className="card-body p-0">
                                <ul className="nav nav-tabs nav-justified transaction-tab">
                                    <li className="nav-item"><a className="nav-link active" href="#sale"
                                        data-bs-toggle="tab">Sale</a></li>
                                    <li className="nav-item"><a className="nav-link" href="#purchase-transaction"
                                        data-bs-toggle="tab">Purchase</a></li>
                                   
                                    <li className="nav-item"><a className="nav-link" href="#invoices"
                                        data-bs-toggle="tab">Invoices</a></li>
                                </ul>
                                <div className="tab-content">
                                    <div className="tab-pane show active" id="sale">
                                        <div className="table-responsive">
                                            <table className="table table-borderless custom-table">
                                                <thead className="thead-light">
                                                    <tr>
                                                        <th>Date</th>
                                                        <th>Customer</th>
                                                        <th>Status</th>
                                                        <th>Total</th>
                                                        <th>Reference</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {recentSales.length > 0 ? recentSales.map(sale => (
                                                        <tr key={sale._id}>
                                                            <td>{sale.saleDate ? new Date(sale.saleDate).toLocaleDateString() : '-'}</td>
                                                            <td>
                                                                <div className="d-flex align-items-center file-name-icon">
                                                                    <a href="javascript:void(0);" className="avatar avatar-md">
                                                                        <img src={sale.customer?.image || "assets/img/customer/customer16.jpg"} className="img-fluid" alt="img" />
                                                                    </a>
                                                                    <div className="ms-2">
                                                                        <h6><a href="javascript:void(0);" className="fw-bold">{sale.customer?.name || '-'}</a></h6>
                                                                        <span className="fs-13 text-orange">{sale.referenceNumber || '-'}</span>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td><span className={`badge badge-xs d-inline-flex align-items-center ${sale.status === 'Completed' ? 'badge-success' : sale.status === 'Draft' ? 'badge-pink' : 'badge-warning'}`}><i className="ti ti-circle-filled fs-5 me-1" />{sale.status}</span></td>
                                                            <td className="fs-16 fw-bold text-gray-9">₹{sale.grandTotal || '-'}</td>
                                                            <td>{sale.referenceNumber || '-'}</td>
                                                        </tr>
                                                    )) : (
                                                        <tr>
                                                            <td colSpan="5" className="text-center text-muted">No sales found.</td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="purchase-transaction">
                                        <div className="table-responsive">
                                            <table className="table table-borderless custom-table">
                                                <thead className="thead-light">
                                                    <tr>
                                                        <th>Date</th>
                                                        <th>Supplier</th>
                                                        <th>Status</th>
                                                        <th>Total</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {recentPurchases.length === 0 ? (
                                                        <li>No recent purchases found.</li>
                                                    ) : (
                                                        recentPurchases.map((purchase) => (
                                                            <tr>
                                                                <td>{new Date(purchase.purchaseDate).toLocaleDateString()}</td>
                                                             
                                                                <td>
                                                                    <div className="d-flex align-items-center file-name-icon">
                                                                        <a href="javascript:void(0);" className="avatar avatar-md">
                                                                            <img src={sale.customer?.image || "assets/img/customer/customer16.jpg"} className="img-fluid" alt="img" />
                                                                        </a>
                                                                        <div className="ms-2">
                                                                            <h6><a href="javascript:void(0);" className="fw-bold">{purchase.supplier ? `${purchase.supplier.firstName} ${purchase.supplier.lastName}` : 'N/A'}</a></h6>
                                                                            <span className="fs-13 text-orange">{purchase.referenceNumber || '-'}</span>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td><span
                                                                    className="badge badge-success badge-xs d-inline-flex align-items-center"><i
                                                                        className="ti ti-circle-filled fs-5 me-1" />{purchase.status}</span>
                                                                </td>
                                                                <td className="text-gray-9">₹{purchase.grandTotal}</td>
                                                            </tr>

                                                        ))
                                                    )}


                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                 
                                    <div className="tab-pane" id="invoices">
                                        <div className="table-responsive">
                                            <table className="table table-borderless custom-table">
                                                <thead className="thead-light">
                                                    <tr>
                                                        <th>Customer</th>
                                                        <th>Due Amount</th>
                                                        <th>Paid Amount</th>
                                                        <th>Status</th>
                                                        <th>Amount</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {recentSales.length === 0 ? (
                                                        <li>No recent sales found.</li>
                                                    ) : (
                                                        recentSales.map((sale) => (
                                                           
                                                            <tr key={sale._id}>
                                                                <td>
                                                                    <div className="d-flex align-items-center file-name-icon">
                                                                        <a href="javascript:void(0);" className="avatar avatar-md">
                                                                            <img src={sale.customer?.image || "assets/img/customer/customer16.jpg"} className="img-fluid" alt="img" />
                                                                        </a>
                                                                        <div className="ms-2">
                                                                            <h6><a href="javascript:void(0);" className="fw-bold">{sale.customer?.name || '-'}</a></h6>
                                                                            <span className="fs-13 text-orange">{sale.invoiceId || sale.referenceNumber} </span>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>{sale.dueAmount}.</td>
                                                                <td>{sale.paidAmount}.</td>
                                                                <td><span
                                                                    className="badge badge-success badge-xs d-inline-flex align-items-center"><i
                                                                        className="ti ti-circle-filled fs-5 me-1" />{sale.status}</span>
                                                                </td>
                                                                <td className="text-gray-9">₹{sale.grandTotal}</td>
                                                            </tr>
                                                        ))
                                                    )}


                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}
                    {/* /Recent Transactions */}
                 
                </div>
                   <div className="row">
                         <div className="col-xxl-12 col-xl-7 col-sm-12 col-12 d-flex">
                        <div className="card flex-fill">
                            <div className="card-header d-flex justify-content-between align-items-center flex-wrap gap-3">
                                <div className="d-inline-flex align-items-center">
                                    <span className="title-icon bg-soft-pink fs-16 me-2"><i className="ti ti-box" /></span>
                                    <h5 className="card-title mb-0">Expired Products</h5>
                                </div>
                                <div className="dropdown">
                                    <a href="javascript:void(0);" className="dropdown-toggle btn btn-sm btn-white"
                                        data-bs-toggle="dropdown" aria-expanded="false">
                                        <i className="ti ti-calendar me-1" />Weekly
                                    </a>
                                    <ul className="dropdown-menu p-3">
                                        <li>
                                            <a href="javascript:void(0);" className="dropdown-item">Today</a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0);" className="dropdown-item">Weekly</a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0);" className="dropdown-item">Monthly</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table table-borderless custom-table">
                                                    <thead className="thead-light">
                                                      <tr>
                                                        <th className="no-sort">
                                                          <label className="checkboxs">
                                                            <input type="checkbox" id="select-all" />
                                                            <span className="checkmarks" />
                                                          </label>
                                                        </th>
                                                        <th>SKU</th>
                                                        <th>Product</th>
                                                        <th>Manufactured Date</th>
                                                        <th>Expired Date</th>
                                                        <th>Quantity</th>
                                                        <th>Supplier</th>
                                                        <th>Warehouse</th>
                                                        <th className="no-sort" />
                                                      </tr>
                                                    </thead>
                                                    <tbody>
                                                      {products.filter(product => {
                                                        const expiryArr = product.variants?.get?.('Expiry') || product.variants?.['Expiry'];
                                                        if (!expiryArr || expiryArr.length === 0) return false;
                                                        // Only show products with at least one expiry date within next 10 days
                                                        return expiryArr.some(dateStr => {
                                                          const [day, month, year] = dateStr.split('-').map(Number);
                                                          if (!day || !month || !year) return false;
                                                          const expDate = new Date(year, month - 1, day);
                                                          const today = new Date();
                                                          const tenDaysLater = new Date();
                                                          tenDaysLater.setDate(today.getDate() + 10);
                                                          return expDate >= today && expDate <= tenDaysLater;
                                                        });
                                                      }).map(product => (
                                                        <tr key={product._id}>
                                                          <td>
                                                            <label className="checkboxs">
                                                              <input type="checkbox" />
                                                              <span className="checkmarks" />
                                                            </label>
                                                          </td>
                                                          <td>{product.sku || 'N/A'}</td>
                                                          <td>
                                                            <div className="d-flex align-items-center">
                                                              <a className="avatar avatar-md me-2">
                                                                {product.images?.[0] && (
                                                                  <img src={product.images[0].url} alt={product.productName} className="media-image" />
                                                                )}
                                                              </a>
                                                              <a>{product.productName || product.name || 'N/A'}</a>
                                                            </div>
                                                          </td>
                                                          <td>{(product.variants?.get?.('Manufactured') || product.variants?.['Manufactured'] || ['N/A']).join(', ')}</td>
                                                          <td>{(product.variants?.get?.('Expiry') || product.variants?.['Expiry'] || ['N/A']).join(', ')}</td>
                                                          <td>{product.quantity ?? 'N/A'}</td>
                                                          <td>{product.supplierName || 'N/A'}</td>
                                                          <td>{product.warehouseName || 'N/A'}</td>
                                                          <td className="action-table-data">
                                                            <div className="edit-delete-action">
                                                              <a data-bs-toggle="modal" data-bs-target="#edit-expired-product" className="me-2 p-2">
                                                                <TbEdit data-feather="edit" className="feather-edit" />
                                                              </a>
                                                              <a data-bs-toggle="modal" data-bs-target="#delete-modal" className="p-2">
                                                                <TbTrash data-feather="trash-2" className="feather-trash-2" />
                                                              </a>
                                                            </div>
                                                          </td>
                                                        </tr>
                                                      ))}
                                                    </tbody>
                                                  </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* /Recent Sales */}
                    </div>
            </div>
            {/* */}
        </div>

    )
}

export default AdminDashboard

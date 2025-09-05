


  import React, { useState, useEffect } from "react";
  import { DateRange } from "react-date-range";
  import { format } from "date-fns";
  import "react-date-range/dist/styles.css";
  import "react-date-range/dist/theme/default.css";
  import calendarIcon from "../../../assets/img/date.png";
  import { MdNavigateNext } from "react-icons/md";
  import { GrFormPrevious } from "react-icons/gr";
  import { useNavigate } from "react-router-dom";
  import * as XLSX from "xlsx";
  import { saveAs } from "file-saver";
  import BASE_URL from "../../config/config";   // ✅ import your config
import axios from "axios";



  const CreditDebitNotes = () => {
      const [debitData, setDebitData] = useState([]);
      // ✅ Fetch Debit Notes (Outflow)
  useEffect(() => {
    const fetchDebitNotes = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/debit-notes/getDebit?limit=10&page=1`);
        if (res.data.debitNotes) {
          setDebitData(res.data.debitNotes);
        } else if (res.data.data) {
          setDebitData(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching debit notes:", error);
      }
    };
    fetchDebitNotes();
  }, []);
    const data = [
      { date: "12 Jul 2025", from: "Electricity", type: "Short Circuit", invoiceNo: "UPI", amount: "Shop", paymentMode: "UPI", status: "Due" },
      { date: "12 Jul 2025", from: "Electricity", type: "Short Circuit", invoiceNo: "UPI", amount: "Shop", paymentMode: "UPI", status: "Paid" },
      { date: "12 Jul 2025", from: "Electricity", type: "Short Circuit", invoiceNo: "UPI", amount: "Shop", paymentMode: "UPI", status: "Paid" },
      { date: "12 Jul 2025", from: "Electricity", type: "Short Circuit", invoiceNo: "UPI", amount: "Shop", paymentMode: "UPI", status: "Due" },
      { date: "12 Jul 2025", from: "Electricity", type: "Short Circuit", invoiceNo: "UPI", amount: "Shop", paymentMode: "UPI", status: "Paid" },
    ];

    const data2 = [
      { date: "12 Jul 2025", to: "Electricity", type: "Short Circuit", invoiceNo: "UPI", amount: "Shop", paymentMode: "UPI", status: "Due" },
      { date: "12 Jul 2025", to: "Electricity", type: "Short Circuit", invoiceNo: "UPI", amount: "Shop", paymentMode: "UPI", status: "Paid" },
      { date: "12 Jul 2025", to: "Electricity", type: "Short Circuit", invoiceNo: "UPI", amount: "Shop", paymentMode: "UPI", status: "Paid" },
      { date: "12 Jul 2025", to: "Electricity", type: "Short Circuit", invoiceNo: "UPI", amount: "Shop", paymentMode: "UPI", status: "Due" },
      { date: "12 Jul 2025", to: "Electricity", type: "Short Circuit", invoiceNo: "UPI", amount: "Shop", paymentMode: "UPI", status: "Paid" },
    ];

    const [showCalendar, setShowCalendar] = useState(false);
    const [range, setRange] = useState([{ startDate: new Date("2025-01-01"), endDate: new Date("2025-03-31"), key: "selection" }]);
    const [activeTab, setActiveTab] = useState("inflow");
    const navigate = useNavigate();

  


    const handleChange = (item) => {
      setRange([item.selection]);
    };

    const toggleCalendar = () => {
      setShowCalendar(!showCalendar);
    };
      const handleExport = () => {
          // Convert JSON data to a worksheet
          const worksheet = XLSX.utils.json_to_sheet(data);
        
          // Create workbook and append the worksheet
          const workbook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(workbook, worksheet, "OverdueReport");
        
          // Write the workbook and save as Excel file
          const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
          const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
          saveAs(blob, "OverdueReport.xlsx");
        };


    return (
      <div className="page-wrapper">
        <div className="content">
          <div style={{ backgroundColor: "white", border: "1px solid #E6E6E6", borderRadius: "8px" }}>
        {/* Header */}
        <div className="d-flex justify-content-between" style={{ padding: "20px" }}>
          <span style={{ color: "#262626", fontFamily: '"Roboto", sans-serif', fontWeight: "500", fontSize: "18px" }}>
            Credit & Debit Notes
          </span>
          <button
          onClick={handleExport}
          style={{
            
            border: "none", backgroundColor: "#FFFFFF", boxShadow:
              "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
            borderRadius: "4px", padding: "5px 8px", color: "#676767", fontSize: "16px", fontWeight: "400",
            fontFamily: '"Roboto", sans-serif'
          }}>
            Export
          </button>
        </div>

        {/* Tabs */}
        <div style={{ borderTop: "1px solid #E6E6E6", borderBottom: "1px solid #E6E6E6" }}>
          <div style={{
            padding: "10px 20px", display: "flex", gap: "10px",
            fontFamily: '"Roboto", sans-serif', fontWeight: "400", fontSize: "16px"
          }}>
            <button onClick={() => setActiveTab("inflow")}
              style={{
                border: "none", backgroundColor: "white", color: "#080808ff",
                borderBottom: activeTab === "inflow" ? "2px solid grey" : "none",
              }}>
              Credit Notes
            </button>
            <button onClick={() => setActiveTab("outflow")}
              style={{
                backgroundColor: "white", border: "none",
                borderBottom: activeTab === "outflow" ? "2px solid grey" : "none",
              }}>
              Debit Notes
            </button>
          </div>
        </div>

        {/* Filters and Calendar */}
        <div className="d-flex justify-content-between align-items-center" style={{ padding: "15px 20px" }}>
          <div style={{ fontFamily: '"Roboto", sans-serif', fontWeight: "400", fontSize: "16px", display: "flex", gap: "10px" }}>
            <button style={{ border: "none", backgroundColor: "#E6E6E6", color: "#262626", padding: "3px 7px" }}>All</button>
            <button style={{ border: "none", backgroundColor: "#e6e6e60c", color: "#262626", padding: "3px 7px" }}>Issued</button>
            <button style={{ border: "none", backgroundColor: "#e6e6e60c", color: "#262626", padding: "3px 7px" }}>Refunded</button>
            <button style={{ border: "none", backgroundColor: "#e6e6e60c", color: "#262626", padding: "3px 7px" }}>Adjusted</button>
            <button style={{ border: "none", backgroundColor: "#e6e6e60c", color: "#262626", padding: "3px 7px" }}>Cancelled</button>
          </div>

          <div style={{ position: "relative", fontFamily: "Arial" }}>
            <div onClick={toggleCalendar} style={{
              border: "1px solid #E6E6E6", borderRadius: "8px", padding: "10px 12px", width: "250px",
              display: "flex", alignItems: "center", justifyContent: "space-between",
              cursor: "pointer", backgroundColor: "white",
            }}>
              <span style={{ fontSize: "14px", color: "#333" }}>
                {format(range[0].startDate, "dd/MM/yyyy")} - {format(range[0].endDate, "dd/MM/yyyy")}
              </span>
              <img src={calendarIcon} alt="calendar" style={{ width: "18px", height: "18px" }} />
            </div>

            {showCalendar && (
              <div style={{ position: "absolute", zIndex: 999, marginTop: "10px",right:"50px" }}>
                <DateRange editableDateInputs={true} onChange={handleChange}
                  moveRangeOnFirstSelection={false} ranges={range} rangeColors={["#1368EC"]} />
              </div>
            )}
          </div>
        </div>

        {/* Tables */}
        {activeTab === "inflow" ? (
          <InflowTable data={data} navigate={navigate} />
        ) : (
          <OutflowTable data={debitData} navigate={navigate}/>
        )}

      <div className="d-flex justify-content-end gap-3" style={{ padding: "10px 50px"}}>
                <span style={{
                  backgroundColor: "white", boxShadow: "rgb(0 0 0 / 4%) 0px 3px 8px",
                  padding: "7px", borderRadius: "5px",border:"1px solid #e4e0e0ff"
                }}>
                  10 <span style={{color:"grey"}}>per page</span>
                </span>
                <span style={{
                  backgroundColor: "white", boxShadow: "rgb(0 0 0 / 4%) 0px 3px 8px",
                  padding: "7px", borderRadius: "5px",border:"1px solid #e4e0e0ff"
                }}>
                  1-4 <span style={{color:"grey"}}>of 4</span>{" "}
                  <button style={{ border: "none", color: "grey", backgroundColor: "white" }}>
                    <GrFormPrevious />
                  </button>{" "}
                  <button style={{ border: "none", backgroundColor: "white" }}>
                    <MdNavigateNext />
                  </button>
                </span>
              </div>
      </div>
        </div>
      </div>
    );
  };

  // Inflow Table
  const InflowTable = ({ data, navigate }) => (
    <div className="table-responsive">
      <table className="table datatable">
        <thead >
          <tr>
            <th style={{ padding: "15px 20px" }}><input type="checkbox" /></th>
            <th style={{ padding: "15px 20px" }}>Date</th>
            <th style={{ padding: "15px 20px" }}>From</th>
            <th style={{ padding: "15px 20px" }}>Type</th>
            <th style={{ padding: "15px 20px" }}>Invoice No.</th>
            <th style={{ padding: "15px 20px" }}>Amount</th>
            <th style={{ padding: "15px 20px" }}>Payment Mode</th>
            <th style={{ padding: "15px 20px" }}>Status</th>
            <th style={{ padding: "15px 20px" }}>Actions</th>
          </tr>
        </thead>
        <tbody style={{
          color: "#262626", fontFamily: '"Roboto", sans-serif', fontWeight: "400", fontSize: "16px"
        }}>
          {data?.map((item, index) => (
            <tr key={index} style={{ borderBottom: "1px solid #E6E6E6", cursor: "pointer" }}
              onClick={() => navigate("/credit")}>
              <td style={{ padding: "10px 20px" }}><input type="checkbox" /></td>
              <td style={{ padding: "10px 20px" }}>{item.date}</td>
              <td style={{ padding: "10px 20px" }}>{item.from}</td>
              <td style={{ padding: "10px 20px" }}>{item.type}</td>
              <td style={{ padding: "10px 20px" }}>{item.invoiceNo}</td>
              <td style={{ padding: "10px 20px" }}>{item.amount}</td>
              <td style={{ padding: "10px 20px" }}>{item.paymentMode}</td>
              <td style={{ padding: "10px 20px" }}>
                <span style={{
                  padding: "5px", borderRadius: "5px",
                  backgroundColor: item.status === "Due" ? "#FCE4E6" : "#DFFFE0",
                  color: item.status === "Due" ? "#491E1F" : "#1E4921"
                }}>
                  {item.status}
                </span>
              </td>
              <td style={{ padding: "10px 20px", fontWeight: "800", color: "black" }}>...</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // Outflow Table
  // const OutflowTable = ({ data2,navigate }) => (
  //   <div className="table-container-outflow">
  //     <table className="w-100">
  //       <thead style={{
  //         backgroundColor: "#F1F1F1", color: "#676767", fontFamily: '"Roboto", sans-serif',
  //         fontWeight: "400", fontSize: "16px"
  //       }}>
  //         <tr>
  //           <th style={{ padding: "15px 20px" }}><input type="checkbox" /></th>
  //           <th style={{ padding: "15px 20px" }}>Date</th>
  //           <th style={{ padding: "15px 20px" }}>To</th>
  //           <th style={{ padding: "15px 20px" }}>Type</th>
  //           <th style={{ padding: "15px 20px" }}>Invoice No.</th>
  //           <th style={{ padding: "15px 20px" }}>Amount</th>
  //           <th style={{ padding: "15px 20px" }}>Payment Mode</th>
  //           <th style={{ padding: "15px 20px" }}>Status</th>
  //           <th style={{ padding: "15px 20px" }}>Actions</th>
  //         </tr>
  //       </thead>
  //       <tbody style={{
  //         color: "#262626", fontFamily: '"Roboto", sans-serif', fontWeight: "400", fontSize: "16px"
  //       }}>
  //         {data2.map((item, index) => (
  //           <tr key={index} style={{ borderBottom: "1px solid #E6E6E6",cursor:"pointer"}} onClick={() => navigate("/debit")}>
  //             <td style={{ padding: "10px 20px" }}><input type="checkbox" /></td>
  //             <td style={{ padding: "10px 20px" }}>{item.date}</td>
  //             <td style={{ padding: "10px 20px" }}>{item.to}</td>
  //             <td style={{ padding: "10px 20px" }}>{item.type}</td>
  //             <td style={{ padding: "10px 20px" }}>{item.invoiceNo}</td>
  //             <td style={{ padding: "10px 20px" }}>{item.amount}</td>
  //             <td style={{ padding: "10px 20px" }}>{item.paymentMode}</td>
  //             <td style={{ padding: "10px 20px" }}>
  //               <span style={{
  //                 padding: "5px", borderRadius: "5px",
  //                 backgroundColor: item.status === "Due" ? "#FCE4E6" : "#DFFFE0",
  //                 color: item.status === "Due" ? "#491E1F" : "#1E4921"
  //               }}>
  //                 {item.status}
  //               </span>
  //             </td>
  //             <td style={{ padding: "10px 20px", fontWeight: "800", color: "black" }}>...</td>
  //           </tr>
  //         ))}
  //       </tbody>
  //     </table>
  //   </div>
  // );
  const OutflowTable = ({ data, navigate }) => (
  <div className="table-responsive">
    <table className="table datatable">
      <thead >
        <tr>
          <th style={{ padding: "15px 20px" }}><input type="checkbox" /></th>
          <th style={{ padding: "15px 20px" }}>Date</th>
          <th style={{ padding: "15px 20px" }}>To</th>
          <th style={{ padding: "15px 20px" }}>Invoice No.</th>
          <th style={{ padding: "15px 20px" }}>Amount</th>
          <th style={{ padding: "15px 20px" }}>Status</th>
        </tr>
      </thead>
      <tbody style={{ color: "#262626", fontFamily: '"Roboto", sans-serif', fontWeight: "400", fontSize: "16px" }}>
        {data?.length > 0 ? (
          data.map((note, index) => (
            <tr key={note._id || index} style={{ borderBottom: "1px solid #E6E6E6", cursor: "pointer" }}
              onClick={() => navigate("/debit")}>
              <td style={{ padding: "10px 20px" }}><input type="checkbox" /></td>
              <td style={{ padding: "10px 20px" }}>{note.debitNoteDate ? new Date(note.debitNoteDate).toLocaleDateString() : "-"}</td>
              <td style={{ padding: "10px 20px" }}>{note.billTo?.name || note.billTo?.firstName || "-"}</td>
              <td style={{ padding: "10px 20px" }}>{note.debitNoteId || note._id}</td>
              <td style={{ padding: "10px 20px" }}>{note.total || "-"}</td>
              <td style={{ padding: "10px 20px" }}>
                <span style={{
                  padding: "5px", borderRadius: "5px",
                  backgroundColor: note.status === "Due" ? "#FCE4E6" : "#DFFFE0",
                  color: note.status === "Due" ? "#491E1F" : "#1E4921"
                }}>
                  {note.status}
                </span>
              </td>
            </tr>
          ))
        ) : (
          <tr><td colSpan="6" style={{ padding: "15px" }}>No Debit Notes Found</td></tr>
        )}
      </tbody>
    </table>
  </div>
);

  export default CreditDebitNotes;


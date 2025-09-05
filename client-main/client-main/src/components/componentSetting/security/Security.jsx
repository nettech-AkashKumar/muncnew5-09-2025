import React, { useCallback, useEffect, useState } from "react";
import { FiEyeOff } from "react-icons/fi";
import { GrShieldSecurity } from "react-icons/gr";
import { PiGoogleLogoFill } from "react-icons/pi";
import { IoCallOutline } from "react-icons/io5";
import { IoIosCheckmark } from "react-icons/io";
import { MdOutlineEmail } from "react-icons/md";
import { TbTool } from "react-icons/tb";
import { SlGraph } from "react-icons/sl";
import { IoBanOutline } from "react-icons/io5";
import { RiDeleteBinLine } from "react-icons/ri";
import "./Security.css";
import EmailVerification from "./Emailverification/EmailVerification";
import { GoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import MobileVerification from "./Emailverification/MobileVerification";
import DeviceManagement from "../../componentSetting/security/DeviceManagement/DeviceManagement.jsx";
import SecurityChangePassword from "./SecurityChangePassword/SecurityChangePassword";
import BASE_URL from "../../../pages/config/config";
import Lock from "../../../assets/images/Vectoreewws.png"
import Auuth from "../../../assets/images/Iconees.png"
import GAuuth from "../../../assets/images/Vector-1.png"
import Phver from "../../../assets/images/Icons-1.png"
import Emver from "../../../assets/images/Icons-2.png"
import Demanage from "../../../assets/images/Vector-2.png"
import AccntAct from "../../../assets/images/Icons-3.png"
import Deact from "../../../assets/images/Vector-3.png"
import DelAcc from "../../../assets/images/Icons-4.png"
import Eddit from "../../../assets/images/pencil2.png"
import Eye from "../../../assets/images/Seer.png"
import Delet from "../../../assets/images/Seers.png"
import Devcce from "../../../assets/images/Seeres.png"
import { toast } from "react-toastify";


const Security = () => {
  const [isOn, setIsOn] = useState(false);
  const [isOnTwo, setIsOnTwo] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  // const userId = localStorage.getItem("userId")
  const userData = JSON.parse(localStorage.getItem("user"));
  const userId = userData._id;
  // console.log("userId from security line 28", userId)

  // state to fetch userprofile info
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      const userData = JSON.parse(localStorage.getItem("user"));
      console.log("userData", userData);
      if (!userData?._id) return;
      try {
        const res = await axios.get(`${BASE_URL}/api/user/${userData._id}`);
        console.log("Response from /api/user:", res.data);

        setCurrentUser(res.data);
      } catch (error) {
        console.error("Error fetching current user", error);
      }
    };
    fetchUser();
  }, []);

  // show verifyemail modal state
  const [showOTPModal, setShowOTPModal] = useState(false);
  // show verifymobile modal state
  const [showmobileModal, setShowMobileModal] = useState(false);

  // device management
  const [devicemanage, setDeviceManage] = useState(false);

  // password changed
  const [changePassword, setChangedPassword] = useState(false);

  // function to toggle active and deactive
  const handleToggleStatus = async () => {
    try {
      const res = await axios.put(
        `${BASE_URL}/api/user/toggle-status/${userId}`
      );
      const updatedStatus = res.data.status;
      setCurrentUser((prev) => ({
        ...prev,
        status: updatedStatus,
      }));
      toast.info(
        `Account ${updatedStatus === "Active" ? "reactivated" : "deactivated"
        } successfully`,
        {
          position: 'top-center'
        }
      );
      console.log("Updated isActive:", res.data.status);
    } catch (error) {
      alert("Failed to update account status");
    }
  };

  // handle delete account
  const handleDeleteAccount = async () => {
    try {
      const res = await axios.delete(
        `${BASE_URL}/api/user/userDelete/${userId}`
      );
      alert(res.data.message || "Account Deleted");
      localStorage.removeItem("userId");
      window.location.href = "/login";
    } catch (error) {
      console.error("Error while deleting account", error);
    }
  };

  // for two factor authentication
  // fetch register user data here
  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await axios.get(`${BASE_URL}/api/user/${userId}`);
      setTwoFactorEnabled(data.twoFactorEnabled || false);
    };
    fetchUser();
  }, [userId]);

  const toggleTwoFactor = async () => {
    try {
      const { data } = await axios.put(
        `${BASE_URL}/api/user/toggle-2fa/${userId}`
      );
      setTwoFactorEnabled(data.twoFactorEnabled);
      toast.info(data.message, {
        position: 'top-center'
      })
    } catch (error) {
      console.error(error);
      alert("Failed to toggle 2FA");
    }
  };

  return (
    <div className="card flex-fill mb-0">
  <div className="card-header">
    <h4 className="fs-18 fw-bold">Security</h4>
  </div>
  <div className="card-body">
    <div>
      <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-3 border-bottom mb-3 pb-3">
        <div className="d-flex align-items-center">
          <span className="avatar avatar-lg border bg-light fs-24 me-2">
            <i className="ti ti-eye-off text-gray-900 fs-18" />
          </span>
          <div>
            <h5 className="fs-16 fw-medium mb-1">Password</h5>
            <p className="fs-16">Last Changed {currentUser?.passwordChangedAt
                    ? new Date(
                      currentUser.passwordChangedAt
                    ).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })
                    : "N/A"}</p>
          </div>
        </div>
        <a  className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#change-password" onClick={() => setChangedPassword(true)}>Change Password</a>
          <SecurityChangePassword
                isOpen={changePassword}
                onClose={() => setChangedPassword(false)}
              />
      </div>
      <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-3 border-bottom mb-3 pb-3">
        <div className="d-flex align-items-center">
          <span className="avatar avatar-lg border bg-light fs-24 me-2">
            <i className="ti ti-shield text-gray-900 fs-18" />
          </span>
          <div>
            <h5 className="fs-16 fw-medium mb-1">Two Factor Authentication</h5>
            <p className="fs-16">Receive codes via SMS or email every time you login</p>
          </div>
        </div>
        <div className="status-toggle modal-status d-flex justify-content-between align-items-center ms-2">
          <input type="checkbox" id="user3" className="check" checked={twoFactorEnabled} onChange={toggleTwoFactor}  />
          <label htmlFor="user3" className="checktoggle">	</label>
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-3 border-bottom mb-3 pb-3">
        <div className="d-flex align-items-center">
          <span className="avatar avatar-lg border bg-light fs-24 me-2">
            <i className="ti ti-brand-google text-gray-900 fs-18" />
          </span>
          <div>
            <h5 className="fs-16 fw-medium mb-1">Google Authentication</h5>
            <p className="fs-16">Connect to Google</p>
          </div>
        </div>
        <div className="d-flex align-items-center">
          {/* <span className="badge bg-outline-success">Connected</span> */}
           <GoogleLogin
                onSuccess={async (credentialResponse) => {
                  try {
                    const res = await axios.post(
                      `${BASE_URL}/api/auth/google`,
                      {
                        token: credentialResponse.credential,
                      }
                    );
                    console.log("Logged in user:", res.data);
                    localStorage.setItem(
                      "userinfoviagoogleauth",
                      JSON.stringify(res.data)
                    );
                  } catch (error) {
                    console.error("Login failed", error);
                  }
                }}
                onError={() => {
                  console.log("Login Failed");
                }}
                render={(renderProps) => (
                  <button
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,

                    }}
                  >
                    <FcGoogle size={32} />
                  </button>
                )}
              />
          <div className="status-toggle modal-status d-flex justify-content-between align-items-center ms-3">
            <input type="checkbox" id="user4" className="check" defaultChecked />
            <label htmlFor="user4" className="checktoggle">	</label>
          </div>
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-3 border-bottom mb-3 pb-3">
        <div className="d-flex align-items-center">
          <span className="avatar avatar-lg border bg-light fs-24 me-2">
            <i className="ti ti-phone text-gray-900 fs-18" />
          </span>
          <div>
            <h5 className="fs-16 fw-medium mb-1">Phone Number Verification</h5>
            <p className="fs-16">Verified Mobile Number : {currentUser?.phone}</p>
          </div>
        </div>
        <div className="d-flex align-items-center">
          <span className="fs-20 text-success me-3">
            <i className="ti ti-circle-check-filled" />
          </span>
          <a onClick={() => setShowMobileModal(true)}  className="btn btn-primary mt-0" data-bs-toggle="modal" data-bs-target="#phone-verification">Change</a>
          <MobileVerification
                isOpen={showmobileModal}
                onClose={() => setShowMobileModal(false)}
              />
          <a  className="btn btn-secondary ms-3" onClick={() => setShowMobileModal(false)}>Remove</a>
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-3 border-bottom mb-3 pb-3">
        <div className="d-flex align-items-center">
          <span className="avatar avatar-lg border bg-light fs-24 me-2">
            <i className="ti ti-mail text-gray-900 fs-18" />
          </span>
          <div>
            <h5 className="fs-16 fw-medium mb-1">Email Verification</h5>
            <p className="fs-16">Verified Email : {currentUser?.email || "Not available"} </p>
          </div>
        </div>
        <div className="d-flex align-items-center">
          <span className="fs-20 text-success me-3">
            <i className="ti ti-circle-check-filled" />
          </span>
          <a  className="btn btn-primary mt-0" data-bs-toggle="modal" data-bs-target="#email-verification" onClick={() => setShowOTPModal(true)}>Change</a>
                      {showOTPModal && (
                <EmailVerification
                  isOpen={showOTPModal}
                  onClose={() => setShowOTPModal(false)}
                />
              )}
          <a  className="btn btn-secondary ms-3"  onClick={() => setShowOTPModal(false)}>Remove</a>
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-3 border-bottom mb-3 pb-3">
        <div className="d-flex align-items-center">
          <span className="avatar avatar-lg border bg-light fs-24 me-2">
            <i className="ti ti-tool text-gray-900 fs-18" />
          </span>
          <div>
            <h5 className="fs-16 fw-medium mb-1">Device Management</h5>
            <p className="fs-16">Manage devices associated with the account</p>
          </div>
        </div>
        <a onClick={() => setDeviceManage(true)} className="btn btn-primary mt-0" data-bs-toggle="modal" data-bs-target="#device-management">Manage</a>
          {devicemanage && (
                <DeviceManagement
                  isOpen={devicemanage}
                  onClose={() => setDeviceManage(false)}
                  userId={userId}
                />
              )}
      </div>
      <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-3 border-bottom mb-3 pb-3">
        <div className="d-flex align-items-center">
          <span className="avatar avatar-lg border bg-light fs-24 me-2">
            <i className="ti ti-activity text-gray-900 fs-18" />
          </span>
          <div>
            <h5 className="fs-16 fw-medium mb-1">Account Activity</h5>
            <p className="fs-16">Manage activities associated with the account</p>
          </div>
        </div>
        <a onClick={() => setDeviceManage(true)} className="btn btn-primary mt-0" data-bs-toggle="modal" data-bs-target="#account-activity">View</a>
      </div>
      <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-3 border-bottom mb-3 pb-3">
        <div className="d-flex align-items-center">
          <span className="avatar avatar-lg border bg-light fs-24 me-2">
            <i className="ti ti-ban text-gray-900 fs-18" />
          </span>
          <div>
            <h5 className="fs-16 fw-medium mb-1">Deactivate Account</h5>
            <p className="fs-16">This will shutdown your account. Your account will be reactive when you sign in again</p>
          </div>
        </div>
        <a  className="btn btn-primary mt-0">Deactivate</a>
      </div>
      <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-3">
        <div className="d-flex align-items-center">
          <span className="avatar avatar-lg border bg-light fs-24 me-2">
            <i className="ti ti-trash text-gray-900 fs-18" />
          </span>
          <div>
            <h5 className="fs-16 fw-medium mb-1">Delete Account</h5>
            <p className="fs-16">Your account will be permanently deleted</p>
          </div>
        </div>
        <a onClick={handleDeleteAccount}  className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#delete-account">Delete</a>
      </div>
    </div>
  </div>
</div>

    // <div>
    //   <div
    //     className="security-container"
    //   >
    //     <div>
    //       <h1 className="sseddetryprof">
    //         Profile
    //       </h1>
    //       <hr style={{ margin: "0", height: '1px', color: '#bdbdbdff' }} />
    //     </div>
    //     <div className="notification-content px-3">
    //       <div
    //         style={{
    //           display: "flex",
    //           justifyContent: "space-between",
    //           alignItems: "center",
    //           marginTop: '12px',
    //           marginBottom: '13px'
    //         }}
    //       >
    //         <div style={{ display: "flex", gap: "8px", padding: "15px 0" }}>
    //           <div
    //             style={{
    //               backgroundColor: " #F1F1F1",
    //               width: "35px",
    //               height: "35px",
    //               display: "flex",
    //               justifyContent: "center",
    //               alignItems: "center",
    //             }}
    //           >
    //             <img src={Lock} alt="" />
    //           </div>
    //           <div style={{ display: "flex", flexDirection: "column", gap: '5px' }}>
    //             <span className="sseddetryprof" style={{ fontWeight: "600" }}>Password</span>
    //             <span className="sseddetryprofchannged" style={{ color: "grey" }}>
    //               Last Changed{" "}
    //               {currentUser?.passwordChangedAt
    //                 ? new Date(
    //                   currentUser.passwordChangedAt
    //                 ).toLocaleDateString("en-GB", {
    //                   day: "2-digit",
    //                   month: "short",
    //                   year: "numeric",
    //                   hour: "2-digit",
    //                   minute: "2-digit",
    //                   hour12: true,
    //                 })
    //                 : "N/A"}
    //             </span>
    //           </div>
    //         </div>
    //         <div>
    //           <img src={Eddit} alt="" style={{ height: '16px', width: '16px', cursor: 'pointer' }} onClick={() => setChangedPassword(true)} />
    //           <SecurityChangePassword
    //             isOpen={changePassword}
    //             onClose={() => setChangedPassword(false)}
    //           />
    //         </div>
    //       </div>
    //       <div
    //         style={{
    //           display: "flex",
    //           justifyContent: "space-between",
    //           alignItems: "center",
    //           marginBottom: '13px'
    //         }}
    //       >
    //         <div style={{ display: "flex", gap: "8px", padding: "15px 0" }}>
    //           <div
    //             style={{
    //               backgroundColor: " #F1F1F1",
    //               width: "35px",
    //               height: "35px",
    //               display: "flex",
    //               justifyContent: "center",
    //               alignItems: "center",
    //             }}
    //           >
    //             <img src={Auuth} alt="" />
    //           </div>
    //           <div style={{ display: "flex", flexDirection: "column", gap: '5px' }}>
    //             <span className="sseddetryprof" style={{ fontWeight: "600" }}>
    //               Two Factor Authentication
    //             </span>
    //             <span className="sseddetryprofchannged" style={{ color: "grey" }}>
    //               Receive codes via Email every time you login
    //             </span>
    //           </div>
    //         </div>
    //         <div>
    //           <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
    //             <input type="checkbox" checked={twoFactorEnabled} onChange={toggleTwoFactor} style={{ display: 'none' }} />
    //             <span
    //               style={{
    //                 width: '50px', height: '24px', backgroundColor: twoFactorEnabled ? "#5cb85c" : "#d9534f", borderRadius: '12px', position: 'relative', transition: 'background-color 0.3s'
    //               }}
    //             >
    //               <span
    //                 style={{
    //                   position: 'absolute',
    //                   top: '2px',
    //                   left: twoFactorEnabled ? "26px" : "2px",
    //                   width: '20px',
    //                   height: '20px',
    //                   backgroundColor: "white",
    //                   borderRadius: "50%",
    //                   transition: "left 0.3s",
    //                 }}
    //               >
    //               </span>
    //               <span style={{ marginLeft: '10px', color: '#333', fontWeight: 'bold' }}>
    //                 {twoFactorEnabled ? "" : ""}
    //               </span>
    //             </span>
    //           </label>
    //         </div>
    //       </div>
    //       <div
    //         style={{
    //           display: "flex",
    //           justifyContent: "space-between",
    //           alignItems: "center",
    //           marginBottom: '13px'
    //         }}
    //       >
    //         <div style={{ display: "flex", gap: "8px", padding: "15px 0" }}>
    //           <div
    //             style={{
    //               backgroundColor: " #F1F1F1",
    //               width: "35px",
    //               height: "35px",
    //               display: "flex",
    //               justifyContent: "center",
    //               alignItems: "center",
    //             }}
    //           >
    //             <img src={GAuuth} alt="" />
    //           </div>
    //           <div style={{ display: "flex", flexDirection: "column", gap: '5px' }}>
    //             <span className="sseddetryprof" style={{ fontWeight: "600" }}>Google Authentication</span>
    //             <span className="sseddetryprofchannged" style={{ color: "grey" }}>Connect to Google</span>
    //           </div>
    //         </div>
    //         <div
    //           style={{
    //             display: "flex",
    //             gap: "5px",
    //             alignItems: "center",
    //           }}
    //         >
    //           {/* Google Auth */}
    //           <GoogleLogin
    //             onSuccess={async (credentialResponse) => {
    //               try {
    //                 const res = await axios.post(
    //                   `${BASE_URL}/api/auth/google`,
    //                   {
    //                     token: credentialResponse.credential,
    //                   }
    //                 );
    //                 console.log("Logged in user:", res.data);
    //                 localStorage.setItem(
    //                   "userinfoviagoogleauth",
    //                   JSON.stringify(res.data)
    //                 );
    //               } catch (error) {
    //                 console.error("Login failed", error);
    //               }
    //             }}
    //             onError={() => {
    //               console.log("Login Failed");
    //             }}
    //             render={(renderProps) => (
    //               <button
    //                 onClick={renderProps.onClick}
    //                 disabled={renderProps.disabled}
    //                 style={{
    //                   background: "none",
    //                   border: "none",
    //                   cursor: "pointer",
    //                   padding: 0,

    //                 }}
    //               >
    //                 <FcGoogle size={32} />
    //               </button>
    //             )}
    //           />
    //         </div>
    //       </div>
    //       <div
    //         style={{
    //           display: "flex",
    //           justifyContent: "space-between",
    //           alignItems: "center",
    //           marginBottom: '13px'
    //         }}
    //       >
    //         <div style={{ display: "flex", gap: "8px", padding: "15px 0" }}>
    //           <div
    //             style={{
    //               backgroundColor: " #F1F1F1",
    //               width: "35px",
    //               height: "35px",
    //               display: "flex",
    //               justifyContent: "center",
    //               alignItems: "center",
    //             }}
    //           >
    //             <img src={Emver} alt="" />
    //           </div>
    //           <div style={{ display: "flex", flexDirection: "column", gap: '5px' }}>
    //             <span className="sseddetryprof" style={{ fontWeight: "600" }}>Email Verification</span>
    //             <span className="sseddetryprofchannged" style={{ color: "grey" }}>
    //               Verified Email: {currentUser?.email || "Not available"}
    //             </span>
    //           </div>
    //         </div>
    //         <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
    //           {currentUser?.emailVerified && (
    //             <span
    //               style={{
    //                 backgroundColor: "green",
    //                 color: "white",
    //                 borderRadius: "50%",
    //                 width: "20px",
    //                 height: "20px",
    //                 display: "flex",
    //                 alignItems: "center",
    //                 justifyContent: "center",
    //               }}
    //             >
    //               <IoIosCheckmark />
    //             </span>
    //           )}
    //           <img src={Eddit} alt="change" onClick={() => setShowOTPModal(true)} style={{ cursor: 'pointer' }} />
    //           {showOTPModal && (
    //             <EmailVerification
    //               isOpen={showOTPModal}
    //               onClose={() => setShowOTPModal(false)}
    //             />
    //           )}

    //           <img
    //             src={Delet}
    //             alt="del"
    //             style={{
    //               cursor: 'pointer',
    //               position: 'relative',
    //               zIndex: 9999
    //             }}
    //             onClick={() => setShowOTPModal(false)}
    //           />



    //         </div>
    //       </div>
    //       <div
    //         style={{
    //           display: "flex",
    //           justifyContent: "space-between",
    //           alignItems: "center",
    //           marginBottom: '13px'
    //         }}
    //       >
    //         <div style={{ display: "flex", gap: "8px", padding: "15px 0" }}>
    //           <div
    //             style={{
    //               backgroundColor: " #F1F1F1",
    //               width: "35px",
    //               height: "35px",
    //               display: "flex",
    //               justifyContent: "center",
    //               alignItems: "center",
    //             }}
    //           >
    //             <img src={Phver} alt="" />
    //           </div>
    //           <div style={{ display: "flex", flexDirection: "column", gap: '5px' }}>
    //             <span className="sseddetryprof" style={{ fontWeight: "600" }}>
    //               Phone Number Verification
    //             </span>
    //             <span className="sseddetryprofchannged" style={{ color: "grey" }}>
    //               Verified Mobile Number {currentUser?.phone}
    //             </span>
    //           </div>
    //         </div>
    //         <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
    //           {currentUser?.phoneVerified && (
    //             <span
    //               style={{
    //                 backgroundColor: "green",
    //                 color: "white",
    //                 borderRadius: "50%",
    //                 width: "20px",
    //                 height: "20px",
    //                 display: "flex",
    //                 alignItems: "center",
    //                 justifyContent: "center",
    //               }}
    //             >
    //               <IoIosCheckmark />
    //             </span>
    //           )}
    //           <img src={Eddit} alt="delet" onClick={() => setShowMobileModal(true)} style={{ cursor: 'pointer' }} />
    //           <MobileVerification
    //             isOpen={showmobileModal}
    //             onClose={() => setShowMobileModal(false)}
    //           />
    //           <img src={Delet} alt="" style={{ position: 'relative', cursor: 'pointer', zIndex: "9999" }} onClick={() => setShowMobileModal(false)} />
    //         </div>
    //       </div>
    //       <div
    //         style={{
    //           display: "flex",
    //           justifyContent: "space-between",
    //           alignItems: "center",
    //           marginBottom: '13px'
    //         }}
    //       >
    //         <div style={{ display: "flex", gap: "8px", padding: "15px 0" }}>
    //           <div
    //             style={{
    //               backgroundColor: " #F1F1F1",
    //               width: "35px",
    //               height: "35px",
    //               display: "flex",
    //               justifyContent: "center",
    //               alignItems: "center",
    //             }}
    //           >
    //             <img src={Demanage} alt="" />
    //           </div>
    //           <div style={{ display: "flex", flexDirection: "column", gap: '5px' }}>
    //             <span className="sseddetryprof" style={{ fontWeight: "600" }}>Device Management</span>
    //             <span className="sseddetryprofchannged" style={{ color: "grey" }}>
    //               Manage device associated with the account{" "}
    //             </span>
    //           </div>
    //         </div>
    //         <div>
    //           <img src={Devcce} alt="" onClick={() => setDeviceManage(true)} style={{ cursor: 'pointer' }} />
    //           {devicemanage && (
    //             <DeviceManagement
    //               isOpen={devicemanage}
    //               onClose={() => setDeviceManage(false)}
    //               userId={userId}
    //             />
    //           )}
    //         </div>
    //       </div>
    //       <div
    //         style={{
    //           display: "flex",
    //           justifyContent: "space-between",
    //           alignItems: "center",
    //           marginBottom: '13px'
    //         }}
    //       >
    //         <div style={{ display: "flex", gap: "8px", padding: "15px 0" }}>
    //           <div
    //             style={{
    //               backgroundColor: " #F1F1F1",
    //               width: "35px",
    //               height: "35px",
    //               display: "flex",
    //               justifyContent: "center",
    //               alignItems: "center",
    //             }}
    //           >
    //             <img src={AccntAct} alt="" />
    //           </div>
    //           <div style={{ display: "flex", flexDirection: "column", gap: '5px' }}>
    //             <span className="sseddetryprof" style={{ fontWeight: "600" }}>Account Activity</span>
    //             <span className="sseddetryprofchannged" style={{ color: "grey" }}>
    //               Manage activities associated with the account
    //             </span>
    //           </div>
    //         </div>
    //         <div>
    //           <img src={Eye} alt="" onClick={() => setDeviceManage(true)} style={{ cursor: 'pointer' }} />
    //         </div>
    //       </div>
    //       <div
    //         style={{
    //           display: "flex",
    //           justifyContent: "space-between",
    //           alignItems: "center",
    //           marginBottom: '13px'
    //         }}
    //       >
    //         <div style={{ display: "flex", gap: "8px", padding: "15px 0" }}>
    //           <div
    //             style={{
    //               backgroundColor: " #F1F1F1",
    //               width: "35px",
    //               height: "35px",
    //               display: "flex",
    //               justifyContent: "center",
    //               alignItems: "center",
    //             }}
    //           >
    //             <img src={Deact} alt="" />
    //           </div>
    //           <div style={{ display: "flex", flexDirection: "column", gap: '5px' }}>
    //             <span className="sseddetryprof" style={{ fontWeight: "600" }}>Deactivate Account</span>
    //             <span className="sseddetryprofchannged" style={{ color: "grey" }}>
    //               This will shutdown Your account will be reactive when you sign
    //               in again
    //             </span>
    //           </div>
    //         </div>
    //         <div>
    //           {currentUser && (
    //             <label style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
    //               <input
    //                 type="checkbox"
    //                 checked={currentUser.status === "Active"}
    //                 onChange={handleToggleStatus}
    //                 style={{ display: "none" }}
    //               />
    //               <span
    //                 style={{
    //                   width: "50px",
    //                   height: "24px",
    //                   backgroundColor: currentUser.status === "Active" ? "#5cb85c" : "#d9534f",
    //                   borderRadius: "12px",
    //                   position: "relative",
    //                   transition: "background-color 0.3s",
    //                 }}
    //               >
    //                 <span
    //                   style={{
    //                     position: "absolute",
    //                     top: "2px",
    //                     left: currentUser.status === "Active" ? "26px" : "2px",
    //                     width: "20px",
    //                     height: "20px",
    //                     backgroundColor: "white",
    //                     borderRadius: "50%",
    //                     transition: "left 0.3s",
    //                   }}
    //                 />
    //               </span>
    //               <span style={{ marginLeft: "10px", color: "#333", fontWeight: "bold" }}>
    //                 {currentUser.status === "Active" ? "" : ""}
    //               </span>
    //             </label>
    //           )}
    //         </div>
    //       </div>
    //       <div
    //         style={{
    //           display: "flex",
    //           justifyContent: "space-between",
    //           alignItems: "center",
    //         }}
    //       >
    //         <div style={{ display: "flex", gap: "8px", padding: "15px 0", marginBottom: '15px' }}>
    //           <div
    //             style={{
    //               backgroundColor: " #F1F1F1",
    //               width: "35px",
    //               height: "35px",
    //               display: "flex",
    //               justifyContent: "center",
    //               alignItems: "center",
    //             }}
    //           >
    //             <img src={DelAcc} alt="" style={{ cursor: 'pointer' }} />
    //           </div>
    //           <div style={{ display: "flex", flexDirection: "column", gap: '5px' }}>
    //             <span className="sseddetryprof" style={{ fontWeight: "600" }}>Delete Account</span>
    //             <span className="sseddetryprofchannged" style={{ color: "grey" }}>
    //               Your account will be permanently deleted
    //             </span>
    //           </div>
    //         </div>
    //         <div>
    //           <img src={Delet} onClick={handleDeleteAccount} alt="" style={{cursor:'pointer'}}/>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Security;

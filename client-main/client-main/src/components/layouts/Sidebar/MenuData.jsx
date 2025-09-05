import { useTranslation } from "react-i18next";
import {
  MdOutlineDashboard,
  MdOutlineCategory,
  MdStraighten,
  MdChecklist,
  MdVerified,
  MdQrCode,
} from "react-icons/md";
import {
  TbMapPin,
  TbUserShield,
  TbJumpRope,
  TbTrashX,
  TbSettings,
  TbWorld,
  TbDeviceMobile,
  TbDeviceDesktop,
  TbSettingsDollar,
  TbSettings2,
  TbLogout,
} from "react-icons/tb";
import {
  TbUserEdit,
  TbBrandAppleArcade,
  TbTablePlus,
  TbListDetails,
  TbBrandAsana,
} from "react-icons/tb";
import { GoPackage } from "react-icons/go";
import { CiBarcode } from "react-icons/ci";
import { HiArrowTrendingUp } from "react-icons/hi2";
import { PiWarningDiamond } from "react-icons/pi";
import {
  TbShoppingBag,
  TbFileUnknown,
  TbFileUpload,
  TbFileStack,
  TbFilePencil,
  TbMoneybag,
  TbReportMoney,
  TbAlertCircle,
  TbZoomMoney,
  TbFileInfinity,
  TbUsersGroup,
  TbUserUp,
  TbUserDollar,
  TbHomeBolt,
  TbBuildingWarehouse,
} from "react-icons/tb";
import { CiBank } from "react-icons/ci";
import { TbFilePercent, TbGiftCard } from "react-icons/tb";
import {
  BsPeople,
  BsPersonGear,
  BsPersonFillCheck,
  BsCalendarCheck,
  BsFillPersonLinesFill,
  BsFillPersonXFill,
  BsHSquare,
} from "react-icons/bs";

import {
  RiAccountPinCircleLine,
  RiTeamLine,
  RiTimeLine,
  RiGroupLine,
} from "react-icons/ri";

import {
  FaRegFileAlt,
  FaFileInvoiceDollar,
  FaChartBar,
} from "react-icons/fa";


import {
  MdOutlinePointOfSale,
} from "react-icons/md";
import {
  TbFileInvoice,
  TbReceiptRefund,
  TbFileDescription,
} from "react-icons/tb";
import { SiFuturelearn } from "react-icons/si";
import { useAuth } from "../../auth/AuthContext";
import { FaStackOverflow } from "react-icons/fa6";
import { GiExpense } from "react-icons/gi";
import { IoLogoWebComponent } from "react-icons/io5";
import { MdOutlinePayments } from "react-icons/md";
import { MdOutlineSpeakerNotes } from "react-icons/md";

export const getMenuData = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const id = user?._id;
   // ✅ Permissions from role
  const permissions = user?.role?.modulePermissions || {};

  // ✅ Helper to check permission

const canAccess = (module, action = "read") => { if (!permissions || !permissions[module]) return false; 
  return permissions[module]?.all || permissions[module]?.[action] || false; };

  const menu= [
{
  section: t("main"),
  key: "main",
  items: [
    canAccess("Dashboard", "read") && { 
      label: t("dashboard"), 
      path: "/dashboard", 
      icon: <MdOutlineDashboard className="icons" /> 
    },
    canAccess("Application", "read") && {
      key: "application",
      title: t("application"),
      icon: <TbBrandAppleArcade className="icons" />,
      subItems: [
        canAccess("Application", "read") && { label: t("chat"), path: "/chat" },
        canAccess("Application", "read") && { label: t("mail"), path: "/mail" },
      ].filter(Boolean),
    },
  ].filter(Boolean),
},

    // inventory section
 {
    section: t("inventory"),
    key: "inventory",
    items: [
      canAccess("Product", "read") && { label: t("product"), path: "/product", icon: <GoPackage className="icons" /> },
      canAccess("Product", "write") && { label: t("createProduct"), path: "/choose-adproduct", icon: <TbTablePlus className="icons" /> },
      canAccess("Product", "read") && { label: t("expiredProducts"), path: "/expired-products", icon: <PiWarningDiamond className="icons" /> },
      canAccess("Product", "read") && { label: t("lowStocks"), path: "/low-stocks", icon: <HiArrowTrendingUp className="icons" /> },
      canAccess("Category", "read") && { label: t("category"), path: "/category-list", icon: <TbListDetails className="icons" /> },
      canAccess("SubCategory", "read") && { label: t("subCategory"), path: "/sub-categories", icon: <MdOutlineCategory className="icons" /> },
      canAccess("Brand", "read") && { label: t("brands"), path: "/brand-list", icon: <TbBrandAsana className="icons" /> },
      canAccess("Unit", "read") && { label: t("units"), path: "/units", icon: <MdStraighten className="icons" /> },
      canAccess("HSN", "read") && { label: t("hsn"), path: "/hsn", icon: <BsHSquare className="icons" /> },
      canAccess("VariantAttributes", "read") && { label: t("variantAttributes"), path: "/variant-attributes", icon: <MdChecklist className="icons" /> },
      canAccess("Warranty", "read") && { label: t("warranties"), path: "/warranty", icon: <MdVerified className="icons" /> },
      canAccess("Barcode", "read") && { label: t("printBarcode"), path: "/barcode", icon: <CiBarcode className="icons" /> },
      canAccess("DebitNote", "read") && { label: "Debit", path: "/debit-note", icon: <MdQrCode className="icons" /> },
      canAccess("CreditNote", "read") && { label: "Credit", path: "/credit-note", icon: <MdQrCode className="icons" /> },
    ].filter(Boolean),
  },
   {
  section: t("peoples"),
  key: "Peoples",
  items: [
    canAccess("Customers", "read") && {
      label: t("customers"),
      path: "/customers",
      icon: <TbUsersGroup className="icons" />,
    },
    canAccess("Suppliers", "read") && {
      label: t("suppliers"),
      path: "/suppliers",
      icon: <TbUserDollar className="icons" />,
    },
    canAccess("Warehouse", "read") && {
      path: "/warehouse",
      icon: <TbBuildingWarehouse className="icons" />,
      title: t("Warehouse"),
      subItems: [
        canAccess("Warehouse", "read") && { label: t("All warehouse"), path: "/warehouse" },
        canAccess("Warehouse", "read") && { label: t("Stock Movement Log"), path: "/stock-movement-log" },
      ].filter(Boolean),
    },
  ].filter(Boolean),
},

    // PURCHASES
    {
      section: t("purchases"),
      key: "purchases",
      items: [
        canAccess("Purchases", "read") && { label: t("purchases"), path: "/purchase-list", icon: <TbShoppingBag className="icons" /> },
        canAccess("PurchaseOrder", "read") && { label: t("purchaseOrder"), path: "/purchase-order", icon: <TbFileUnknown className="icons" /> },
        canAccess("PurchaseReturn", "read") && { label: t("purchaseReturn"), path: "/purchase-returns", icon: <TbFileUpload className="icons" /> },
      ].filter(Boolean),
    },

// STOCK
    {
      section: t("Stock"),
      key: "stock",
      items: [
        canAccess("Stocks", "read") && { label: t("Purchase Stocks"), path: "/stock", icon: <TbShoppingBag className="icons" /> },
        canAccess("Stocks", "read") && { label: t("Purchase Return Stocks"), path: "/return-stock", icon: <TbShoppingBag className="icons" /> },
        canAccess("Stocks", "read") && { label: t("Manage Stock"), path: "/manage-stocks", icon: <TbShoppingBag className="icons" /> },
        canAccess("StockAdjustment", "read") && { label: t("Stock Adjustment"), path: "/stock-adjustment", icon: <TbFileUnknown className="icons" /> },
        canAccess("StockTransfer", "read") && { label: t("Stock Transfer"), path: "/stock-transfer", icon: <TbFileUpload className="icons" /> },
      ].filter(Boolean),
    },

   // SALES
    {
      section: t("sales"),
      key: "sales",
      items: [
        canAccess("Sales", "read") && {
          label: t("sales"),
          path: "/invoice",
          icon: <MdOutlineDashboard className="icons" />,
          title: t("salesOrders"),
          subItems: [
            canAccess("Sales", "read") && { label: t("onlineOrders"), path: "/online-orders" },
            canAccess("Sales", "read") && { label: t("Payment History"), path: "/sales-payment" },
            canAccess("Sales", "read") && { label: t("Sales History"), path: "/sales-log" },
            canAccess("Sales", "read") && { label: t("posOrders"), path: "/pos" },
          ].filter(Boolean),
        },
        canAccess("Invoices", "read") && { label: t("invoices"), path: "/invoice", icon: <TbFileInvoice className="icons" /> },
        // canAccess("SalesReturn", "read") && { label: t("salesReturn"), path: "/sales-returns", icon: <TbReceiptRefund className="icons" /> },
        // canAccess("Quotation", "read") && { label: t("quotation"), path: "/quotation-list", icon: <TbFileDescription className="icons" /> },
        canAccess("POS", "read") && { label: t("pos"), path: "/pos", icon: <MdOutlinePointOfSale className="icons" /> },
      ].filter(Boolean),
    },

    {
      section: t("promo"),
      key: "promo",
      items: [
        canAccess("Coupons", "read") && { label: t("coupons"), path: "/coupons", icon: <TbFilePercent className="icons" /> },
        canAccess("GiftCards", "read") && { label: t("giftCards"), path: "/gift-cards", icon: <TbGiftCard className="icons" /> },
      ].filter(Boolean),
    },
    // LOCATION
    {
      section: t("location"),
      items: [
        canAccess("Location", "read") && {
          title: t("location"),
          icon: <TbMapPin className="icons" />,
          key: "Location",
          subItems: [
            canAccess("Countries", "read") && { label: t("countries"), path: "/countries" },
            canAccess("States", "read") && { label: t("states"), path: "/states" },
            canAccess("Cities", "read") && { label: t("cities"), path: "/cities" },
          ].filter(Boolean),
        },
      ].filter(Boolean),
    },


     {
      section: t("userManagement"),
      items: [
        canAccess("Users", "read") && { label: t("users"), icon: <TbUserShield className="icons" />, path: "/Users" },
        canAccess("RolesPermissions", "read") && { label: t("rolesPermissions"), icon: <TbJumpRope className="icons" />, path: "/roles-permissions" },
      ].filter(Boolean),
    },



     // SETTINGS
    {
      section: t("settings"),
      items: [
        canAccess("Settings", "read") && {
          title: t("generalSettings"),
          icon: <TbSettings className="icons" />,
          key: "generalSettings",
          subItems: [
            canAccess("Settings", "read") && { label: "Profile", path: "/general-settings" },
            canAccess("Settings", "read") && { label: "Security", path: "/security-settings" },
          ].filter(Boolean),
        },
        canAccess("WebsiteSettings", "read") && {
          title: "Website Settings",
          icon: <TbWorld className="icons" />,
          key: "websiteSettings",
          subItems: [
            canAccess("WebsiteSettings", "read") && { label: "Company Settings", path: "/company-settings" },
            canAccess("WebsiteSettings", "read") && { label: "Localization", path: "/localization-settings" },
          ].filter(Boolean),
        },
      ].filter(Boolean),
    },

   // REPORTS
    {
      section: "Reports",
      key: "reports",
      items: [
        canAccess("Reports", "read") && { label: "Sales Report", path: "/reports/sales", icon: <FaChartBar className="icons" /> },
        canAccess("Reports", "read") && { label: "Purchase Report", path: "/purchase-report", icon: <FaRegFileAlt className="icons" /> },
      ].filter(Boolean),
    },
       // finance & acount section

    // FINANCE
    {
      section: "Finance & Accounts",
      key: "Finance & Accounts",
      items: [
        canAccess("Finance", "read") && { label: "Balance Sheet", path: "/balance-sheet", icon: <TbReportMoney className="icons" /> },
        canAccess("Finance", "read") && { label: "Profit & Loss", path: "/profit&loss", icon: <SiFuturelearn className="icons" /> },
        canAccess("Finance", "read") && { label: "Overdue Report", path: "/overdue-report", icon: <FaStackOverflow className="icons" /> },
        canAccess("Finance", "read") && { label: "Expense Report", path: "/expense-report", icon: <GiExpense className="icons" /> },
        canAccess("Finance", "read") && { label: "B2B & B2C", path: "/bc", icon: <IoLogoWebComponent className="icons" /> },
        canAccess("Finance", "read") && { label: "Payment History", path: "/payment-history", icon: <MdOutlinePayments className="icons" /> },
        canAccess("Finance", "read") && { label: "Credit & Debit Note", path: "/credit&debit-note", icon: <MdOutlineSpeakerNotes className="icons" /> },
        // { label: "Logout", icon: <TbLogout className="icons" />, path: "/logout" }, // ✅ keep logout always visible
      ].filter(Boolean),
    },
  {
      section: "Logout",
      key: "Logout",
      items: [
        { label: "Logout", icon: <TbLogout className="icons" />, path: "/logout" }, // ✅ keep logout always visible
      ].filter(Boolean),
    },
  ];
  return menu.filter(section => section.items && section.items.length > 0);
  
};

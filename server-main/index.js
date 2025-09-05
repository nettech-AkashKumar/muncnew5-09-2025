const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const path = require("path");
const http = require('http');
const { Server } = require('socket.io');

// Routes
const productRoutes = require('./routes/productRoutes');
const countryRoutes = require('./routes/countryRoutes');
const stateRoutes = require('./routes/stateRoutes');
const cityRoutes = require('./routes/cityRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const subCategoryRoutes = require('./routes/subCategoryRoutes');
const brandRoutes = require('./routes/brandRoutes');
const unitsRoutes = require('./routes/unitsRoutes');
const roleRoutes = require('./routes/roleRoutes');
const usersRoutes = require('./routes/usersRoutes');
const authRoutes = require('./routes/authRoutes');
const moduleRoutes = require("./routes/moduleRoutes");
const couponRoutes = require('./routes/CouponsRoute');
const GiftcardRoutes = require("./routes/GiftCardRoutes");
const customerRoutes = require("./routes/customerRoutes");

const messageRoutes = require('./routes/messageRoutes');
const conversationRoutes = require('./routes/conversationsRoutes');

const purchaseRoutes = require('./routes/purchaseRoutes');
const stockHistoryRoutes = require('./routes/stockHistoryRoutes');
const purchaseSettingsRoutes = require('./routes/purchaseSettingRoutes');
const hsnRoutes = require('./routes/hsnRoutes');
const warehouseRoutes = require('./routes/warehouseRoutes');
const VarientRoutes = require('./routes/variantRoutes');
const WarrantyRoutes = require('./routes/warrantyRoutes');
const debitNoteRoutes = require('./routes/debitNoteRoutes');
const supplierRoutes = require('./routes/supplierRoutes');
const invoiceRoutes = require('./routes/invoiceRoutes');
const salesRoutes = require('./routes/salesRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const userProfileRoutes = require("./routes/profileRoutes");
const emailverifyroute = require("./routes/settings/EmailVerificationroute.js");
const authSettingsRouter = require("./routes/settings/authRoutes.js");
const mobileverifyrouter = require("./routes/settings/mobileverifyroute.js");
const devicemanagementrouter = require("./routes/settings/devicemanagementroute.js");
const companysettingrouter = require("./routes/settings/companysettingroute.js");
const localizationrouter = require("./routes/settings/Localizationroute.js");
const balanceSheetRoutes = require("./routes/balanceSheetRoutes.js");
const posSaleRoutes = require('./routes/posSaleRoutes.js');
const invoiceSettingsRoutes = require('./routes/invoiceSettings');
const creditNoteRoutes = require('./routes/creditNoteRoutes');
const expenseRoutes = require('./routes/expenseRoutes.js');
const emailrouter = require('./routes/emailroutes.js');

// Load env variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// ✅ Middleware
const corsOptions = {
  origin: ["https://kasperinfotech.io"],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD"],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Static file paths
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/category", express.static(path.join(__dirname, "category")));

// ✅ API Routes
app.use("/api/role", roleRoutes);
app.use("/api/user", usersRoutes);
app.use("/api/auth", authRoutes); // main auth
app.use("/api/auth/settings", authSettingsRouter); // renamed to avoid conflict
app.use("/api/products", productRoutes);
app.use("/api/countries", countryRoutes);
app.use("/api/states", stateRoutes);
app.use("/api/city", cityRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/subcategory", subCategoryRoutes);
app.use("/api/brands", brandRoutes);
app.use("/api/unit", unitsRoutes);
app.use("/api/modules", moduleRoutes);
app.use('/api/coupons', couponRoutes);
app.use("/api/giftcard", GiftcardRoutes);
app.use("/api/customers", customerRoutes);
app.use('/api/suppliers', supplierRoutes);

app.use('/api/messages', messageRoutes);          // ✅ Correct
app.use('/api/conversations', conversationRoutes); // ✅ Correct

app.use("/api/notifications", notificationRoutes);
app.use("/api/purchases", purchaseRoutes);
app.use("/api/stock-history", stockHistoryRoutes);
app.use("/api/settings", purchaseSettingsRoutes);
app.use('/api/hsn', hsnRoutes);
app.use("/api/warehouse", warehouseRoutes);
app.use("/api/variant-attributes", VarientRoutes);
app.use("/api/warranty", WarrantyRoutes);
app.use('/api/debit-notes', debitNoteRoutes);
app.use("/api/profile", userProfileRoutes);
app.use('/api/invoice', invoiceRoutes);
app.use('/api/sales', salesRoutes);
app.use('/api/pos-sales', posSaleRoutes);

// ✅ Mail & Verification
app.use("/api/email/mail", emailrouter);
app.use("/api/email", emailverifyroute);
app.use("/api/mobile", mobileverifyrouter);
app.use("/api/devices", devicemanagementrouter);

// ✅ Company settings
app.use("/api/companyprofile", companysettingrouter);
app.use("/api/localizationsetting", localizationrouter);

// ✅ Cloudinary config
app.use("/api/cloudinary-signature", require("./routes/file"));

// ✅ Reports
app.use("/api/balancesheet", balanceSheetRoutes);
app.use('/api/invoice-settings', invoiceSettingsRoutes);
app.use("/api/expenses", expenseRoutes);
app.use('/api/credit-notes', creditNoteRoutes);

// // ✅ Frontend build (React/Vite)


const buildPath = path.join(__dirname, '../client/dist');

app.use(express.static(buildPath));
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});



// ✅ Create HTTP server for Socket.IO
const server = http.createServer(app);

// ✅ Socket.IO setup
const io = new Server(server, {
  cors: {
    origin: "*", // or restrict to frontend
    methods: ["GET", "POST"]
  }
});

// Online users map
const onlineUsers = new Map();
io.on("connection", (socket) => {
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
    io.emit("online-users", Array.from(onlineUsers.keys()));
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-receive", data);
      socket.to(sendUserSocket).emit("new-notification", {
        type: 'message',
        sender: data.from,
        message: data.message,
        timestamp: new Date()
      });
    }
  });

  socket.on("disconnect", () => {
    let disconnectedUserId = null;
    [...onlineUsers.entries()].forEach(([uid, sid]) => {
      if (sid === socket.id) {
        onlineUsers.delete(uid);
        disconnectedUserId = uid;
      }
    });
    if (disconnectedUserId) {
      io.emit("online-users", Array.from(onlineUsers.keys()));
    }
  });
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running with Socket.IO on port ${PORT}`));

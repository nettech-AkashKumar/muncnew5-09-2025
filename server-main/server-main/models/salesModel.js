// const mongoose = require('mongoose');

// const salesSchema = new mongoose.Schema({
//   customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer'},
//   billing: { type: Object, default: {} },
//   shipping: { type: Object, default: {} },
//   products: [{
//     productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
//     saleQty: { type: Number, default: 1 },
//     quantity: { type: Number, default: 1 },
//     sellingPrice: { type: Number, default: 0 },
//     discount: { type: Number, default: 0 },
//     tax: { type: Number, default: 0 },
//   }],
//   saleDate: { type: Date },
//   orderTax: { type: Number, default: 0 },
//   orderDiscount: { type: Number, default: 0 },
//   shippingCost: { type: Number, default: 0 },
//   status: { type: String },
//   paymentType: { type: String },
//   paidAmount: { type: Number, default: 0 },
//   dueAmount: { type: Number, default: 0 },
//   dueDate: { type: Date },
//   paymentMethod: { type: String },
//   transactionId: { type: String },
//   onlineMod: { type: String },
//   transactionDate: { type: Date },
//   paymentStatus: { type: String },
//   images: [{ type: String }],
//   description: { type: String },
//   referenceNumber: { type: String },
//   // ...other fields
// });
// module.exports = mongoose.model('Sales', salesSchema);


const mongoose = require("mongoose");

const salesSchema = new mongoose.Schema(
  {
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true },

    // Snapshot of selected billing/shipping at sale time
    billing: {
      name: String,
      address1: String,
      address2: String,
      city: String,
      state: String,
      country: String,
      postalCode: String,
    },
    shipping: {
      name: String,
      address1: String,
      address2: String,
      city: String,
      state: String,
      country: String,
      postalCode: String,
    },
    products: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
        saleQty: { type: Number, default: 1 },
        quantity: { type: Number, default: 1 },
        sellingPrice: { type: Number, required: true },
        discount: { type: Number, default: 0 },
        tax: { type: Number, default: 0 },
        unit: { type: String, default: "" }, // New field for unit
        hsnCode: { type: String, default: "" }, // New field for HSN code 
      },
    ],
    saleDate: { type: Date, required: true },
    status: { type: String, enum: ["Pending", "Completed", "Cancelled", "Partial", "Complete", "In Progress", "On Hold"], required: true, default: "Pending" },
    paymentType: { type: String, enum: ["Partial", "Full"], required: true },
    referenceNumber: { type: String },
    invoiceId: { type: String, unique: true, sparse: true },
    paidAmount: { type: Number, default: 0 },
    dueAmount: { type: Number, default: 0 },
    dueDate: { type: Date },

    paymentMethod: { type: String },
    transactionId: { type: String },
    onlineMod: { type: String },
    transactionDate: { type: Date },
    paymentStatus: { type: String, enum: ["Paid", "Unpaid", "Partial", "Pending", ""], default: "Unpaid" },

    images: [{ type: String }],
    description: { type: String },
    cgst: { type: String },
    sgst: { type: String },


    totalAmount: { type: Number, },
    labourCost: { type: Number, default: 0 },
    orderTax: { type: Number, default: 0 },
    orderDiscount: { type: Number, default: 0 },
    roundOff: { type: Boolean, default: false },
    roundOffValue: { type: Number, default: 0 },

    shippingCost: { type: Number, default: 0 },
    salesDate: { type: Date, default: Date.now },
    referenceNumber: { type: String },
    notes: { type: String },
    grandTotal: { type: Number, default: 0 },
    creditReturns: [
      {
        amount: { type: Number },
        reason: { type: String },
        returnDate: { type: Date, default: Date.now },
      }
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Sales", salesSchema);



// const mongoose = require('mongoose');

// // 🔹 Nested Payment Schema
// const paymentSchema = new mongoose.Schema({
//   paymentType: {
//     type: String,
//     enum: ['Full', 'Partial'],
//     required: true,
//   },
//   paymentStatus: {
//     type: String,
//     enum: ['Paid', 'Unpaid', 'Partial', 'Pending'],
//     default: 'Pending',
//   },
//   paidAmount: { type: Number, default: 0 },
//   dueAmount: { type: Number, default: 0 },
//   dueDate: { type: Date },
//   paymentMethod: {
//     type: String,
//     enum: ['Cash', 'Online', 'Cheque'],
//   },
//   transactionId: String,
//   transactionDate: Date,
//   onlineMethod: {
//     type: String,
//     enum: ['UPI', 'NEFT', 'RTGS', 'IMPS', 'Net Banking', 'Credit Card', 'Debit Card', 'Wallet'],
//   },
// }, { _id: false });

// const aditionalSchema = new mongoose.Schema({
//   orderTax: { type: Number, default: 0 },
//   orderDiscount: { type: Number, default: 0 },
//   shippingCost: { type: Number, default: 0 },
//   grandTotal: { type: Number, default: 0 },

// }, { _id: false });
// const taxSchema = new mongoose.Schema({
//   cgst: { type: String, default: '' },
//   sgst: { type: String, default: '' },
//   discount: { type: String, default: '' },
//   roundOff: { type: Boolean, default: false },

// }, { _id: false });

// // 🔹 Sales Schema
// const salesSchema = new mongoose.Schema({
//   customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
//   billing: {
//     type: Object,
//     default: {}
//   },
//   shipping: {
//     type: Object,
//     default: {}
//   },
//   products: [{
//     productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
//     saleQty: { type: Number, default: 1 },
//     quantity: { type: Number, default: 1 },
//     sellingPrice: { type: Number, default: 0 },
//     discount: { type: Number, default: 0 },
//     tax: { type: Number, default: 0 },
//   }],
//   saleDate: { type: Date },
//   orderTax: { type: Number, default: 0 },
//   orderDiscount: { type: Number, default: 0 },
//   shippingCost: { type: Number, default: 0 },
//   status: { type: String },
//   paymentType: { type: String },
//   paidAmount: { type: Number, default: 0 },
//   dueAmount: { type: Number, default: 0 },
//   dueDate: { type: Date },
//   paymentMethod: { type: String },
//   transactionId: { type: String },
//   onlineMod: { type: String },
//   transactionDate: { type: Date },
//   paymentStatus: { type: String },
//   images: [{ type: String }],
//   description: { type: String },
//   referenceNumber: { type: String },
//   // ...add other fields as needed
// });

// module.exports = mongoose.model('Sales', salesSchema);

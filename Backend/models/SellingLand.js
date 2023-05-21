const mongoose = require("mongoose");

const SellingLandSchema = new mongoose.Schema({
  owner: {
    type: String,
    required: true,
  },
  request: {
    type: Boolean,
    default: false,
  },
  propertyID: {
    type: Number,
    required: true,
    unique: true,
  },
  physicalSurveyNo: {
    type: Number,
  },
  tokenID: {
    type: Number,
  },
  Area: {
    type: Number,
  },
  City: {
    type: String,
  },
  ownerAddress: {
    type: String,
  },
  Buyer_name: {
    type: String,
    default: "0",
  },
  InspectorName: {
    type: String,
    default: "Inspector",
  },
  Buyer_address: {
    type: String,
  },
  Document_Access: {
    type: String,
  },
  ProcessStatus: {
    type: Number,
    default: 2,
  },
  // tokensend:{
  //     default: "wait",
  //     type: String,
  // },
  // Document_Verify:{
  //     default: "wait",
  //     type: String,
  // },
  // Transaction:{
  //     default: "wait",
  //     type: String,
  // },
  // Ownership_Transfer:{
  //     default: "wait",
  //     type: String,
  // },
  Price: {
    type: Number,
  },
  ImageURL: {
    type: String,
  },
  DocumentURL: {
    type: String,
    default: "http://localhost:3000/Document.pdf",
  },
  PaymentStatus:{
    type: Boolean,
    default: false,
  },
  TransactionHash:{
    type: String,
    default: "",
  },
  BuyerTokenstatus:{
    type: Boolean,
    default: false,
  },
  StampDutyTokenStatus:{
    type: Boolean,
    default: false,
  },
  OwnerAdhar:{
    type: Number,
    default: 123456789012,
},
OwnerContact:{
    type: Number,
    default: 1234567890,
},
PaymentDuration:{
  type: String,
}
});

module.exports = mongoose.model("SellingLand", SellingLandSchema);

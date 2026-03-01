const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  filePath: {
    type: String,
    required: true,
  },
  fileName: {
    type: String,
    required: true,
  },
  totalPages: {
    type: Number,
    required: true,
  },
  printType: {
    type: String,
    enum: ['bw', 'color'],
    required: true,
  },
  copies: {
    type: Number,
    required: true,
    default: 1,
  },
  doubleSided: {
    type: Boolean,
    default: false,
  },
  binding: {
    type: Boolean,
    default: false,
  },
  urgent: {
    type: Boolean,
    default: false,
  },
  basePrice: {
    type: Number,
    required: true,
  },
  gst: {
    type: Number,
    required: true,
  },
  finalAmount: {
    type: Number,
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending',
  },
  paymentId: {
    type: String,
  },
  razorpayOrderId: {
    type: String,
  },
  orderStatus: {
    type: String,
    enum: ['pending', 'printing', 'ready', 'completed'],
    default: 'pending',
  },
  pickupTime: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Order', orderSchema);

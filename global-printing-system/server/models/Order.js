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
  pages: {
    type: Number,
    required: true,
    min: 1,
  },
  effectivePages: {
    type: Number,
    required: true,
    min: 1,
  },
  copies: {
    type: Number,
    required: true,
    default: 1,
    min: 1,
  },
  printType: {
    type: String,
    enum: ['bw', 'color'],
    required: true,
  },
  doubleSided: {
    type: Boolean,
    default: false,
  },
  binding: {
    type: Boolean,
    default: false,
  },
  paperSize: {
    type: String,
    enum: ['A4', 'A3', 'Legal'],
    default: 'A4',
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['queued', 'printing', 'completed'],
    default: 'queued',
  },
  queueNumber: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Order', orderSchema);

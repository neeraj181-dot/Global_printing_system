const Order = require('../models/Order');
const Razorpay = require('razorpay');
const crypto = require('crypto');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Calculate pickup time based on pages
const calculatePickupTime = (pages) => {
  if (pages < 20) return '30 minutes';
  if (pages <= 100) return '1 hour';
  return '2 hours';
};

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
exports.createOrder = async (req, res) => {
  try {
    const {
      filePath,
      fileName,
      totalPages,
      printType,
      copies,
      doubleSided,
      binding,
      urgent,
    } = req.body;

    // Calculate pricing
    let basePrice = printType === 'color' ? 10 : 2;
    basePrice = basePrice * totalPages * copies;

    // Apply double-sided discount
    if (doubleSided) {
      basePrice = basePrice * 0.9; // 10% discount
    }

    // Add binding cost
    if (binding) {
      basePrice += 30;
    }

    // Add urgent cost
    if (urgent) {
      basePrice += 20;
    }

    // Calculate GST (18%)
    const gst = basePrice * 0.18;
    const finalAmount = Math.round(basePrice + gst);

    // Create Razorpay order
    const razorpayOrder = await razorpay.orders.create({
      amount: finalAmount * 100, // Amount in paise
      currency: 'INR',
      receipt: `order_${Date.now()}`,
    });

    // Calculate pickup time
    const pickupTime = calculatePickupTime(totalPages);

    // Create order in database
    const order = await Order.create({
      userId: req.user._id,
      filePath,
      fileName,
      totalPages,
      printType,
      copies,
      doubleSided,
      binding,
      urgent,
      basePrice: Math.round(basePrice),
      gst: Math.round(gst),
      finalAmount,
      razorpayOrderId: razorpayOrder.id,
      pickupTime,
    });

    res.status(201).json({
      order,
      razorpayOrderId: razorpayOrder.id,
      amount: finalAmount,
      currency: 'INR',
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Verify payment
// @route   POST /api/orders/verify-payment
// @access  Private
exports.verifyPayment = async (req, res) => {
  try {
    const { orderId, paymentId, signature } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Verify signature
    const body = order.razorpayOrderId + '|' + paymentId;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    if (expectedSignature === signature) {
      order.paymentStatus = 'paid';
      order.paymentId = paymentId;
      order.orderStatus = 'printing';
      await order.save();

      res.json({ message: 'Payment verified successfully', order });
    } else {
      order.paymentStatus = 'failed';
      await order.save();
      res.status(400).json({ message: 'Payment verification failed' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user orders
// @route   GET /api/orders/user
// @access  Private
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all orders (Admin)
// @route   GET /api/orders/admin
// @access  Private/Admin
exports.getAllOrders = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status ? { orderStatus: status } : {};
    
    const orders = await Order.find(filter)
      .populate('userId', 'name email phone')
      .sort({ createdAt: -1 });
    
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update order status (Admin)
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.orderStatus = status;
    await order.save();

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

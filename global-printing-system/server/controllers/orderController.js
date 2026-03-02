const Order = require('../models/Order');

// Calculate price on backend (never trust frontend)
const calculatePrice = (pages, effectivePages, copies, printType, binding) => {
  // Validate inputs
  if (pages < 1 || effectivePages < 1 || copies < 1) {
    throw new Error('Invalid input values');
  }

  if (!['bw', 'color'].includes(printType)) {
    throw new Error('Invalid print type');
  }

  // Calculate base price
  let basePrice = 0;
  if (printType === 'bw') {
    basePrice = effectivePages * copies * 2;
  } else if (printType === 'color') {
    basePrice = effectivePages * copies * 10;
  }

  // Add service charge (mandatory ₹5)
  const serviceCharge = 5;

  // Add binding charge if selected
  const bindingCharge = binding ? 30 : 0;

  // Calculate total
  const total = basePrice + serviceCharge + bindingCharge;

  return total;
};

// Get next queue number
const getNextQueueNumber = async () => {
  const lastOrder = await Order.findOne().sort({ queueNumber: -1 });
  return lastOrder ? lastOrder.queueNumber + 1 : 1;
};

// Create new order
exports.createOrder = async (req, res) => {
  try {
    const { 
      filePath, 
      fileName, 
      pages, 
      effectivePages,
      copies, 
      printType,
      doubleSided,
      binding,
      paperSize 
    } = req.body;

    // Validate required fields
    if (!filePath || !fileName || !pages || !effectivePages || !copies || !printType) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Validate numeric values
    if (pages < 1 || effectivePages < 1 || copies < 1) {
      return res.status(400).json({ message: 'Invalid numeric values' });
    }

    // Validate print type
    if (!['bw', 'color'].includes(printType)) {
      return res.status(400).json({ message: 'Invalid print type' });
    }

    // Validate paper size
    if (paperSize && !['A4', 'A3', 'Legal'].includes(paperSize)) {
      return res.status(400).json({ message: 'Invalid paper size' });
    }

    // Calculate price on backend (security)
    const totalPrice = calculatePrice(pages, effectivePages, copies, printType, binding || false);

    // Get next queue number
    const queueNumber = await getNextQueueNumber();

    // Create order
    const order = new Order({
      userId: req.user.id,
      filePath,
      fileName,
      pages,
      effectivePages,
      copies,
      printType,
      doubleSided: doubleSided || false,
      binding: binding || false,
      paperSize: paperSize || 'A4',
      totalPrice,
      status: 'queued',
      queueNumber,
    });

    await order.save();

    res.status(201).json({
      message: 'Order created successfully',
      order,
      queueNumber,
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get user's orders
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all orders (Admin)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('userId', 'name email')
      .sort({ queueNumber: 1 });

    res.json(orders);
  } catch (error) {
    console.error('Get all orders error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update order status (Admin)
exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['queued', 'printing', 'completed'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const order = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json({
      message: 'Order status updated successfully',
      order,
    });
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete order (Admin)
exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findByIdAndDelete(id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Delete order error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

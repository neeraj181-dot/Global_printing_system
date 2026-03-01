const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

const User = require('./models/User');

const seedUsers = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected');

    // Clear existing users (optional - comment out if you don't want to clear)
    // await User.deleteMany({});
    // console.log('🗑️  Cleared existing users');

    // Hash passwords
    const salt = await bcrypt.genSalt(10);
    const adminPassword = await bcrypt.hash('Admin@123', salt);
    const userPassword = await bcrypt.hash('User@123', salt);

    // Create admin user
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@globalprint.com',
      phone: '9876543210',
      password: adminPassword,
      role: 'admin',
    });
    console.log('✅ Admin user created:', admin.email);

    // Create test user
    const user = await User.create({
      name: 'Test User',
      email: 'user@test.com',
      phone: '9876543211',
      password: userPassword,
      role: 'user',
    });
    console.log('✅ Test user created:', user.email);

    console.log('\n📋 Login Credentials:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Admin Login:');
    console.log('  Email: admin@globalprint.com');
    console.log('  Password: Admin@123');
    console.log('  URL: http://localhost:5173/admin-login');
    console.log('\nUser Login:');
    console.log('  Email: user@test.com');
    console.log('  Password: User@123');
    console.log('  URL: http://localhost:5173/');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

seedUsers();

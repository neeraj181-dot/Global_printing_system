# Backend Server - Global Printing System

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup MongoDB
Make sure MongoDB is running on your system.

**Windows:**
```bash
mongod --dbpath="C:\data\db"
```

**Mac/Linux:**
```bash
mongod
```

**Or use MongoDB Atlas** (cloud) and update the connection string in `.env`

### 3. Configure Environment
The `.env` file is already created. Update if needed:
```env
MONGODB_URI=mongodb://localhost:27017/global-printing-system
JWT_SECRET=your_super_secret_jwt_key_change_in_production
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

### 4. Create Admin User
```bash
node seed.js
```

This creates:
- **Admin:** admin@globalprint.com / Admin@123
- **User:** user@test.com / User@123

### 5. Start Server
```bash
npm run dev
```

Server runs on: **http://localhost:5000**

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/admin-login` - Admin login
- `POST /api/auth/google-login` - Google OAuth login

### Orders
- `POST /api/orders` - Create new order (Protected)
- `POST /api/orders/verify-payment` - Verify Razorpay payment (Protected)
- `GET /api/orders/user` - Get user's orders (Protected)
- `GET /api/orders/admin` - Get all orders (Admin only)
- `PUT /api/orders/:id/status` - Update order status (Admin only)

### Upload
- `POST /api/upload` - Upload file (Protected)

## Testing API

### Using cURL

**Register:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@test.com","phone":"1234567890","password":"Test@123"}'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@test.com","password":"User@123"}'
```

**Admin Login:**
```bash
curl -X POST http://localhost:5000/api/auth/admin-login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@globalprint.com","password":"Admin@123"}'
```

### Using Postman
Import the endpoints and test with Bearer token authentication.

## Troubleshooting

**MongoDB Connection Error:**
- Ensure MongoDB is running
- Check connection string
- Try: `mongodb://127.0.0.1:27017/global-printing-system`

**Port 5000 in use:**
- Change PORT in `.env`
- Or stop the process using port 5000

**Module not found:**
```bash
npm install
```

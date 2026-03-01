# 🚀 Quick Start Guide

## ⚠️ IMPORTANT: MongoDB Required

The backend server is running but **MongoDB is not connected**. You need to install and start MongoDB for the application to work properly.

## Option 1: Install MongoDB Locally (Recommended)

### Windows:
1. Download MongoDB Community Server: https://www.mongodb.com/try/download/community
2. Run the installer (choose "Complete" installation)
3. During installation, select "Install MongoDB as a Service"
4. After installation, MongoDB will start automatically

### Verify MongoDB is Running:
```bash
mongosh
```

If you see a MongoDB shell, it's working! Type `exit` to quit.

### Start the Backend:
```bash
cd server
node seed.js
```

This creates test accounts:
- **Admin:** admin@globalprint.com / Admin@123
- **User:** user@test.com / User@123

## Option 2: Use MongoDB Atlas (Cloud - Free)

1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Create a free account
3. Create a free cluster (M0)
4. Click "Connect" → "Connect your application"
5. Copy the connection string
6. Update `server/.env`:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/global-printing-system
   ```
7. Run seed script:
   ```bash
   cd server
   node seed.js
   ```

## Google Login Setup

1. Go to: https://console.cloud.google.com/
2. Create a new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized origins: `http://localhost:5173`
6. Copy Client ID
7. Update `src/main.jsx`:
   ```javascript
   const GOOGLE_CLIENT_ID = 'your-actual-client-id-here';
   ```

## Current Status

✅ Frontend: Running on http://localhost:5174
✅ Backend: Running on http://localhost:5000
❌ Database: Not connected (MongoDB required)

## After MongoDB is Connected

1. **Create Admin User:**
   ```bash
   cd server
   node seed.js
   ```

2. **Login as Admin:**
   - URL: http://localhost:5174/admin-login
   - Email: admin@globalprint.com
   - Password: Admin@123

3. **Login as User:**
   - URL: http://localhost:5174/
   - Email: user@test.com
   - Password: User@123

## Features Available

### User Features:
- ✅ Register new account
- ✅ Login with email/password
- ✅ Login with Google (after setup)
- ✅ Upload documents (PDF, DOC, DOCX, JPG, PNG)
- ✅ Configure print settings
- ✅ Real-time price calculation
- ✅ View order history
- ✅ Track order status

### Admin Features:
- ✅ Separate admin login
- ✅ View all orders
- ✅ Filter orders by status
- ✅ Update order status
- ✅ View user details

## Pricing

- Black & White: ₹2/page
- Color: ₹10/page
- Double-sided: 10% discount
- Binding: ₹30
- Urgent: ₹20
- GST: 18%

## Pickup Time

- < 20 pages: 30 minutes
- 20-100 pages: 1 hour
- > 100 pages: 2 hours

## Need Help?

Check `SETUP.md` for detailed setup instructions or contact support.

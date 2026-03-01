# Global Printing System - Setup Guide

## Prerequisites

1. **Node.js** (v16 or higher)
2. **MongoDB** (v5 or higher)
3. **Google OAuth Client ID** (for Google login)

## MongoDB Installation

### Windows:
1. Download MongoDB from: https://www.mongodb.com/try/download/community
2. Install MongoDB Community Server
3. Add MongoDB to PATH: `C:\Program Files\MongoDB\Server\7.0\bin`
4. Start MongoDB:
   ```bash
   mongod --dbpath="C:\data\db"
   ```
   Or install as Windows Service during installation

### Alternative: MongoDB Atlas (Cloud)
1. Create free account at: https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string
4. Update `.env` file with your connection string

## Google OAuth Setup

1. Go to: https://console.cloud.google.com/
2. Create a new project or select existing
3. Enable Google+ API
4. Go to Credentials → Create Credentials → OAuth 2.0 Client ID
5. Add authorized JavaScript origins:
   - `http://localhost:5173`
6. Add authorized redirect URIs:
   - `http://localhost:5173`
7. Copy the Client ID
8. Update `src/main.jsx` with your Client ID

## Installation Steps

### 1. Install Backend Dependencies
```bash
cd server
npm install
```

### 2. Configure Environment Variables
Edit `server/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/global-printing-system
JWT_SECRET=your_super_secret_jwt_key_change_in_production
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
NODE_ENV=development
```

### 3. Install Frontend Dependencies
```bash
cd ..
npm install
```

### 4. Update Google Client ID
Edit `src/main.jsx` and replace `YOUR_GOOGLE_CLIENT_ID` with your actual Google Client ID

## Running the Application

### 1. Start MongoDB
```bash
mongod
```

### 2. Start Backend Server
```bash
cd server
npm run dev
```
Server will run on: http://localhost:5000

### 3. Start Frontend
```bash
npm run dev
```
Frontend will run on: http://localhost:5173 or http://localhost:5174

## Creating Admin User

### Option 1: Using MongoDB Shell
```bash
mongosh
use global-printing-system

db.users.insertOne({
  name: "Admin User",
  email: "admin@globalprint.com",
  phone: "1234567890",
  password: "$2a$10$YourHashedPasswordHere",
  role: "admin",
  createdAt: new Date()
})
```

### Option 2: Register and Update
1. Register a normal user account
2. Use MongoDB Compass or mongosh to update the role:
```bash
db.users.updateOne(
  { email: "youremail@example.com" },
  { $set: { role: "admin" } }
)
```

### Option 3: Use the Seed Script
```bash
cd server
node seed.js
```
This will create:
- Admin: admin@globalprint.com / Admin@123
- Test User: user@test.com / User@123

## Razorpay Setup (Optional for Payment Testing)

1. Sign up at: https://razorpay.com/
2. Get Test API Keys from Dashboard
3. Update `.env` with your keys
4. Use test card: 4111 1111 1111 1111

## Testing the Application

### User Flow:
1. Register at `/register`
2. Login at `/`
3. Upload document at `/dashboard`
4. View orders at `/orders`

### Admin Flow:
1. Login at `/admin-login`
2. View dashboard at `/admin/dashboard`
3. Manage orders at `/admin/orders`

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check connection string in `.env`
- Try: `mongodb://127.0.0.1:27017/global-printing-system`

### Port Already in Use
- Backend: Change PORT in `server/.env`
- Frontend: Vite will auto-assign next available port

### Google Login Not Working
- Verify Client ID is correct
- Check authorized origins in Google Console
- Clear browser cache

### CORS Errors
- Backend already configured for CORS
- Ensure frontend is running on correct port

## Production Deployment

### Backend:
1. Set `NODE_ENV=production` in `.env`
2. Use MongoDB Atlas for database
3. Deploy to Heroku, Railway, or Render
4. Update CORS origins

### Frontend:
1. Update API_URL in `src/services/api.js`
2. Build: `npm run build`
3. Deploy to Vercel, Netlify, or Cloudflare Pages

## Support

For issues, check:
- MongoDB logs
- Backend console (terminal running `npm run dev`)
- Browser console (F12)
- Network tab for API errors

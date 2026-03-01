# 🎯 START HERE - Global Printing System

## Current Status

✅ **Frontend:** Running on http://localhost:5174  
✅ **Backend:** Running on http://localhost:5000  
⚠️ **Database:** MongoDB not connected (needs installation)

## What You Need to Do

### Step 1: Install MongoDB (5 minutes)

**Windows Users:**
1. Download: https://www.mongodb.com/try/download/community
2. Run installer → Choose "Complete"
3. Check "Install MongoDB as a Service"
4. Click Install

**Or Use Cloud (Easier):**
1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Create free account
3. Create free cluster (M0)
4. Get connection string
5. Update `server/.env` with your connection string

### Step 2: Create Test Users

After MongoDB is running:
```bash
cd server
node seed.js
```

This creates:
- **Admin:** admin@globalprint.com / Admin@123
- **User:** user@test.com / User@123

### Step 3: Test the Application

**User Login:**
1. Go to: http://localhost:5174/
2. Login with: user@test.com / User@123
3. Upload a document
4. Configure print settings
5. See real-time price calculation

**Admin Login:**
1. Go to: http://localhost:5174/admin-login
2. Login with: admin@globalprint.com / Admin@123
3. View all orders
4. Update order status

## Optional: Setup Google Login

**Note:** Google login is optional. You can use email/password login without it.

If you want to enable Google login:

1. See detailed guide: `GOOGLE_OAUTH_SETUP.md`
2. Or follow these quick steps:
   - Go to: https://console.cloud.google.com/
   - Create OAuth 2.0 Client ID
   - Add origins: `http://localhost:5173` and `http://localhost:5174`
   - Copy Client ID
   - Create `.env` file in root:
     ```env
     VITE_GOOGLE_CLIENT_ID=your-client-id-here
     ```
   - Restart frontend: `npm run dev`

## Features You Can Test

### As User:
- ✅ Register new account
- ✅ Login with email/password
- ✅ Login with Google (after setup)
- ✅ Upload documents (PDF, DOC, DOCX, JPG, PNG)
- ✅ Select print options:
  - Black & White (₹2/page) or Color (₹10/page)
  - Number of copies
  - Double-sided (10% discount)
  - Binding (+₹30)
  - Urgent (+₹20)
- ✅ See real-time price with GST (18%)
- ✅ View pickup time (based on pages)
- ✅ View order history
- ✅ Track order status

### As Admin:
- ✅ Separate admin portal
- ✅ View all orders from all users
- ✅ Filter orders by status
- ✅ Update order status:
  - Pending → Printing → Ready → Completed
- ✅ View customer details
- ✅ See order information

## Pricing Logic

The system automatically calculates:
- **Base Price:** ₹2/page (B&W) or ₹10/page (Color)
- **Copies:** Multiplied by number of copies
- **Double-sided:** -10% discount
- **Binding:** +₹30
- **Urgent:** +₹20
- **GST:** +18% on total
- **Final Amount:** Rounded to nearest rupee

## Pickup Time Logic

- **< 20 pages:** 30 minutes
- **20-100 pages:** 1 hour
- **> 100 pages:** 2 hours

## File Upload

- **Supported:** PDF, DOC, DOCX, JPG, PNG
- **Max Size:** 20MB
- **Storage:** `server/uploads/` folder

## Troubleshooting

### "Cannot connect to MongoDB"
**Solution:** Install MongoDB (see Step 1 above)

### "Port 5000 already in use"
**Solution:** Change PORT in `server/.env`

### "Google login not working"
**Solution:** Setup Google OAuth (see Optional section above)

### "Module not found"
**Solution:** Run `npm install` in both root and server folders

## Project Structure

```
global-printing-system/
├── src/                      # Frontend React app
│   ├── components/           # Reusable components
│   │   ├── ProtectedRoute.jsx
│   │   ├── AdminRoute.jsx
│   │   ├── Sidebar.jsx
│   │   └── AdminSidebar.jsx
│   ├── pages/               # Page components
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── AdminLogin.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Orders.jsx
│   │   └── AdminDashboard.jsx
│   ├── context/             # Context API
│   │   └── AuthContext.jsx
│   └── services/            # API calls
│       └── api.js
│
├── server/                  # Backend Node.js app
│   ├── controllers/         # Business logic
│   │   ├── authController.js
│   │   ├── orderController.js
│   │   └── uploadController.js
│   ├── models/             # MongoDB schemas
│   │   ├── User.js
│   │   └── Order.js
│   ├── routes/             # API routes
│   │   ├── authRoutes.js
│   │   ├── orderRoutes.js
│   │   └── uploadRoutes.js
│   ├── middleware/         # Auth middleware
│   │   ├── authMiddleware.js
│   │   └── roleMiddleware.js
│   ├── config/             # Configuration
│   │   └── db.js
│   ├── .env                # Environment variables
│   ├── server.js           # Main server file
│   └── seed.js             # Create test users
│
└── Documentation files
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - User login
- `POST /api/auth/admin-login` - Admin login
- `POST /api/auth/google-login` - Google OAuth

### Orders
- `POST /api/orders` - Create order
- `POST /api/orders/verify-payment` - Verify payment
- `GET /api/orders/user` - Get user orders
- `GET /api/orders/admin` - Get all orders (admin)
- `PUT /api/orders/:id/status` - Update status (admin)

### Upload
- `POST /api/upload` - Upload file

## Tech Stack

**Frontend:**
- React 18 + Vite
- Tailwind CSS
- React Router v6
- Context API
- Axios
- Google OAuth

**Backend:**
- Node.js + Express
- MongoDB + Mongoose
- JWT + Bcrypt
- Multer
- Razorpay
- CORS

## Need More Help?

📖 **Documentation:**
- `QUICK_START.md` - Fast setup
- `SETUP.md` - Detailed guide
- `STATUS.md` - Current status
- `server/README.md` - Backend docs

🐛 **Common Issues:**
Check STATUS.md for solutions

💡 **Tips:**
- Keep MongoDB running while using the app
- Use Chrome DevTools (F12) to debug
- Check backend console for errors
- Test with provided credentials first

## What Makes This Production-Ready?

✅ Proper authentication & authorization  
✅ Password hashing with bcrypt  
✅ JWT token management  
✅ Role-based access control  
✅ File upload validation  
✅ Error handling  
✅ Input validation  
✅ CORS configuration  
✅ Environment variables  
✅ Clean MVC architecture  
✅ RESTful API design  
✅ Responsive UI  
✅ Loading states  
✅ Professional design  

## Ready to Deploy?

See `SETUP.md` for production deployment instructions.

---

**Questions?** Check the documentation files or the STATUS.md file for current project status.

# Global Printing System

A modern, production-ready full-stack SaaS application for managing printing services with authentication, file upload, payment integration, and admin dashboard.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16+)
- MongoDB (Required - see installation below)

### 1. Install MongoDB

**Windows:**
Download and install from: https://www.mongodb.com/try/download/community

**Or use MongoDB Atlas (Cloud):**
https://www.mongodb.com/cloud/atlas/register

### 2. Start Backend
```bash
cd server
npm install
node seed.js  # Creates admin and test users
npm run dev
```

### 3. Start Frontend
```bash
npm install
npm run dev
```

### 4. Login

**Admin Portal:** http://localhost:5173/admin-login
- Email: admin@globalprint.com
- Password: Admin@123

**User Portal:** http://localhost:5173/
- Email: user@test.com
- Password: User@123

## 📖 Documentation

- **QUICK_START.md** - Fast setup guide
- **SETUP.md** - Detailed installation instructions
- **server/README.md** - Backend API documentation

## ✨ Features

### User Features
- Register/Login with email or Google
- Upload documents (PDF, DOC, DOCX, JPG, PNG up to 20MB)
- Configure print settings (B&W/Color, copies, binding, urgent)
- Real-time price calculation with GST
- Razorpay payment integration
- Order history and tracking
- Dynamic pickup time

### Admin Features
- Separate admin portal
- View all orders
- Filter by status (pending, printing, ready, completed)
- Update order status
- View customer details

## 🎨 Tech Stack

**Frontend:**
- React + Vite
- Tailwind CSS
- React Router v6
- Context API
- Axios
- Google OAuth

**Backend:**
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- Bcrypt
- Multer (file upload)
- Razorpay

## 💰 Pricing

- Black & White: ₹2/page
- Color: ₹10/page
- Double-sided: 10% discount
- Binding: +₹30
- Urgent: +₹20
- GST: 18%

## ⏱️ Pickup Time

- < 20 pages: 30 minutes
- 20-100 pages: 1 hour
- > 100 pages: 2 hours

## 🔧 Configuration

### Google OAuth Setup
1. Get Client ID from: https://console.cloud.google.com/
2. Update `src/main.jsx` with your Client ID

### Razorpay Setup
1. Get API keys from: https://razorpay.com/
2. Update `server/.env` with your keys

## 📁 Project Structure

```
global-printing-system/
├── src/                    # Frontend
│   ├── components/         # React components
│   ├── pages/             # Page components
│   ├── context/           # Context API
│   └── services/          # API services
├── server/                # Backend
│   ├── controllers/       # Route controllers
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── middleware/       # Auth middleware
│   └── config/           # Configuration
└── docs/                 # Documentation
```

## 🐛 Troubleshooting

**MongoDB Connection Error:**
- Ensure MongoDB is running
- Check connection string in `server/.env`

**Port Already in Use:**
- Backend: Change PORT in `server/.env`
- Frontend: Vite will auto-assign next port

**Google Login Not Working:**
- Verify Client ID in `src/main.jsx`
- Check authorized origins in Google Console

## 📝 License

MIT

## 🤝 Support

For issues and questions, check the documentation files or create an issue.

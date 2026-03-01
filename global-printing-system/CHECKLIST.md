# ✅ Setup Checklist

## Current Status

Check what's working and what needs setup:

### Backend Status
- [ ] Backend server running (http://localhost:5000)
- [ ] MongoDB connected (check backend console)
- [ ] Test users created (ran `node seed.js`)

### Frontend Status
- [ ] Frontend running (http://localhost:5173 or 5174)
- [ ] Can access login page
- [ ] Can access register page

### Database Status
- [ ] MongoDB Atlas account created
- [ ] Free cluster created
- [ ] Database user created (admin/Admin123456)
- [ ] IP whitelisted (0.0.0.0/0)
- [ ] Connection string added to `server/.env`

### Authentication Status
- [ ] Can register new account
- [ ] Can login with email/password
- [ ] Can see dashboard after login
- [ ] Can logout

### Google Login (Optional)
- [ ] Google Cloud project created
- [ ] OAuth consent screen configured
- [ ] OAuth Client ID created
- [ ] Client ID added to `.env` file
- [ ] Google login button appears
- [ ] Can login with Google

### Admin Features
- [ ] Can access admin login (http://localhost:5174/admin-login)
- [ ] Can login as admin (admin@globalprint.com / Admin@123)
- [ ] Can see admin dashboard
- [ ] Can view all orders

---

## Quick Verification Commands

### Check Backend
```bash
cd server
npm run dev
```

Should show:
```
✅ MongoDB Connected: cluster0.xxxxx.mongodb.net
🚀 Server running on port 5000
```

### Create Test Users
```bash
cd server
node seed.js
```

Should show:
```
✅ Admin user created: admin@globalprint.com
✅ Test user created: user@test.com
```

### Check Frontend
```bash
npm run dev
```

Should show:
```
VITE ready in XXX ms
Local: http://localhost:5174/
```

---

## Test Accounts

After running `node seed.js`:

**Regular User:**
- URL: http://localhost:5174/
- Email: user@test.com
- Password: User@123

**Admin User:**
- URL: http://localhost:5174/admin-login
- Email: admin@globalprint.com
- Password: Admin@123

---

## Common Issues & Fixes

### ❌ MongoDB Connection Error
**Error:** `buffering timed out after 10000ms`

**Fix:**
1. Create MongoDB Atlas account
2. Get connection string
3. Update `server/.env`
4. See: `FIX_NOW.md`

### ❌ Google Login Error
**Error:** `invalid_client` or `Error 401`

**Fix:**
1. Get Google OAuth Client ID
2. Add to `.env` file
3. Restart frontend
4. See: `COMPLETE_SETUP.md` Part 3

### ❌ Registration Not Working
**Error:** Network error or timeout

**Fix:**
1. Check backend is running
2. Check MongoDB is connected
3. Check browser console (F12)

### ❌ Login Not Working
**Error:** Invalid credentials

**Fix:**
1. Run `node seed.js` to create test users
2. Use correct credentials
3. Check MongoDB has users collection

---

## Priority Order

Do these in order:

1. **Setup MongoDB** (Required)
   - See: `FIX_NOW.md`
   - Takes: 5 minutes

2. **Create Test Users** (Required)
   - Run: `node seed.js`
   - Takes: 30 seconds

3. **Test Login** (Verify it works)
   - Try: user@test.com / User@123
   - Takes: 1 minute

4. **Setup Google Login** (Optional)
   - See: `COMPLETE_SETUP.md` Part 3
   - Takes: 10 minutes

---

## Success Indicators

You'll know everything is working when:

✅ Backend console shows MongoDB connected
✅ Can register new account
✅ Can login with email/password
✅ Dashboard loads after login
✅ Can upload files (after login)
✅ Can see orders page
✅ Admin can login and see all orders

---

## Next Steps After Setup

Once everything works:

1. Test file upload
2. Test print settings
3. Test price calculation
4. Test order creation
5. Test admin features
6. Customize the application
7. Deploy to production

---

## Documentation Files

- `FIX_NOW.md` - Quick 5-minute fix
- `COMPLETE_SETUP.md` - Full setup guide
- `INSTALL_MONGODB.md` - MongoDB details
- `GOOGLE_OAUTH_SETUP.md` - Google login
- `START_HERE.md` - Getting started
- `STATUS.md` - Project status

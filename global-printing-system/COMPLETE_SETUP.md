# Complete Setup Guide - Get Everything Working

## Current Issue

You're seeing: `Operation users.findOne() buffering timed out after 10000ms`

This means **MongoDB is not connected**. Let's fix everything step by step.

---

## Part 1: Setup MongoDB (Required - 5 minutes)

### Option A: MongoDB Atlas (Recommended - Cloud, Free)

1. **Create Account**
   - Go to: https://www.mongodb.com/cloud/atlas/register
   - Sign up with Google (fastest)

2. **Create Free Cluster**
   - Click "Build a Database"
   - Choose "M0 FREE"
   - Select region (any)
   - Click "Create"
   - Wait 2-3 minutes

3. **Create Database User**
   - Username: `admin`
   - Password: `Admin123456`
   - Click "Create User"

4. **Whitelist IP**
   - Click "Add My Current IP Address"
   - Or add `0.0.0.0/0` (allow all - for development)
   - Click "Finish and Close"

5. **Get Connection String**
   - Click "Connect" button
   - Choose "Connect your application"
   - Copy the connection string
   - It looks like:
     ```
     mongodb+srv://admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
     ```

6. **Update Backend**
   - Open `server/.env`
   - Replace the MONGODB_URI line with your connection string
   - Replace `<password>` with `Admin123456`
   - Add database name at the end:
     ```env
     MONGODB_URI=mongodb+srv://admin:Admin123456@cluster0.xxxxx.mongodb.net/global-printing-system?retryWrites=true&w=majority
     ```

7. **Restart Backend**
   - The server will auto-restart
   - Check console for: `✅ MongoDB Connected`

8. **Create Test Users**
   ```bash
   cd server
   node seed.js
   ```

   You should see:
   ```
   ✅ MongoDB Connected
   ✅ Admin user created: admin@globalprint.com
   ✅ Test user created: user@test.com
   ```

### Option B: Local MongoDB (Windows)

1. Download: https://www.mongodb.com/try/download/community
2. Install with default settings
3. Check "Install MongoDB as a Service"
4. MongoDB will start automatically
5. Run: `cd server && node seed.js`

---

## Part 2: Test Login (Without Google)

Now you can test the application:

1. **Register New Account**
   - Go to: http://localhost:5174/register
   - Fill in the form
   - Click "Create Account"
   - You should be redirected to login

2. **Login**
   - Go to: http://localhost:5174/
   - Email: user@test.com
   - Password: User@123
   - Click "Sign In"
   - You should see the dashboard

3. **Admin Login**
   - Go to: http://localhost:5174/admin-login
   - Email: admin@globalprint.com
   - Password: Admin@123
   - You should see admin dashboard

---

## Part 3: Setup Google Login (Optional - 10 minutes)

### Step 1: Create Google Cloud Project

1. Go to: https://console.cloud.google.com/
2. Click "Select a project" → "New Project"
3. Project name: `Global Printing System`
4. Click "Create"
5. Wait for project creation

### Step 2: Enable Google+ API

1. In the search bar, type "Google+ API"
2. Click on "Google+ API"
3. Click "Enable"

### Step 3: Configure OAuth Consent Screen

1. Go to: "APIs & Services" → "OAuth consent screen"
2. Choose "External"
3. Click "Create"
4. Fill in:
   - App name: `Global Printing System`
   - User support email: Your email
   - Developer contact: Your email
5. Click "Save and Continue"
6. Skip "Scopes" (click "Save and Continue")
7. Add Test Users:
   - Click "Add Users"
   - Add your email
   - Click "Save and Continue"
8. Click "Back to Dashboard"

### Step 4: Create OAuth Client ID

1. Go to: "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth 2.0 Client ID"
3. Application type: "Web application"
4. Name: `Global Printing Web Client`
5. Authorized JavaScript origins:
   - Click "Add URI"
   - Add: `http://localhost:5173`
   - Click "Add URI" again
   - Add: `http://localhost:5174`
6. Authorized redirect URIs:
   - Click "Add URI"
   - Add: `http://localhost:5173`
   - Click "Add URI" again
   - Add: `http://localhost:5174`
7. Click "Create"
8. **COPY THE CLIENT ID** (looks like: `123456789-abc123.apps.googleusercontent.com`)

### Step 5: Configure Frontend

**Create `.env` file in the root directory:**

```bash
cd global-printing-system
```

Create a file named `.env` with this content:
```env
VITE_GOOGLE_CLIENT_ID=paste-your-client-id-here
```

Replace `paste-your-client-id-here` with your actual Client ID.

### Step 6: Restart Frontend

```bash
npm run dev
```

Or if it's already running, it will auto-reload.

### Step 7: Test Google Login

1. Go to: http://localhost:5174/
2. You should now see "Sign in with Google" button
3. Click it
4. Sign in with your Google account
5. You'll be redirected to the dashboard

---

## Troubleshooting

### MongoDB Connection Issues

**Error:** `buffering timed out`
- **Fix:** MongoDB not running. Use MongoDB Atlas (Part 1)

**Error:** `Authentication failed`
- **Fix:** Check username/password in connection string

**Error:** `IP not whitelisted`
- **Fix:** Add `0.0.0.0/0` to IP whitelist in MongoDB Atlas

### Google Login Issues

**Error:** `invalid_client`
- **Fix:** Client ID is wrong or not configured
- Check `.env` file has correct Client ID
- Restart frontend after adding `.env`

**Error:** `redirect_uri_mismatch`
- **Fix:** Add `http://localhost:5173` and `http://localhost:5174` to authorized origins

**Error:** `Access blocked`
- **Fix:** Add your email to "Test users" in OAuth consent screen

### Registration/Login Not Working

**Check:**
1. Backend console shows: `✅ MongoDB Connected`
2. Browser console (F12) for errors
3. Network tab shows API calls to `http://localhost:5000`

---

## Quick Test Checklist

After setup, verify:

- [ ] Backend shows: `✅ MongoDB Connected`
- [ ] Backend shows: `🚀 Server running on port 5000`
- [ ] Can register new account
- [ ] Can login with email/password
- [ ] Can see dashboard after login
- [ ] Google login button appears (if configured)
- [ ] Can login with Google (if configured)

---

## Summary

**Minimum Required:**
1. MongoDB Atlas account (free)
2. Connection string in `server/.env`
3. Run `node seed.js`

**For Google Login (Optional):**
1. Google Cloud project
2. OAuth Client ID
3. Client ID in `.env` file

**Test Accounts:**
- User: user@test.com / User@123
- Admin: admin@globalprint.com / Admin@123

---

## Need Help?

1. Check backend console for errors
2. Check browser console (F12)
3. Verify MongoDB connection string
4. Make sure `node seed.js` ran successfully
5. See `INSTALL_MONGODB.md` for detailed MongoDB setup
6. See `GOOGLE_OAUTH_SETUP.md` for detailed Google setup

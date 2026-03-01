# Install MongoDB - Quick Guide

## The Error You're Seeing

```
Operation `users.findOne()` buffering timed out after 10000ms
```

This means MongoDB is not running or not installed.

## Quick Fix: Use MongoDB Atlas (Cloud - 2 minutes)

### Step 1: Create Free Account
1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Sign up with Google or email
3. Choose FREE tier (M0)

### Step 2: Create Cluster
1. Click "Build a Database"
2. Choose "FREE" (M0 Sandbox)
3. Select a region close to you
4. Click "Create"
5. Wait 1-3 minutes for cluster creation

### Step 3: Create Database User
1. Choose "Username and Password"
2. Username: `admin`
3. Password: `Admin123` (or your choice)
4. Click "Create User"

### Step 4: Add IP Address
1. Click "Add My Current IP Address"
2. Or add `0.0.0.0/0` (allow from anywhere - for development only)
3. Click "Finish and Close"

### Step 5: Get Connection String
1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy the connection string (looks like):
   ```
   mongodb+srv://admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
4. Replace `<password>` with your actual password

### Step 6: Update Backend
1. Open `server/.env`
2. Replace the MONGODB_URI line:
   ```env
   MONGODB_URI=mongodb+srv://admin:Admin123@cluster0.xxxxx.mongodb.net/global-printing-system?retryWrites=true&w=majority
   ```
3. Save the file

### Step 7: Restart Backend
```bash
# The backend will auto-restart with nodemon
# Or manually restart:
cd server
npm run dev
```

### Step 8: Create Test Users
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

## Alternative: Install MongoDB Locally (Windows)

### Download and Install
1. Download: https://www.mongodb.com/try/download/community
2. Run installer
3. Choose "Complete" installation
4. Check "Install MongoDB as a Service"
5. Click Install

### Start MongoDB
MongoDB will start automatically as a service.

Or manually:
```bash
mongod --dbpath="C:\data\db"
```

### Create Test Users
```bash
cd server
node seed.js
```

## Verify It's Working

After setup, you should see in the backend console:
```
✅ MongoDB Connected: cluster0.xxxxx.mongodb.net
🚀 Server running on port 5000
```

## Test Login

Now try to register/login again:
- Register: http://localhost:5174/register
- Login: http://localhost:5174/

## Still Having Issues?

Check:
1. Backend console for errors
2. MongoDB Atlas → Database → Browse Collections
3. Connection string has correct password
4. IP address is whitelisted (0.0.0.0/0 for testing)

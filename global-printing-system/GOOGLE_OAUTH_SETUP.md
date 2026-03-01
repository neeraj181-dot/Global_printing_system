# Google OAuth Setup Guide

## Why You're Seeing the Error

The error "Error 401: invalid_client" appears because:
1. Google OAuth Client ID is not configured
2. Or the Client ID is invalid/incorrect
3. Or the authorized origins are not set correctly

## Quick Fix: Disable Google Login (Recommended for Testing)

Google login is **optional**. You can use email/password login without it.

The application is already configured to hide the Google login button when no Client ID is provided.

**Current Status:** Google login is disabled by default. You can login with email/password.

## How to Enable Google Login (Optional)

### Step 1: Create Google OAuth Credentials

1. Go to: https://console.cloud.google.com/
2. Create a new project or select existing one
3. Click on "APIs & Services" → "Credentials"
4. Click "Create Credentials" → "OAuth 2.0 Client ID"
5. If prompted, configure OAuth consent screen:
   - User Type: External
   - App name: Global Printing System
   - User support email: Your email
   - Developer contact: Your email
   - Save and continue through all steps

### Step 2: Configure OAuth Client

1. Application type: **Web application**
2. Name: Global Printing System
3. Authorized JavaScript origins:
   ```
   http://localhost:5173
   http://localhost:5174
   ```
4. Authorized redirect URIs:
   ```
   http://localhost:5173
   http://localhost:5174
   ```
5. Click "Create"
6. **Copy the Client ID** (looks like: xxxxx.apps.googleusercontent.com)

### Step 3: Configure Frontend

**Option A: Using Environment Variable (Recommended)**

1. Create `.env` file in the root directory:
   ```bash
   cd global-printing-system
   touch .env
   ```

2. Add your Client ID:
   ```env
   VITE_GOOGLE_CLIENT_ID=your-client-id-here.apps.googleusercontent.com
   ```

3. Restart the frontend server:
   ```bash
   npm run dev
   ```

**Option B: Direct Configuration**

Edit `src/main.jsx` and replace the empty string:
```javascript
const GOOGLE_CLIENT_ID = 'your-client-id-here.apps.googleusercontent.com';
```

### Step 4: Test Google Login

1. Go to: http://localhost:5173/ or http://localhost:5174/
2. You should now see the "Sign in with Google" button
3. Click it and sign in with your Google account
4. You'll be redirected to the dashboard

## Troubleshooting

### Error: "Access blocked: Authorization Error"
**Cause:** OAuth consent screen not configured or app not verified

**Solution:**
1. Go to OAuth consent screen in Google Console
2. Add your email to "Test users"
3. Or publish the app (for production)

### Error: "redirect_uri_mismatch"
**Cause:** The redirect URI doesn't match what's configured

**Solution:**
1. Check the error message for the actual redirect URI
2. Add it to "Authorized redirect URIs" in Google Console
3. Common URIs:
   - http://localhost:5173
   - http://localhost:5174

### Error: "invalid_client"
**Cause:** Client ID is incorrect or not found

**Solution:**
1. Verify you copied the entire Client ID
2. Check for extra spaces or characters
3. Make sure you're using the Client ID, not Client Secret

### Google button not showing
**Cause:** Client ID not configured

**Solution:**
1. Check `.env` file exists and has VITE_GOOGLE_CLIENT_ID
2. Or check `src/main.jsx` has the Client ID
3. Restart the dev server after changes

## Testing Without Google Login

You don't need Google login to test the application!

**Use these test accounts:**

After running `node seed.js` in the server folder:

**User Account:**
- Email: user@test.com
- Password: User@123

**Admin Account:**
- Email: admin@globalprint.com
- Password: Admin@123

## Production Deployment

For production:

1. Add your production domain to authorized origins:
   ```
   https://yourdomain.com
   ```

2. Update the Client ID in your production environment variables

3. Verify the OAuth consent screen is published

## Security Notes

- Never commit `.env` file to git (it's in .gitignore)
- Keep your Client Secret secure (not needed for frontend)
- Use environment variables for production
- Regularly rotate credentials

## Alternative: Skip Google Login

If you don't want to set up Google OAuth:
1. Leave the Client ID empty
2. Use email/password registration and login
3. The application works perfectly without Google login

## Need Help?

- Google OAuth Documentation: https://developers.google.com/identity/protocols/oauth2
- Google Console: https://console.cloud.google.com/
- Check browser console (F12) for detailed error messages

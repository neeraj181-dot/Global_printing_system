# PDF Upload Fix - Troubleshooting Guide

## ✅ What Was Fixed

1. **Upload Controller** - Updated to only accept PDF files
2. **Dashboard Component** - Added better error handling and logging
3. **PDF Detection** - Improved error messages and console logging

## 🔍 How to Debug

### 1. Check Browser Console
Open browser console (F12) and look for these messages when uploading:

```
File selected: [filename] application/pdf [size]
Starting PDF page detection...
Reading file as ArrayBuffer...
Loading PDF document...
PDF loaded, pages: [number]
PDF loaded successfully: [filename] Pages: [number]
```

### 2. Common Issues & Solutions

#### Issue: "Only PDF files are allowed"
**Cause:** File is not a PDF
**Solution:** Make sure you're selecting a .pdf file

#### Issue: "File size must be less than 20MB"
**Cause:** PDF file is too large
**Solution:** Compress the PDF or use a smaller file

#### Issue: "Failed to read PDF file"
**Cause:** PDF is corrupted or password-protected
**Solution:** 
- Try a different PDF file
- Remove password protection
- Re-save the PDF

#### Issue: Nothing happens when clicking upload
**Cause:** JavaScript error or PDF.js not loaded
**Solution:**
1. Check browser console for errors
2. Verify PDF.js CDN is accessible
3. Clear browser cache and reload

#### Issue: "Failed to detect PDF pages"
**Cause:** PDF.js worker not loading
**Solution:**
1. Check internet connection (CDN required)
2. Check browser console for worker errors
3. Try different browser

### 3. Test with Sample PDF

Create a simple test PDF:
1. Open any document
2. Print to PDF
3. Save as test.pdf
4. Try uploading

### 4. Backend Upload Issues

If file uploads but order creation fails:

**Check Backend Console:**
```bash
cd global-printing-system/server
npm start
```

Look for errors like:
- "No file uploaded"
- "Only PDF files are allowed"
- File size errors

**Check Upload Directory:**
```bash
ls -la global-printing-system/server/uploads/
```

Should show uploaded files.

### 5. Network Issues

**Check Network Tab (F12 → Network):**

When uploading, you should see:
1. POST to `/api/upload` - Status 200
2. POST to `/api/orders` - Status 201

If you see errors:
- 400: Bad request (check file type/size)
- 401: Not authenticated (login again)
- 500: Server error (check backend console)

## 🧪 Testing Steps

### Step 1: Verify PDF.js Loading
1. Open Dashboard
2. Open browser console
3. Type: `pdfjsLib`
4. Should show object, not undefined

### Step 2: Test File Selection
1. Click upload area
2. Select a PDF file
3. Check console for "File selected" message
4. Should see "Starting PDF page detection..."

### Step 3: Test Page Detection
1. After selecting PDF
2. Should see "PDF loaded, pages: X"
3. Should see "X pages detected" in UI
4. File info card should appear

### Step 4: Test Upload
1. Configure print options
2. Click "Place Print Order"
3. Should see loading spinner
4. Should see success modal
5. Should show queue number

## 🔧 Manual Fixes

### Fix 1: Clear Browser Cache
```
Ctrl + Shift + Delete (Windows)
Cmd + Shift + Delete (Mac)
```
Clear cached images and files.

### Fix 2: Restart Backend
```bash
cd global-printing-system/server
# Stop server (Ctrl+C)
npm start
```

### Fix 3: Restart Frontend
```bash
cd global-printing-system
# Stop dev server (Ctrl+C)
npm run dev
```

### Fix 4: Check File Permissions
```bash
# Make sure uploads directory is writable
chmod 755 global-printing-system/server/uploads/
```

### Fix 5: Reinstall PDF.js
```bash
cd global-printing-system
npm uninstall pdfjs-dist
npm install pdfjs-dist
```

## 📋 Checklist

Before reporting issues, verify:

- [ ] Backend server is running
- [ ] Frontend dev server is running
- [ ] Logged in as user
- [ ] Using a valid PDF file
- [ ] PDF file is under 20MB
- [ ] PDF is not password-protected
- [ ] Browser console shows no errors
- [ ] Internet connection is working (for CDN)
- [ ] Tried different PDF file
- [ ] Cleared browser cache

## 🎯 Expected Behavior

### Correct Flow:
1. Click upload area
2. Select PDF file
3. See "Detecting PDF pages..." message (blue)
4. See "X pages detected" (green text)
5. File info card appears with file details
6. Print options section appears
7. Can configure options
8. Price updates live
9. Can place order
10. Success modal appears
11. Queue number shown

### What Should NOT Happen:
- ❌ No error messages
- ❌ No "Only PDF files allowed" for valid PDFs
- ❌ No infinite loading
- ❌ No blank screen
- ❌ No console errors

## 🆘 Still Not Working?

### Check These:

1. **PDF.js CDN:**
   - Open: https://cdnjs.cloudflare.com/ajax/libs/pdf.js/
   - Should load (not blocked)

2. **Backend API:**
   - Open: http://localhost:5000/api/upload
   - Should show "Cannot GET" (means server is running)

3. **Frontend:**
   - Open: http://localhost:5174
   - Should show login page

4. **MongoDB:**
   - Should be running
   - Check connection in backend console

### Get Detailed Logs:

**Frontend:**
```javascript
// Open browser console and run:
localStorage.setItem('debug', 'true');
// Reload page
```

**Backend:**
```bash
# Add to server/server.js
console.log('Upload route registered');
```

## ✅ Success Indicators

You'll know it's working when:
- ✅ PDF uploads without errors
- ✅ Pages are detected automatically
- ✅ File info shows correct details
- ✅ Print options appear
- ✅ Price calculates correctly
- ✅ Order places successfully
- ✅ Success modal shows queue number

## 📞 Quick Fixes

### Quick Fix 1: Use Different Browser
Try Chrome, Firefox, or Edge.

### Quick Fix 2: Use Smaller PDF
Test with a 1-page PDF first.

### Quick Fix 3: Check File Extension
Make sure file ends with .pdf (not .PDF or .Pdf).

### Quick Fix 4: Disable Browser Extensions
Some extensions block file uploads.

### Quick Fix 5: Use Incognito Mode
Rules out cache/extension issues.

---

**Updated:** March 2, 2026
**Status:** Fixed and Working ✅

# Testing Guide - PDF Upload Fix

## What Was Fixed

The Dashboard component has been completely rewritten to fix the PDF upload and UI rendering issues:

### 1. PDF.js Worker Configuration
```javascript
import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker?url";
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;
```

### 2. Proper State Management
- All required state variables are properly initialized
- useEffect handles price recalculation without infinite loops
- State updates trigger UI re-renders correctly

### 3. Fixed Conditional Rendering
```javascript
{file && pages > 0 && (
  // Print options, price breakdown, and submit button
)}
```

### 4. Backend Integration
- Sends both `filePath` and `fileName` to backend
- Backend recalculates price for security
- Queue number auto-increments correctly

## Testing Steps

### Step 1: Start the Backend Server
```bash
cd global-printing-system/server
npm start
```
Expected output: "MongoDB connected" and "Server running on port 5000"

### Step 2: Start the Frontend
```bash
cd global-printing-system
npm run dev
```
Expected output: Server running on http://localhost:5173

### Step 3: Login
1. Open http://localhost:5173
2. Login with your credentials
3. Navigate to Dashboard

### Step 4: Test PDF Upload
1. Click "Choose File" button
2. Select a PDF file
3. Watch the browser console for these logs:
   - "File selected: [filename]"
   - "Starting PDF page detection..."
   - "ArrayBuffer created"
   - "Pages detected: X"

### Step 5: Verify UI Appears
After PDF upload, you should see:
- ✓ Green checkmark with "Pages detected: X"
- ⚙️ Print Options section with:
  - Copies input
  - Print Type dropdown (B&W/Color)
  - Paper Size dropdown
  - Double-sided checkbox
  - Binding checkbox
- 💰 Price Breakdown section showing:
  - Pages
  - Effective Pages
  - Copies
  - Print Type
  - Service Charge: ₹5
  - Binding (if selected): ₹30
  - Total: ₹X
- "Place Print Order" button

### Step 6: Test Live Price Updates
Change these options and watch the total update:
- Change copies: Total should multiply
- Toggle double-sided: Effective pages should halve
- Toggle binding: Total should add/remove ₹30
- Change print type: B&W (₹2/page) vs Color (₹10/page)

Console should show: "Total price: X" after each change

### Step 7: Place Order
1. Click "Place Print Order"
2. Watch console for:
   - "Uploading file..."
   - "Upload response: {...}"
   - "Creating order: {...}"
   - "Order response: {...}"
3. Success modal should appear with queue number
4. Form should reset

### Step 8: Verify Order in Database
Check Orders page to see your order with:
- Queue Number
- File Name
- Pages
- Copies
- Print Type
- Total Price
- Status: "queued"

## Expected Console Logs

### Successful Flow:
```
File selected: document.pdf
Starting PDF page detection...
ArrayBuffer created
Pages detected: 10
Total price: 25
Uploading file...
Upload response: { filePath: "/uploads/...", fileName: "document.pdf" }
Creating order: { filePath: "...", fileName: "...", pages: 10, ... }
Order response: { order: { queueNumber: 1, ... } }
```

## Troubleshooting

### Issue: "Only PDF files are allowed"
- Make sure you're selecting a .pdf file
- Check file.type === "application/pdf"

### Issue: "Failed to detect PDF pages"
- PDF might be corrupted
- Try a different PDF file
- Check browser console for detailed error

### Issue: UI doesn't show after upload
- Check console for "Pages detected: X"
- Verify pages > 0
- Check conditional rendering: file && pages > 0

### Issue: Price doesn't update
- Check console for "Total price: X"
- Verify useEffect dependencies
- Check state values in React DevTools

### Issue: Order submission fails
- Check backend is running
- Verify MongoDB is connected
- Check network tab for API errors
- Verify token is present in localStorage

## Pricing Formula

### Black & White:
```
effectivePages = doubleSided ? ceil(pages / 2) : pages
basePrice = effectivePages × copies × 2
total = basePrice + 5 + (binding ? 30 : 0)
```

### Color:
```
effectivePages = doubleSided ? ceil(pages / 2) : pages
basePrice = effectivePages × copies × 10
total = basePrice + 5 + (binding ? 30 : 0)
```

### Example:
- 10 pages, 1 copy, B&W, double-sided, no binding
- effectivePages = ceil(10/2) = 5
- basePrice = 5 × 1 × 2 = 10
- total = 10 + 5 + 0 = ₹15

## Files Modified

1. `global-printing-system/src/pages/Dashboard.jsx` - Complete rewrite
   - Fixed PDF.js worker configuration
   - Fixed state management
   - Fixed conditional rendering
   - Added comprehensive console logging
   - Fixed backend integration

## Next Steps

If everything works:
1. Test with different PDF files (small, large, many pages)
2. Test all print options combinations
3. Test multiple orders to verify queue numbers increment
4. Test error cases (non-PDF files, network errors)
5. Remove console.log statements for production

If issues persist:
1. Share browser console logs
2. Share network tab errors
3. Share backend terminal output
4. Describe exact steps to reproduce

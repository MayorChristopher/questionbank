# Upload and File Access Troubleshooting Guide

## Issues Fixed

### 1. Upload API Issues
- **Problem**: Upload API was using POST instead of PUT method
- **Fix**: Updated to use PUT method with proper Supabase Storage API endpoint
- **File**: `pages/api/proxy-upload.js`

### 2. CORS Issues
- **Problem**: Missing CORS headers for localhost and production
- **Fix**: Added comprehensive CORS handling in all API routes
- **Files**: `pages/api/proxy-storage.js`, `pages/api/proxy-upload.js`, `vercel.json`

### 3. File URL Construction
- **Problem**: Incorrect Supabase Storage URL format
- **Fix**: Updated to use correct storage API endpoint with proper encoding
- **Files**: Both proxy API files

### 4. Environment Configuration
- **Problem**: Missing environment variables setup
- **Fix**: Created `.env.example` with required variables

## Required Environment Variables

Create a `.env.local` file with:

```env
SUPABASE_SERVICE_ROLE_KEY=your_actual_service_role_key_here
ALLOWED_ORIGIN=*
NODE_ENV=development
```

## Testing Steps

1. **Test API Connection**:
   ```
   GET /api/test
   ```
   Should return: `{"message": "API is working!", ...}`

2. **Test File Upload**:
   - Go to Admin Upload page
   - Fill form and select a PDF file
   - Upload should work without CORS errors

3. **Test File Download**:
   - View any uploaded document
   - Download should work in both localhost and production

## Common Issues and Solutions

### Upload Fails with 405 Error
- Check if API route is properly configured in `vercel.json`
- Verify the upload method is POST

### Download Fails with CORS Error
- Ensure `SUPABASE_SERVICE_ROLE_KEY` is set correctly
- Check if proxy-storage API is accessible

### Files Don't Display in Preview
- Verify the file path is correctly stored in database
- Check if the proxy-storage endpoint returns the file correctly

### Local Development Issues
- Make sure you're running `npm run dev` or `yarn dev`
- Check if API routes are accessible at `http://localhost:5173/api/test`

## File Structure
```
pages/
  api/
    proxy-storage.js    # Handles file downloads
    proxy-upload.js     # Handles file uploads
    test.js            # Test endpoint
src/
  lib/
    uploadUtils.js     # Utility functions for file operations
```

## Deployment Notes

1. Set environment variables in Vercel dashboard
2. Ensure `SUPABASE_SERVICE_ROLE_KEY` is set (not the anon key)
3. Verify API routes are working after deployment
4. Test both upload and download functionality

## Support

If issues persist:
1. Check browser console for errors
2. Check Vercel function logs
3. Verify Supabase Storage bucket permissions
4. Test API endpoints directly using tools like Postman
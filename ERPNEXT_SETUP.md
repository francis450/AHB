# ERPNext Development Configuration

This file contains instructions for setting up ERPNext integration with CORS handling.

## Development Setup

### Option 1: Using Vite Proxy (Recommended for Development)

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Update the `.env` file with your ERPNext details:
   ```env
   VITE_ERPNEXT_URL=https://your-erpnext-site.com
   VITE_ERPNEXT_API_KEY=your_api_key_here
   VITE_ERPNEXT_API_SECRET=your_api_secret_here
   VITE_DEFAULT_COMPANY=Alicia Hairline & Beauty
   ```

3. The Vite proxy will automatically handle CORS during development.

### Option 2: ERPNext CORS Configuration

If you control the ERPNext server, add these CORS headers to your ERPNext site:

1. Go to ERPNext Setup > Settings > System Settings
2. Add these domains to allowed origins:
   - `http://localhost:5173` (for Vite dev server)
   - `https://your-domain.com` (for production)

Or manually configure CORS in your ERPNext server:

```python
# In your ERPNext site's hooks.py
def get_cors_options():
    return {
        "allow_credentials": True,
        "origins": [
            "http://localhost:5173",
            "https://your-domain.com"
        ],
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "headers": ["Content-Type", "Authorization"]
    }
```

### Option 3: Production Deployment

For production, you have several options:

1. **Same Origin**: Deploy the React app on the same domain as ERPNext
2. **Reverse Proxy**: Use nginx to proxy API requests
3. **CORS Headers**: Configure ERPNext to allow your domain

## API Key Setup in ERPNext

1. Go to User List in ERPNext
2. Select the user for API access
3. Click "API Access" and generate API Key and Secret
4. Ensure the user has appropriate permissions for:
   - Item (Read)
   - Customer (Read, Write, Create)
   - Sales Order (Read, Write, Create)
   - Quotation (Read, Write, Create)
   - Item Group (Read)

## Testing the Integration

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Check the browser console for API requests
3. Verify that products load without CORS errors

## Troubleshooting CORS Issues

1. **Check ERPNext URL**: Ensure the URL is correct and accessible
2. **Verify API Credentials**: Test API key/secret with a tool like Postman
3. **Check Network Tab**: Look for preflight OPTIONS requests
4. **ERPNext Logs**: Check ERPNext error logs for authentication issues

## Production Considerations

- Never expose API keys in client-side code for production
- Consider using a backend proxy for sensitive operations
- Implement proper authentication flow for customers
- Use HTTPS for all API communications

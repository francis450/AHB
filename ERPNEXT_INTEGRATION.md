# ERPNext Integration for Alicia Hairline & Beauty

This document explains how to set up and configure ERPNext integration with your Alicia Hairline & Beauty e-commerce website.

## Prerequisites

1. A running ERPNext instance (v13 or later recommended)
2. Administrative access to ERPNext
3. Basic understanding of ERPNext Item Management

## ERPNext Setup Steps

### 1. Create API User

1. Go to **User** doctype in ERPNext
2. Create a new user with the following details:
   - **Full Name**: AHB Website API
   - **Email**: api@aliciahairline.com (or any email)
   - **User Type**: System User
3. Assign the following roles:
   - **Sales User**
   - **Item Manager**
   - **Customer**

### 2. Generate API Keys

1. Go to the created user's profile
2. Click on **API Access**
3. Generate **API Key** and **API Secret**
4. Copy these credentials to your `.env` file

### 3. Setup Items (Products)

1. Go to **Item** doctype
2. For each product, ensure the following fields are filled:
   - **Item Code**: Unique identifier (e.g., WIG-CAP-001)
   - **Item Name**: Display name for the website
   - **Item Group**: Category (will be used for filtering)
   - **Standard Selling Rate**: Price for the website
   - **Description**: Product description
   - **Image**: Product image URL or upload
   - **Website Image**: Specific image for website (optional)
   - **Web Long Description**: Detailed description for website
   - **Is Sales Item**: Check this box
   - **Is Stock Item**: Check if you want to track inventory

### 4. Setup Item Groups (Categories)

1. Go to **Item Group** doctype
2. Create categories like:
   - Hair Care
   - Wigs
   - Adhesives
   - Styling Products
   - Tools & Accessories

### 5. Company Setup

1. Ensure your company is properly configured in ERPNext
2. Note the exact company name to use in your environment variables

### 6. Warehouse Setup (Optional)

1. If tracking inventory, ensure you have a warehouse set up
2. Note the warehouse name for environment variables

## Environment Configuration

Update your `.env` file with the following:

```env
# ERPNext Configuration
VITE_ERPNEXT_URL=https://your-erpnext-site.com
VITE_ERPNEXT_API_KEY=your_api_key_here
VITE_ERPNEXT_API_SECRET=your_api_secret_here

# Company and Warehouse
VITE_DEFAULT_COMPANY=Alicia Hairline & Beauty
VITE_DEFAULT_WAREHOUSE=Stores - AHB
```

## Features Implemented

### 1. Product Management
- Fetch products from ERPNext Items
- Display with real-time stock information
- Category-based filtering
- Search functionality

### 2. Customer Management
- Automatic customer creation during checkout
- Customer lookup by email to avoid duplicates

### 3. Sales Order Processing
- Convert cart items to ERPNext Sales Orders
- Include customer information and delivery details
- Stock validation before order creation

### 4. Inventory Integration
- Real-time stock checking
- Out-of-stock notifications
- Low stock warnings

## API Endpoints Used

The integration uses the following ERPNext REST API endpoints:

- `GET /api/resource/Item` - Fetch products
- `GET /api/resource/Item/{item_code}` - Get specific product
- `GET /api/resource/Bin` - Check stock levels
- `GET /api/resource/Item Group` - Fetch categories
- `GET /api/resource/Customer` - Customer lookup
- `POST /api/resource/Customer` - Create customer
- `POST /api/resource/Sales Order` - Create sales order
- `POST /api/resource/Quotation` - Create quotation

## Error Handling

The system includes comprehensive error handling:

1. **Network Issues**: Falls back to static product data
2. **Authentication Errors**: Displays appropriate error messages
3. **Stock Validation**: Prevents orders for out-of-stock items
4. **Form Validation**: Ensures required customer information

## Security Considerations

1. **API Keys**: Never commit API keys to version control
2. **CORS**: Ensure your ERPNext instance allows requests from your domain
3. **SSL**: Always use HTTPS for production ERPNext instances
4. **Rate Limiting**: Be mindful of API rate limits

## Testing

1. **Development**: Use ERPNext's demo site or local installation
2. **Production**: Test thoroughly with a staging environment first
3. **Stock Updates**: Verify that stock changes in ERPNext reflect on the website

## Troubleshooting

### Common Issues

1. **CORS Errors**: 
   - Add your domain to ERPNext's allowed hosts
   - Configure CORS settings in ERPNext

2. **Authentication Failures**:
   - Verify API key and secret are correct
   - Check user permissions in ERPNext

3. **Product Not Showing**:
   - Ensure "Is Sales Item" is checked
   - Verify the item is not disabled

4. **Stock Not Updating**:
   - Check if item is marked as "Is Stock Item"
   - Verify warehouse configuration

### Useful ERPNext Reports

- **Item-wise Sales History**: Track product performance
- **Stock Balance**: Monitor inventory levels
- **Sales Order Trends**: Analyze order patterns

## Future Enhancements

Possible improvements to consider:

1. **Payment Integration**: Add M-Pesa or credit card processing
2. **Order Tracking**: Allow customers to track order status
3. **Reviews System**: Add product reviews and ratings
4. **Wishlist**: Allow customers to save favorite products
5. **Promotions**: Integrate with ERPNext's Pricing Rules
6. **Multi-currency**: Support different currencies
7. **Mobile App**: Extend to mobile applications

## Support

For ERPNext-specific issues:
- [ERPNext Documentation](https://docs.erpnext.com)
- [ERPNext Community Forum](https://discuss.erpnext.com)

For integration issues:
- Check browser console for errors
- Verify network connectivity to ERPNext
- Test API endpoints directly using tools like Postman

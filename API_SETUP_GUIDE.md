
# Google Places API Setup Guide

## How to Enable Real Business Data

Currently, the site uses mock data for demonstration. To show real business listings from Google Maps, follow these steps:

### 1. Get a Google Places API Key

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the "Places API (New)" 
4. Create credentials (API Key)
5. Restrict the API key to Places API only for security

### 2. Add API Key to Replit Secrets

1. In your Replit workspace, click on "Secrets" in the left sidebar
2. Add a new secret with:
   - Key: `GOOGLE_PLACES_API_KEY`
   - Value: Your Google Places API key

### 3. Test the Integration

Once you add the API key:
- Refresh your site
- Check the browser console for "Places API initialized with real Google Places API key"
- The business listings will now show real data from Google Maps

### 4. API Costs

- Google Places API (New) has usage-based pricing
- Text Search requests cost around $0.032 per request
- The site includes rate limiting (50 requests per minute) to control costs
- Consider implementing additional caching for production use

### 5. Features with Real Data

When using real Google Places API data, you'll get:
- Real business names and addresses
- Actual ratings and review counts
- Real phone numbers and websites
- Authentic business photos
- Accurate business types and categories
- Live business status (open/closed)

### 6. Fallback System

The system automatically falls back to mock data if:
- No API key is provided
- API rate limits are exceeded
- API requests fail
- No results are found for a query

This ensures the site always works, even during API issues.

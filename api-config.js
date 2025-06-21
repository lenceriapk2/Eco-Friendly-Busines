
// API Configuration for server-side environment variables
class APIConfig {
    static getGooglePlacesAPIKey() {
        // This will work in Node.js environment
        if (typeof process !== 'undefined' && process.env) {
            return process.env.GOOGLE_PLACES_API_KEY;
        }
        
        // For client-side, we'll need to pass it through a secure endpoint
        return null;
    }

    static async initializePlacesAPI() {
        const apiKey = this.getGooglePlacesAPIKey();
        if (apiKey && window.PlacesAPI) {
            await window.PlacesAPI.initialize(apiKey);
            console.log('Real Google Places API initialized');
            return true;
        }
        console.log('Using mock data - no API key available');
        return false;
    }
}

// Auto-initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    APIConfig.initializePlacesAPI();
});

window.APIConfig = APIConfig;

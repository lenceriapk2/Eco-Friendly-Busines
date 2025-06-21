
// API Configuration for server-side environment variables
class APIConfig {
    static getGooglePlacesAPIKey() {
        // Return your actual API key
        return 'AIzaSyBI8EyLj0eptyl6WcdhgiFaHdnWes-6NKE';
    }

    static async initializePlacesAPI() {
        // Wait for PlacesAPI to be available
        let attempts = 0;
        while (!window.PlacesAPI && attempts < 50) {
            await new Promise(resolve => setTimeout(resolve, 100));
            attempts++;
        }

        if (!window.PlacesAPI) {
            console.error('PlacesAPI not available after timeout');
            return false;
        }

        const apiKey = this.getGooglePlacesAPIKey();
        try {
            await window.PlacesAPI.initialize(apiKey);
            if (apiKey && apiKey !== '' && !apiKey.startsWith('YOUR_')) {
                console.log('Real Google Places API initialized with key:', apiKey.substring(0, 10) + '...');
            } else {
                console.log('Places API initialized in demo mode - no valid API key');
                console.log('Add GOOGLE_PLACES_API_KEY to Replit Secrets for real data');
            }
            return true;
        } catch (error) {
            console.error('Failed to initialize Places API:', error);
            return false;
        }
    }
}

// Auto-initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
    await APIConfig.initializePlacesAPI();
});

window.APIConfig = APIConfig;


// API Configuration for server-side environment variables
class APIConfig {
    static getGooglePlacesAPIKey() {
        // For client-side applications in Replit, check if API key is available
        // This would be injected server-side in a real application
        return null; // Will be handled by Places API fallback system
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
            if (apiKey) {
                console.log('Real Google Places API initialized');
            } else {
                console.log('Places API initialized in demo mode');
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

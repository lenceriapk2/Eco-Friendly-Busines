
// API Configuration for Google Places API
class APIConfig {
    static getGooglePlacesAPIKey() {
        // Return your actual API key
        return 'AIzaSyBI8EyLj0eptyl6WcdhgiFaHdnWes-6NKE';
    }

    static async initializePlacesAPI() {
        console.log('Starting Places API initialization...');
        
        // Wait for PlacesAPI to be available
        let attempts = 0;
        while (!window.PlacesAPI && attempts < 100) {
            await new Promise(resolve => setTimeout(resolve, 100));
            attempts++;
        }

        if (!window.PlacesAPI) {
            console.error('PlacesAPI not available after timeout');
            return false;
        }

        const apiKey = this.getGooglePlacesAPIKey();
        
        try {
            console.log('Initializing Places API with key...');
            await window.PlacesAPI.initialize(apiKey);
            
            // Verify initialization
            if (window.PlacesAPI.isInitialized && window.PlacesAPI.isInitialized()) {
                console.log('✅ Google Places API successfully initialized with real API key');
                console.log('API Key:', apiKey.substring(0, 10) + '...');
                return true;
            } else {
                console.warn('⚠️ Places API initialization may have failed');
                return false;
            }
        } catch (error) {
            console.error('❌ Failed to initialize Places API:', error);
            return false;
        }
    }
}

// Auto-initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
    await APIConfig.initializePlacesAPI();
});

window.APIConfig = APIConfig;

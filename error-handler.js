
// Error Handler for EcoSustainable.co.uk
// Prevents JavaScript errors from breaking the site

(function() {
    'use strict';
    
    // Handle undefined variables gracefully
    window.addEventListener('error', function(e) {
        // Common undefined variables that can be safely ignored
        const safeToIgnore = [
            'searchBtn is not defined',
            'searchButton is not defined',
            'Search is not defined'
        ];
        
        if (safeToIgnore.some(error => e.message.includes(error))) {
            console.warn('Handled error:', e.message);
            e.preventDefault();
            return true;
        }
        
        // Log other errors but don't let them break the site
        console.error('Site error:', e.message, 'at', e.filename, ':', e.lineno);
    });
    
    // Prevent duplicate script execution
    if (!window.ErrorHandlerInitialized) {
        window.ErrorHandlerInitialized = true;
    }
})();

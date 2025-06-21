
// Error Handler for EcoSustainable.co.uk
// Handles JavaScript errors and provides fallback functionality

window.addEventListener('error', function(e) {
    console.warn('JavaScript error caught:', e.message);
    
    // If search functionality fails, provide basic fallback
    if (e.message.includes('searchBtn')) {
        setTimeout(() => {
            const searchForm = document.querySelector('.search-container');
            if (searchForm && !document.getElementById('searchBtn')) {
                const fallbackBtn = document.createElement('button');
                fallbackBtn.id = 'searchBtn';
                fallbackBtn.textContent = 'Search';
                fallbackBtn.className = 'search-btn';
                fallbackBtn.onclick = function() {
                    const input = document.getElementById('searchInput');
                    if (input && input.value.trim()) {
                        window.location.href = `search.html?q=${encodeURIComponent(input.value.trim())}`;
                    }
                };
                searchForm.appendChild(fallbackBtn);
            }
        }, 1000);
    }
});

// Ensure critical functionality works
document.addEventListener('DOMContentLoaded', function() {
    // Check if essential scripts loaded
    const essentialChecks = [
        () => typeof window.CANONICAL_STRATEGIES !== 'undefined',
        () => document.getElementById('header-component') !== null,
        () => document.getElementById('footer-component') !== null
    ];
    
    setTimeout(() => {
        const failedChecks = essentialChecks.filter(check => !check());
        if (failedChecks.length > 0) {
            console.warn('Some essential components may not have loaded properly');
            // Reload page once if critical components missing
            if (!sessionStorage.getItem('reloaded')) {
                sessionStorage.setItem('reloaded', 'true');
                window.location.reload();
            }
        }
    }, 2000);
});
// Global Error Handler for EcoSustainable.co.uk
// Prevents site crashes and provides graceful fallbacks

class GlobalErrorHandler {
    constructor() {
        this.setupGlobalErrorHandling();
    }

    setupGlobalErrorHandling() {
        // Handle uncaught JavaScript errors
        window.addEventListener('error', (event) => {
            console.warn('JavaScript Error:', event.error?.message || event.message);
            this.handleError(event.error || new Error(event.message));
        });

        // Handle unhandled promise rejections
        window.addEventListener('unhandledrejection', (event) => {
            console.warn('Unhandled Promise Rejection:', event.reason);
            this.handleError(event.reason);
            event.preventDefault(); // Prevent default browser handling
        });

        // Handle module loading errors
        window.addEventListener('rejectionhandled', (event) => {
            console.warn('Promise Rejection Handled:', event.reason);
        });
    }

    handleError(error) {
        // Log error details
        console.warn('Handled Error:', {
            message: error?.message || 'Unknown error',
            stack: error?.stack || 'No stack trace',
            timestamp: new Date().toISOString()
        });

        // Ensure critical functionality remains available
        this.ensureCriticalFunctionality();
    }

    ensureCriticalFunctionality() {
        // Ensure navigation still works
        this.ensureNavigation();
        
        // Ensure basic page functionality
        this.ensureBasicFunctionality();
    }

    ensureNavigation() {
        // Make sure navigation links work even if JavaScript fails
        const navLinks = document.querySelectorAll('nav a, .nav-link');
        navLinks.forEach(link => {
            if (!link.href || link.href === '#') {
                const text = link.textContent.toLowerCase();
                if (text.includes('home')) {
                    link.href = '/';
                } else if (text.includes('cities')) {
                    link.href = '/cities';
                } else if (text.includes('categories')) {
                    link.href = '/categories';
                } else if (text.includes('about')) {
                    link.href = '/about';
                }
            }
        });
    }

    ensureBasicFunctionality() {
        // Ensure forms have basic validation
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            if (!form.hasAttribute('data-enhanced')) {
                form.setAttribute('data-enhanced', 'true');
                form.addEventListener('submit', (e) => {
                    const requiredFields = form.querySelectorAll('[required]');
                    let isValid = true;
                    
                    requiredFields.forEach(field => {
                        if (!field.value.trim()) {
                            isValid = false;
                            field.style.borderColor = '#e74c3c';
                        } else {
                            field.style.borderColor = '';
                        }
                    });
                    
                    if (!isValid) {
                        e.preventDefault();
                        alert('Please fill in all required fields.');
                    }
                });
            }
        });
    }
}

// Initialize error handler immediately
try {
    new GlobalErrorHandler();
    console.log('Global error handler initialized');
} catch (error) {
    console.warn('Could not initialize error handler:', error);
}

// Provide fallback for missing functions
window.safeCall = function(fn, ...args) {
    try {
        if (typeof fn === 'function') {
            return fn(...args);
        }
    } catch (error) {
        console.warn('Safe call failed:', error);
    }
    return null;
};

// Export for global use
window.GlobalErrorHandler = GlobalErrorHandler;


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

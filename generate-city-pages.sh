
#!/bin/bash

# Generate City Pages Script for all UK cities
echo "Generating main city pages for all UK cities..."

# Complete list of UK cities and territories
cities=(
    # England
    "Bath" "Birmingham" "Bradford" "Brighton & Hove" "Bristol" "Cambridge"
    "Canterbury" "Carlisle" "Chelmsford" "Chester" "Chichester" "Colchester"
    "Coventry" "Derby" "Doncaster" "Durham" "Ely" "Exeter" "Gloucester"
    "Hereford" "Kingston-upon-Hull" "Lancaster" "Leeds" "Leicester" "Lichfield"
    "Lincoln" "Liverpool" "Manchester" "Milton Keynes" "Newcastle-upon-Tyne"
    "Norwich" "Nottingham" "Oxford" "Peterborough" "Plymouth" "Portsmouth" 
    "Preston" "Ripon" "Salford" "Salisbury" "Sheffield" "Southampton" 
    "Southend-on-Sea" "St Albans" "Stoke on Trent" "Sunderland" "Truro" 
    "Wakefield" "Wells" "Westminster" "Winchester" "Wolverhampton" "Worcester" "York"
    # Northern Ireland
    "Armagh" "Bangor" "Belfast" "Lisburn" "Londonderry" "Newry"
    # Scotland
    "Aberdeen" "Dundee" "Dunfermline" "Edinburgh" "Glasgow" "Inverness" "Perth" "Stirling"
    # Wales
    "Cardiff" "Newport" "St Asaph" "St Davids" "Swansea" "Wrexham"
    # Crown Dependencies
    "Douglas"
    # Overseas Territories
    "Hamilton" "City of Gibraltar" "Stanley" "Jamestown"
)

# Function to sanitize city names for filenames
sanitize_filename() {
    local city_name="$1"
    # Convert to lowercase and replace spaces and special characters
    echo "$city_name" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]/-/g' | sed 's/--*/-/g' | sed 's/^-\|-$//g'
}

# Function to create HTML template for each city
create_city_page() {
    local city_name=$1
    local sanitized_city=$(sanitize_filename "$city_name")
    local filename="${sanitized_city}.html"

    cat > "$filename" << EOF
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Top 10 Eco-Friendly Businesses in ${city_name} | EcoSustainable.co.uk</title>
    <meta name="description" content="Discover ${city_name}'s leading sustainable and environmentally conscious businesses. From zero-waste cafes to renewable energy companies, find the best eco-friendly services in ${city_name}.">
    <meta name="keywords" content="${city_name} eco-friendly businesses, sustainable ${city_name}, green businesses ${city_name}, eco ${city_name}, sustainable directory ${city_name}">
    
    <!-- Open Graph Meta Tags -->
    <meta property="og:title" content="Top 10 Eco-Friendly Businesses in ${city_name}">
    <meta property="og:description" content="Discover ${city_name}'s leading sustainable and environmentally conscious businesses across all categories.">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://ecosustainable.co.uk/${sanitized_city}.html">
    
    <!-- Schema.org structured data -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Top 10 Eco-Friendly Businesses in ${city_name}",
        "description": "Directory of sustainable businesses in ${city_name}",
        "url": "https://ecosustainable.co.uk/${sanitized_city}.html",
        "mainEntity": {
            "@type": "ItemList",
            "name": "Eco-Friendly Businesses in ${city_name}",
            "description": "Curated list of sustainable businesses"
        }
    }
    </script>

    <link href="style.css" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <link rel="canonical" href="https://ecosustainable.co.uk/${sanitized_city}.html">
</head>
<body>
    <!-- Header Component -->
    <div id="header-component"></div>

    <!-- ${city_name} Hero Section -->
    <section class="city-hero">
        <div class="container">
            <div class="city-hero-content">
                <h1>Top 10 Eco-Friendly Businesses in <span class="highlight">${city_name}</span></h1>
                <p>Discover ${city_name}'s leading sustainable and environmentally conscious businesses across all categories. From zero-waste cafes to renewable energy companies, find the best eco-friendly services in ${city_name}.</p>
                
                <!-- Category Links Grid -->
                <div class="category-links-grid">
                    <a href="${sanitized_city}-health-beauty.html" class="category-link">
                        <div class="category-icon">💄</div>
                        <span>Health & Beauty</span>
                    </a>
                    <a href="${sanitized_city}-products-retail.html" class="category-link">
                        <div class="category-icon">🛍️</div>
                        <span>Products & Retail</span>
                    </a>
                    <a href="${sanitized_city}-transport-travel.html" class="category-link">
                        <div class="category-icon">🚗</div>
                        <span>Transport & Travel</span>
                    </a>
                    <a href="${sanitized_city}-services-professional.html" class="category-link">
                        <div class="category-icon">💼</div>
                        <span>Services & Professional</span>
                    </a>
                    <a href="${sanitized_city}-energy-utilities.html" class="category-link">
                        <div class="category-icon">⚡</div>
                        <span>Energy & Utilities</span>
                    </a>
                    <a href="${sanitized_city}-recycling-waste.html" class="category-link">
                        <div class="category-icon">♻️</div>
                        <span>Recycling & Waste</span>
                    </a>
                    <a href="${sanitized_city}-education-nonprofits.html" class="category-link">
                        <div class="category-icon">📚</div>
                        <span>Education & Nonprofits</span>
                    </a>
                </div>
            </div>
        </div>
    </section>

    <!-- Category Filter Section -->
    <section class="category-filter">
        <div class="container">
            <div class="category-filter-container">
                <div class="filter-group">
                    <label for="categoryFilter"><i class="fas fa-filter"></i> Filter by Category:</label>
                    <select id="categoryFilter" onchange="filterByCategory()">
                        <option value="">All Categories</option>
                        <option value="health-beauty">Health & Beauty</option>
                        <option value="products-retail">Products & Retail</option>
                        <option value="transport-travel">Transport & Travel</option>
                        <option value="services-professional">Services & Professional</option>
                        <option value="energy-utilities">Energy & Utilities</option>
                        <option value="recycling-waste">Recycling & Waste Management</option>
                        <option value="education-nonprofits">Education & Nonprofits</option>
                    </select>
                </div>
                
                <div class="filter-group">
                    <label for="sortFilter"><i class="fas fa-sort"></i> Sort by:</label>
                    <select id="sortFilter" onchange="sortBusinesses()">
                        <option value="rating">Highest Rated</option>
                        <option value="reviews">Most Reviews</option>
                        <option value="name">Name A-Z</option>
                    </select>
                </div>
                
                <button class="refresh-btn" onclick="refreshBusinesses()" title="Refresh business data">
                    <i class="fas fa-sync-alt"></i>
                    Refresh Data
                </button>
            </div>
        </div>
    </section>

    <!-- ${city_name} Businesses Section -->
    <section class="london-businesses">
        <div class="container">
            <div class="businesses-header">
                <h2 id="businessesTitle">Top Sustainable Businesses in ${city_name}</h2>
                <p class="businesses-count" id="businessesCount">Loading businesses...</p>
            </div>
            
            <div class="london-businesses-grid" id="londonBusinessesGrid">
                <!-- Businesses will be populated by JavaScript -->
            </div>
        </div>
    </section>

    <!-- Why Choose Section -->
    <section class="why-choose-section">
        <div class="container">
            <h2>Why Choose Sustainable Businesses in ${city_name}?</h2>
            <div class="why-choose-grid">
                <div class="why-item">
                    <div class="why-icon">🌱</div>
                    <h3>Environmental Impact</h3>
                    <p>Support businesses that actively contribute to environmental protection and sustainability in ${city_name}.</p>
                </div>
                <div class="why-item">
                    <div class="why-icon">⭐</div>
                    <h3>Quality Assurance</h3>
                    <p>All featured businesses are carefully vetted for quality, reliability, and genuine commitment to sustainability.</p>
                </div>
                <div class="why-item">
                    <div class="why-icon">🤝</div>
                    <h3>Community Support</h3>
                    <p>Support local ${city_name} businesses that contribute to the community and create sustainable jobs.</p>
                </div>
                <div class="why-item">
                    <div class="why-icon">💚</div>
                    <h3>Ethical Values</h3>
                    <p>Businesses committed to fair trade, ethical sourcing, and responsible practices.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Call to Action Section -->
    <section class="cta-section">
        <div class="container">
            <h2>Explore More Sustainable Cities</h2>
            <p>Discover eco-friendly businesses across the UK</p>
            <div class="cta-buttons">
                <a href="index.html" class="btn-primary">View All Cities</a>
                <a href="#contact" class="btn-secondary">Submit a Business</a>
            </div>
        </div>
    </section>

    <!-- Footer Component -->
    <div id="footer-component"></div>

    <script src="components.js"></script>
    <script src="places-api.js"></script>
    <script src="city-page.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            initializeCityPage('${city_name}');
        });
    </script>
</body>
</html>
EOF

    echo "Created: $filename"
}

# Generate city pages
total_cities=${#cities[@]}
echo "Generating $total_cities city pages..."

page_count=0
for city in "${cities[@]}"; do
    # Skip London as it already exists
    if [ "$city" != "London" ]; then
        create_city_page "$city"
        ((page_count++))
        
        # Show progress every 10 pages
        if ((page_count % 10 == 0)); then
            echo "Progress: $page_count pages generated..."
        fi
    fi
done

echo ""
echo "City page generation complete!"
echo "Generated $page_count HTML files for cities across the UK"
echo ""
echo "Files created follow the pattern: [city-name].html"
echo "Example files:"
echo "  - bath.html"
echo "  - birmingham.html"
echo "  - edinburgh.html"
echo "  - cardiff.html"
echo "  - belfast.html"

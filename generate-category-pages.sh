#!/bin/bash

# Generate Category Pages Script for all UK cities
echo "Generating category pages for all UK cities..."

# Define categories and their details
declare -A categories=(
    ["health-beauty"]="Health & Beauty"
    ["products-retail"]="Products & Retail"
    ["transport-travel"]="Transport & Travel"
    ["services-professional"]="Services & Professional"
    ["energy-utilities"]="Energy & Utilities"
    ["recycling-waste"]="Recycling & Waste Management"
    ["education-nonprofits"]="Education & Nonprofits"
)

# Complete list of UK cities and territories
cities=(
    # England
    "Bath" "Birmingham" "Bradford" "Brighton & Hove" "Bristol" "Cambridge"
    "Canterbury" "Carlisle" "Chelmsford" "Chester" "Chichester" "Colchester"
    "Coventry" "Derby" "Doncaster" "Durham" "Ely" "Exeter" "Gloucester"
    "Hereford" "Kingston-upon-Hull" "Lancaster" "Leeds" "Leicester" "Lichfield"
    "Lincoln" "Liverpool" "London" "Manchester" "Milton Keynes" "Newcastle-upon-Tyne"
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
create_category_page() {
    local city_name=$1
    local category_key=$2
    local category_name=$3
    local sanitized_city=$(sanitize_filename "$city_name")
    local filename="${sanitized_city}-${category_key}.html"

    cat > "$filename" << EOF
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Top 10 ${category_name} Businesses in ${city_name} | EcoSustainable.co.uk</title>
    <meta name="description" content="Discover the top 10 sustainable ${category_name,,} businesses in ${city_name}. Find eco-friendly, certified sustainable companies committed to environmental responsibility.">
    <meta name="keywords" content="${category_name,,} ${city_name}, sustainable ${category_name,,}, eco-friendly ${category_name,,}, green businesses ${city_name}, sustainable ${city_name}">

    <!-- Open Graph Meta Tags -->
    <meta property="og:title" content="Top 10 ${category_name} Businesses in ${city_name}">
    <meta property="og:description" content="Discover sustainable ${category_name,,} businesses in ${city_name} that prioritize environmental responsibility.">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://ecosustainable.co.uk/${sanitized_city}-${category_key}.html">

    <!-- Schema.org structured data -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Top 10 ${category_name} Businesses in ${city_name}",
        "description": "Directory of sustainable ${category_name,,} businesses in ${city_name}",
        "url": "https://ecosustainable.co.uk/${sanitized_city}-${category_key}.html",
        "mainEntity": {
            "@type": "ItemList",
            "name": "Top ${category_name} Businesses in ${city_name}",
            "description": "Curated list of eco-friendly ${category_name,,} businesses"
        }
    }
    </script>

    <link href="style.css" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <link rel="canonical" href="https://ecosustainable.co.uk/${sanitized_city}-${category_key}.html">
</head>
<body>
    <!-- Header Component -->
    <div id="header-component"></div>

    <!-- Category Hero Section -->
    <section class="category-hero">
        <div class="container">
            <nav class="breadcrumb">
                <a href="index.html">Home</a> > 
                <a href="${sanitized_city}.html">${city_name}</a> > 
                <span>${category_name}</span>
            </nav>

            <h1>Top 10 ${category_name} Businesses in ${city_name}</h1>
            <p class="category-description">
                Discover ${city_name}'s leading sustainable ${category_name,,} businesses. Our carefully curated selection features companies committed to environmental responsibility, ethical practices, and exceptional service quality.
            </p>

            <div class="category-stats">
                <div class="stat">
                    <span class="stat-number">10+</span>
                    <span class="stat-label">Featured Businesses</span>
                </div>
                <div class="stat">
                    <span class="stat-number">95%</span>
                    <span class="stat-label">Customer Satisfaction</span>
                </div>
                <div class="stat">
                    <span class="stat-number">100%</span>
                    <span class="stat-label">Sustainability Verified</span>
                </div>
            </div>
        </div>
    </section>

    <!-- Category Businesses Section -->
    <section class="category-businesses">
        <div class="container">
            <h2 id="businessesTitle">Top ${category_name} Businesses in ${city_name}</h2>
            <p class="section-description">
                Each business listed here has been thoroughly vetted for their commitment to sustainability, quality of service, and positive environmental impact.
            </p>

            <div class="businesses-grid" id="categoryBusinessesGrid">
                <!-- Businesses will be populated by JavaScript -->
            </div>
        </div>
    </section>

    <!-- SEO Content Sections -->
    <div id="seoSections">
        <!-- Dynamic SEO content will be inserted here by JavaScript -->
    </div>

    <!-- Call to Action Section -->
    <section class="cta-section">
        <div class="container">
            <h2>Find More Sustainable Businesses in ${city_name}</h2>
            <p>Explore other categories of eco-friendly businesses across ${city_name}</p>
            <div class="cta-buttons">
                <a href="${sanitized_city}.html" class="btn-primary">View All ${city_name} Businesses</a>
                <a href="index.html" class="btn-secondary">Explore Other Cities</a>
            </div>
        </div>
    </section>

    <!-- Footer Component -->
    <div id="footer-component"></div>

    <script src="components.js"></script>
    <script src="places-api.js"></script>
    <script src="category-page.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            initializeCategoryPage('${category_key}', '${city_name}');
        });
    </script>
</body>
</html>
EOF

    echo "Created: $filename"
}

# Generate pages for each category in all cities
total_cities=${#cities[@]}
total_categories=${#categories[@]}
total_pages=$((total_cities * total_categories))

echo "Generating $total_pages pages for $total_cities cities and $total_categories categories..."

page_count=0
for city in "${cities[@]}"; do
    echo "Processing city: $city"
    for category_key in "${!categories[@]}"; do
        category_name="${categories[$category_key]}"
        create_category_page "$city" "$category_key" "$category_name"
        ((page_count++))

        # Show progress every 50 pages
        if ((page_count % 50 == 0)); then
            echo "Progress: $page_count/$total_pages pages generated..."
        fi
    done
done

echo ""
echo "Category page generation complete!"
echo "Generated $page_count HTML files for:"
echo "- ${#cities[@]} cities across England, Scotland, Wales, Northern Ireland, Crown Dependencies, and Overseas Territories"
echo "- ${#categories[@]} business categories each"
echo ""
echo "Files created follow the pattern: [city-name]-[category].html"
echo "Example files:"
for category_key in "${!categories[@]}"; do
    sanitized_london=$(sanitize_filename "London")
    echo "  - ${sanitized_london}-${category_key}.html"
    break
done
echo "  - $(sanitize_filename "Edinburgh")-health-beauty.html"
echo "  - $(sanitize_filename "Cardiff")-transport-travel.html"
echo "  - $(sanitize_filename "Belfast")-services-professional.html"
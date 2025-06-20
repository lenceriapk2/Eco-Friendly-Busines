
#!/bin/bash

# Generate Category Pages Script
# This script creates HTML pages for different business categories

echo "Generating category pages..."

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

# Create HTML template function
create_category_page() {
    local category_key=$1
    local category_name=$2
    local filename="london-${category_key}.html"
    
    cat > "$filename" << EOF
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Top 10 ${category_name} Businesses in London | EcoSustainable.co.uk</title>
    <meta name="description" content="Discover the top 10 sustainable ${category_name,,} businesses in London. Find eco-friendly, certified sustainable companies committed to environmental responsibility.">
    <meta name="keywords" content="${category_name,,} London, sustainable ${category_name,,}, eco-friendly ${category_name,,}, green businesses London, sustainable London">
    
    <!-- Open Graph Meta Tags -->
    <meta property="og:title" content="Top 10 ${category_name} Businesses in London">
    <meta property="og:description" content="Discover sustainable ${category_name,,} businesses in London that prioritize environmental responsibility.">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://ecosustainable.co.uk/london-${category_key}.html">
    
    <!-- Schema.org structured data -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Top 10 ${category_name} Businesses in London",
        "description": "Directory of sustainable ${category_name,,} businesses in London",
        "url": "https://ecosustainable.co.uk/london-${category_key}.html",
        "mainEntity": {
            "@type": "ItemList",
            "name": "Top ${category_name} Businesses in London",
            "description": "Curated list of eco-friendly ${category_name,,} businesses"
        }
    }
    </script>
    
    <link href="style.css" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <link rel="canonical" href="https://ecosustainable.co.uk/london-${category_key}.html">
</head>
<body>
    <!-- Header Component -->
    <div id="header-component"></div>

    <!-- Category Hero Section -->
    <section class="category-hero">
        <div class="container">
            <nav class="breadcrumb">
                <a href="index.html">Home</a> > 
                <a href="london.html">London</a> > 
                <span>${category_name}</span>
            </nav>
            
            <h1>Top 10 ${category_name} Businesses in London</h1>
            <p class="category-description">
                Discover London's leading sustainable ${category_name,,} businesses. Our carefully curated selection features companies committed to environmental responsibility, ethical practices, and exceptional service quality.
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
            <h2 id="businessesTitle">Top ${category_name} Businesses in London</h2>
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
            <h2>Find More Sustainable Businesses in London</h2>
            <p>Explore other categories of eco-friendly businesses across London</p>
            <div class="cta-buttons">
                <a href="london.html" class="btn-primary">View All London Businesses</a>
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
            initializeCategoryPage('${category_key}');
        });
    </script>
</body>
</html>
EOF

    echo "Created: $filename"
}

# Generate pages for each category
for category_key in "${!categories[@]}"; do
    category_name="${categories[$category_key]}"
    create_category_page "$category_key" "$category_name"
done

echo "Category page generation complete!"
echo "Generated pages:"
for category_key in "${!categories[@]}"; do
    echo "  - london-${category_key}.html"
done

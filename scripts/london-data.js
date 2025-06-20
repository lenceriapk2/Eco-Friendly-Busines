
// London Eco-Friendly Businesses Data
// This will be populated by the Google Places API

let londonBusinesses = [
    // Fallback data in case API fails
    {
        id: 1,
        name: "EcoHome London",
        category: "home-living",
        subcategory: "Sustainable Furniture",
        rating: 4.9,
        reviewCount: 127,
        description: "Premium sustainable furniture made from reclaimed wood and eco-friendly materials. Specializing in modern, minimalist designs for conscious homeowners.",
        address: "45 Shoreditch High Street, London E1 6PN",
        phone: "+44 20 7946 0958",
        website: "www.ecohome-london.co.uk",
        image: "🪴",
        features: ["FSC Certified Wood", "Zero VOC Finishes", "Local Craftsmanship", "Lifetime Warranty"]
    },
    {
        id: 2,
        name: "Green Threads Boutique",
        category: "fashion-accessories",
        subcategory: "Sustainable Clothing Brands",
        rating: 4.8,
        reviewCount: 89,
        description: "Ethical fashion boutique featuring organic cotton, hemp, and recycled materials. Supporting fair trade and sustainable fashion practices.",
        address: "23 Camden Market, London NW1 8AF",
        phone: "+44 20 7482 3156",
        website: "www.greenthreads.london",
        image: "👕",
        features: ["Organic Materials", "Fair Trade", "Carbon Neutral", "Plastic-Free Packaging"]
    },
    {
        id: 3,
        name: "Plant Power Kitchen",
        category: "food-beverage",
        subcategory: "Plant-Based & Vegan Restaurants",
        rating: 4.7,
        reviewCount: 203,
        description: "Award-winning plant-based restaurant using locally sourced, organic ingredients. Zero-waste kitchen with compostable packaging.",
        address: "78 Brick Lane, London E1 6RL",
        phone: "+44 20 7377 9842",
        website: "www.plantpower.london",
        image: "🌱",
        features: ["100% Plant-Based", "Local Sourcing", "Zero Waste", "Compostable Packaging"]
    },
    {
        id: 4,
        name: "Natural Glow Spa",
        category: "health-beauty",
        subcategory: "Organic Skincare Brands",
        rating: 4.9,
        reviewCount: 156,
        description: "Luxury spa offering organic, cruelty-free treatments using natural and sustainable beauty products. Refillable product lines available.",
        address: "12 Marylebone High Street, London W1U 4RQ",
        phone: "+44 20 7935 7248",
        website: "www.naturalglow.london",
        image: "💄",
        features: ["Organic Products", "Cruelty-Free", "Refillable Options", "Natural Ingredients"]
    },
    {
        id: 5,
        name: "EcoPack Solutions",
        category: "products-retail",
        subcategory: "Eco-Friendly Packaging Suppliers",
        rating: 4.6,
        reviewCount: 94,
        description: "Leading supplier of biodegradable and compostable packaging solutions for businesses. Plastic-free alternatives for all industries.",
        address: "156 Old Street, London EC1V 9BX",
        phone: "+44 20 7253 6789",
        website: "www.ecopack.london",
        image: "📦",
        features: ["Biodegradable", "Compostable", "Bulk Orders", "Custom Solutions"]
    },
    {
        id: 6,
        name: "London E-Bike Hub",
        category: "transport-travel",
        subcategory: "Electric Vehicle (EV) Services",
        rating: 4.8,
        reviewCount: 178,
        description: "Premier electric bike sales, rentals, and servicing. Promoting sustainable transport across London with premium e-bike solutions.",
        address: "89 Regent Street, London W1B 4EH",
        phone: "+44 20 7734 5621",
        website: "www.ebikehub.london",
        image: "🚲",
        features: ["Sales & Rentals", "Expert Servicing", "Test Rides", "Eco Transport"]
    },
    {
        id: 7,
        name: "Green Design Studio",
        category: "services-professional",
        subcategory: "Eco Interior Designers",
        rating: 4.9,
        reviewCount: 67,
        description: "Award-winning interior design studio specializing in sustainable, eco-friendly design solutions using reclaimed and natural materials.",
        address: "34 Notting Hill Gate, London W11 3HX",
        phone: "+44 20 7727 8943",
        website: "www.greendesign.london",
        image: "🏗️",
        features: ["Sustainable Design", "Reclaimed Materials", "Energy Efficient", "Biophilic Design"]
    },
    {
        id: 8,
        name: "Solar Solutions London",
        category: "energy-utilities",
        subcategory: "Solar Panel Installers",
        rating: 4.9,
        reviewCount: 234,
        description: "Leading solar panel installation company serving London. Residential and commercial solar solutions with battery storage options.",
        address: "67 Canary Wharf, London E14 5AB",
        phone: "+44 20 7418 9876",
        website: "www.solarlondon.co.uk",
        image: "⚡",
        features: ["Residential & Commercial", "Battery Storage", "25-Year Warranty", "Smart Monitoring"]
    },
    {
        id: 9,
        name: "Circular Economy London",
        category: "recycling-waste",
        subcategory: "Circular Economy Platforms",
        rating: 4.7,
        reviewCount: 143,
        description: "Platform connecting businesses and consumers for waste reduction, reuse, and recycling. Building London's circular economy ecosystem.",
        address: "25 Hackney Road, London E2 7NX",
        phone: "+44 20 7613 4567",
        website: "www.circular.london",
        image: "♻️",
        features: ["Waste Reduction", "Business Network", "Resource Sharing", "Impact Tracking"]
    },
    {
        id: 10,
        name: "EcoLearn Academy",
        category: "education-nonprofits",
        subcategory: "Climate Education Initiatives",
        rating: 4.8,
        reviewCount: 198,
        description: "Leading environmental education center offering workshops, courses, and consulting on sustainability practices for individuals and businesses.",
        address: "41 King's Road, London SW3 4ND",
        phone: "+44 20 7352 8765",
        website: "www.ecolearn.london",
        image: "🌍",
        features: ["Expert Training", "Corporate Workshops", "Certification Programs", "Sustainability Consulting"]
    }
];

// Load businesses from Google Places API
async function loadBusinessesFromAPI() {
    try {
        console.log('Loading businesses from Google Places API...');
        const apiBusinesses = await window.PlacesAPI.fetchAllLondonBusinesses();
        
        if (apiBusinesses && apiBusinesses.length > 0) {
            londonBusinesses = apiBusinesses;
            console.log(`Loaded ${apiBusinesses.length} businesses from API`);
            
            // Refresh the display if we're on the London page
            if (typeof displayBusinesses === 'function') {
                displayBusinesses(londonBusinesses);
                updateTitle(londonBusinesses.length);
            }
        }
    } catch (error) {
        console.error('Error loading businesses from API:', error);
        console.log('Using fallback data');
    }
}

// Export data and functions
window.LondonData = {
    londonBusinesses,
    loadBusinessesFromAPI
};

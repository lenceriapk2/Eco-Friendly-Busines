
// Cities Page JavaScript Handler

const citiesByRegion = {
    england: [
        { name: 'Bath', slug: 'bath' },
        { name: 'Birmingham', slug: 'birmingham' },
        { name: 'Bradford', slug: 'bradford' },
        { name: 'Brighton & Hove', slug: 'brighton-hove' },
        { name: 'Bristol', slug: 'bristol' },
        { name: 'Cambridge', slug: 'cambridge' },
        { name: 'Canterbury', slug: 'canterbury' },
        { name: 'Carlisle', slug: 'carlisle' },
        { name: 'Chelmsford', slug: 'chelmsford' },
        { name: 'Chester', slug: 'chester' },
        { name: 'Chichester', slug: 'chichester' },
        { name: 'Colchester', slug: 'colchester' },
        { name: 'Coventry', slug: 'coventry' },
        { name: 'Derby', slug: 'derby' },
        { name: 'Doncaster', slug: 'doncaster' },
        { name: 'Durham', slug: 'durham' },
        { name: 'Ely', slug: 'ely' },
        { name: 'Exeter', slug: 'exeter' },
        { name: 'Gloucester', slug: 'gloucester' },
        { name: 'Hereford', slug: 'hereford' },
        { name: 'Kingston-upon-Hull', slug: 'kingston-upon-hull' },
        { name: 'Lancaster', slug: 'lancaster' },
        { name: 'Leeds', slug: 'leeds' },
        { name: 'Leicester', slug: 'leicester' },
        { name: 'Lichfield', slug: 'lichfield' },
        { name: 'Lincoln', slug: 'lincoln' },
        { name: 'Liverpool', slug: 'liverpool' },
        { name: 'London', slug: 'london' },
        { name: 'Manchester', slug: 'manchester' },
        { name: 'Milton Keynes', slug: 'milton-keynes' },
        { name: 'Newcastle-upon-Tyne', slug: 'newcastle-upon-tyne' },
        { name: 'Norwich', slug: 'norwich' },
        { name: 'Nottingham', slug: 'nottingham' },
        { name: 'Oxford', slug: 'oxford' },
        { name: 'Peterborough', slug: 'peterborough' },
        { name: 'Plymouth', slug: 'plymouth' },
        { name: 'Portsmouth', slug: 'portsmouth' },
        { name: 'Preston', slug: 'preston' },
        { name: 'Ripon', slug: 'ripon' },
        { name: 'Salford', slug: 'salford' },
        { name: 'Salisbury', slug: 'salisbury' },
        { name: 'Sheffield', slug: 'sheffield' },
        { name: 'Southampton', slug: 'southampton' },
        { name: 'Southend-on-Sea', slug: 'southend-on-sea' },
        { name: 'St Albans', slug: 'st-albans' },
        { name: 'Stoke on Trent', slug: 'stoke-on-trent' },
        { name: 'Sunderland', slug: 'sunderland' },
        { name: 'Truro', slug: 'truro' },
        { name: 'Wakefield', slug: 'wakefield' },
        { name: 'Wells', slug: 'wells' },
        { name: 'Westminster', slug: 'westminster' },
        { name: 'Winchester', slug: 'winchester' },
        { name: 'Wolverhampton', slug: 'wolverhampton' },
        { name: 'Worcester', slug: 'worcester' },
        { name: 'York', slug: 'york' }
    ],
    scotland: [
        { name: 'Aberdeen', slug: 'aberdeen' },
        { name: 'Dundee', slug: 'dundee' },
        { name: 'Dunfermline', slug: 'dunfermline' },
        { name: 'Edinburgh', slug: 'edinburgh' },
        { name: 'Glasgow', slug: 'glasgow' },
        { name: 'Inverness', slug: 'inverness' },
        { name: 'Perth', slug: 'perth' },
        { name: 'Stirling', slug: 'stirling' }
    ],
    wales: [
        { name: 'Cardiff', slug: 'cardiff' },
        { name: 'Newport', slug: 'newport' },
        { name: 'St Asaph', slug: 'st-asaph' },
        { name: 'St Davids', slug: 'st-davids' },
        { name: 'Swansea', slug: 'swansea' },
        { name: 'Wrexham', slug: 'wrexham' }
    ],
    northernIreland: [
        { name: 'Armagh', slug: 'armagh' },
        { name: 'Bangor', slug: 'bangor' },
        { name: 'Belfast', slug: 'belfast' },
        { name: 'Lisburn', slug: 'lisburn' },
        { name: 'Londonderry', slug: 'londonderry' },
        { name: 'Newry', slug: 'newry' }
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    populateCitiesByRegion();
});

function populateCitiesByRegion() {
    Object.keys(citiesByRegion).forEach(region => {
        const gridElement = document.getElementById(`${region}Cities`);
        if (gridElement) {
            gridElement.innerHTML = '';
            
            citiesByRegion[region].forEach(city => {
                const cityCard = document.createElement('div');
                cityCard.className = 'city-card';
                cityCard.onclick = () => window.location.href = `${city.slug}.html`;
                
                cityCard.innerHTML = `
                    <h3>${city.name}</h3>
                    <p>Eco-friendly businesses</p>
                    <div class="city-arrow">→</div>
                `;
                
                gridElement.appendChild(cityCard);
            });
        }
    });
}

function searchCities() {
    const searchTerm = document.getElementById('citySearch').value.toLowerCase();
    if (!searchTerm) return;
    
    // Find matching city
    for (const region of Object.values(citiesByRegion)) {
        const city = region.find(c => c.name.toLowerCase().includes(searchTerm));
        if (city) {
            window.location.href = `${city.slug}.html`;
            return;
        }
    }
    
    alert('City not found. Please try a different search term.');
}

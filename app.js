// World polygons cache (populated from world-atlas TopoJSON after globe init)
let WORLD_POLYGONS = null;

// Fallback: simplified world coastlines (lng, lat)
const WORLD_COASTLINES_FALLBACK = [
    [[-130,55],[-125,50],[-124,48],[-124,44],[-120,38],[-117,33],[-115,30],[-110,26],[-105,22],[-100,19],[-97,16],[-92,15],[-88,16],[-84,15],[-82,10],[-78,8],[-77,9],[-75,11],[-73,11],[-70,12],[-68,12],[-65,14],[-62,11],[-60,10],[-58,8],[-56,7],[-55,5],[-52,4],[-50,2],[-48,0],[-46,-2]],
    [[-80,10],[-78,8],[-75,6],[-72,4],[-70,3],[-68,2],[-65,0],[-62,-2],[-60,-5],[-55,-8],[-50,-10],[-45,-15],[-40,-20],[-35,-25],[-30,-30],[-25,-35],[-20,-40],[-15,-45],[-10,-50],[-5,-55],[0,-55],[5,-50],[10,-45],[15,-40],[20,-35],[25,-30],[30,-25],[35,-20],[40,-15],[45,-10],[50,-5],[55,0],[60,5],[65,10],[70,15],[75,20],[80,25],[85,30],[90,35],[95,40],[100,45],[105,50],[110,55],[115,60],[120,65],[125,70],[130,75],[135,80],[140,85],[145,90],[150,95],[155,100],[160,105],[165,110],[170,115],[175,120],[180,125]],
    [[-10,36],[-8,38],[-6,40],[-4,42],[-2,44],[0,46],[2,48],[4,50],[6,52],[8,54],[10,56],[12,58],[14,60],[16,62],[18,64],[20,66],[22,68],[24,70],[26,72],[28,74]],
    [[-18,15],[-16,12],[-14,10],[-12,8],[-10,6],[-8,4],[-6,2],[-4,0],[-2,-2],[0,-4],[2,-6],[4,-8],[6,-10],[8,-12],[10,-14],[12,-16],[14,-18],[16,-20],[18,-22],[20,-24],[22,-26],[24,-28],[26,-30],[28,-32],[30,-34]],
    [[28,42],[30,40],[32,38],[34,36],[36,34],[38,32],[40,30],[42,28],[44,26],[46,24],[48,22],[50,20],[52,18],[54,16],[56,14],[58,12],[60,10],[62,8],[64,6],[66,4],[68,2],[70,0],[72,-2],[74,-4]],
    [[115,-35],[120,-34],[125,-33],[130,-32],[135,-31],[140,-30],[145,-29],[150,-28],[153,-27],[153,-29],[151,-33],[149,-37],[147,-39],[145,-38],[140,-37],[135,-35],[130,-33],[125,-32],[120,-33],[115,-34]],
];

// Airport and airline data - Comprehensive global coverage
const AIRPORT_DATA = {
    // India
    'ATQ': { lat: 31.7160, lng: 74.8141, city: 'Amritsar', country: 'India', countryCode: 'IN' },
    'DEL': { lat: 28.5665, lng: 77.1031, city: 'New Delhi', country: 'India', countryCode: 'IN' },
    'BOM': { lat: 19.0880, lng: 72.8686, city: 'Mumbai', country: 'India', countryCode: 'IN' },
    'BLR': { lat: 13.1939, lng: 77.7064, city: 'Bangalore', country: 'India', countryCode: 'IN' },
    'HYD': { lat: 17.3850, lng: 78.4867, city: 'Hyderabad', country: 'India', countryCode: 'IN' },
    'COK': { lat: 10.1924, lng: 76.2696, city: 'Kochi', country: 'India', countryCode: 'IN' },
    'MAA': { lat: 12.9940, lng: 80.1689, city: 'Chennai', country: 'India', countryCode: 'IN' },
    'PNQ': { lat: 18.5921, lng: 73.9197, city: 'Pune', country: 'India', countryCode: 'IN' },
    'CCU': { lat: 22.6541, lng: 88.4480, city: 'Kolkata', country: 'India', countryCode: 'IN' },
    'VGA': { lat: 25.3245, lng: 82.9789, city: 'Varanasi', country: 'India', countryCode: 'IN' },
    'GOI': { lat: 15.3800, lng: 73.8347, city: 'Goa', country: 'India', countryCode: 'IN' },
    'JAI': { lat: 25.8202, lng: 75.8024, city: 'Jaipur', country: 'India', countryCode: 'IN' },
    'IXC': { lat: 30.6735, lng: 76.7903, city: 'Chandigarh', country: 'India', countryCode: 'IN' },
    'IXL': { lat: 34.1526, lng: 77.5771, city: 'Leh', country: 'India', countryCode: 'IN' },
    'IXR': { lat: 23.3171, lng: 85.3200, city: 'Ranchi', country: 'India', countryCode: 'IN' },
    'IXZ': { lat: 24.8267, lng: 92.9758, city: 'Silchar', country: 'India', countryCode: 'IN' },
    'SXR': { lat: 33.9871, lng: 74.7742, city: 'Srinagar', country: 'India', countryCode: 'IN' },
    'VTZ': { lat: 17.6869, lng: 83.2185, city: 'Visakhapatnam', country: 'India', countryCode: 'IN' },
    'USM': { lat: 26.8124, lng: 75.8028, city: 'Udaipur', country: 'India', countryCode: 'IN' },
    'GOX': { lat: 15.2708, lng: 73.8297, city: 'South Goa', country: 'India', countryCode: 'IN' },

    // Southeast Asia
    'DPS': { lat: -8.7533, lng: 115.1667, city: 'Bali', country: 'Indonesia', countryCode: 'ID' },
    'SIN': { lat: 1.3521, lng: 103.8198, city: 'Singapore', country: 'Singapore', countryCode: 'SG' },
    'KUL': { lat: 2.7258, lng: 101.7103, city: 'Kuala Lumpur', country: 'Malaysia', countryCode: 'MY' },
    'BKK': { lat: 13.9101, lng: 100.8674, city: 'Bangkok', country: 'Thailand', countryCode: 'TH' },
    'HKT': { lat: 8.1136, lng: 98.3092, city: 'Phuket', country: 'Thailand', countryCode: 'TH' },

    // East Asia
    'PEK': { lat: 40.0801, lng: 116.5846, city: 'Beijing', country: 'China', countryCode: 'CN' },
    'SHA': { lat: 31.1408, lng: 121.8050, city: 'Shanghai', country: 'China', countryCode: 'CN' },

    // Middle East
    'DXB': { lat: 25.2528, lng: 55.3644, city: 'Dubai', country: 'UAE', countryCode: 'AE' },
    'AUH': { lat: 24.4539, lng: 54.3773, city: 'Abu Dhabi', country: 'UAE', countryCode: 'AE' },
    'DOH': { lat: 25.2731, lng: 51.6139, city: 'Doha', country: 'Qatar', countryCode: 'QA' },

    // USA
    'LAX': { lat: 33.9425, lng: -118.4081, city: 'Los Angeles', country: 'USA', countryCode: 'US' },
    'SFO': { lat: 37.6213, lng: -122.3790, city: 'San Francisco', country: 'USA', countryCode: 'US' },
    'JFK': { lat: 40.6413, lng: -73.7781, city: 'New York', country: 'USA', countryCode: 'US' },
    'ORD': { lat: 41.9742, lng: -87.9073, city: 'Chicago', country: 'USA', countryCode: 'US' },
    'DFW': { lat: 32.8975, lng: -97.0382, city: 'Dallas', country: 'USA', countryCode: 'US' },
    'DEN': { lat: 39.8561, lng: -104.6737, city: 'Denver', country: 'USA', countryCode: 'US' },
    'AUS': { lat: 30.2872, lng: -97.7431, city: 'Austin', country: 'USA', countryCode: 'US' },
    'MCI': { lat: 39.2976, lng: -94.7139, city: 'Kansas City', country: 'USA', countryCode: 'US' },
    'IAH': { lat: 29.9902, lng: -95.3368, city: 'Houston', country: 'USA', countryCode: 'US' },
    'HOU': { lat: 29.6454, lng: -95.2788, city: 'Houston Hobby', country: 'USA', countryCode: 'US' },
    'MIA': { lat: 25.7959, lng: -80.2870, city: 'Miami', country: 'USA', countryCode: 'US' },
    'TPA': { lat: 27.9747, lng: -82.5331, city: 'Tampa', country: 'USA', countryCode: 'US' },
    'MSY': { lat: 29.9844, lng: -90.2580, city: 'New Orleans', country: 'USA', countryCode: 'US' },

    // Europe
    'LHR': { lat: 51.4700, lng: -0.4543, city: 'London', country: 'UK', countryCode: 'GB' },
    'STN': { lat: 51.8860, lng: 0.2353, city: 'London Stansted', country: 'UK', countryCode: 'GB' },
    'CDG': { lat: 49.0127, lng: 2.5495, city: 'Paris', country: 'France', countryCode: 'FR' },
    'FRA': { lat: 50.0379, lng: 8.5622, city: 'Frankfurt', country: 'Germany', countryCode: 'DE' },
    'AMS': { lat: 52.3086, lng: 4.7639, city: 'Amsterdam', country: 'Netherlands', countryCode: 'NL' },
    'MAD': { lat: 40.4730, lng: -3.6282, city: 'Madrid', country: 'Spain', countryCode: 'ES' },
    'IBZ': { lat: 38.8728, lng: 1.3092, city: 'Ibiza', country: 'Spain', countryCode: 'ES' },

    };

const AIRLINE_DATA = {
    'AAL': { name: 'American Airlines', country: 'USA' },
    'AIC': { name: 'Air India', country: 'India' },
    'AKJ': { name: 'AirAsia', country: 'Malaysia' },
    'AXB': { name: 'Air Arabia', country: 'UAE' },
    'BAW': { name: 'British Airways', country: 'UK' },
    'BKP': { name: 'Bangkok Airways', country: 'Thailand' },
    'ETD': { name: 'Etihad Airways', country: 'UAE' },
    'FFT': { name: 'Frontier Airlines', country: 'USA' },
    'GOW': { name: 'GoAir', country: 'India' },
    'IAD': { name: 'Iran Air', country: 'Iran' },
    'IGO': { name: 'IndiGo', country: 'India' },
    'JAI': { name: 'Jet Airways', country: 'India' },
    'KLM': { name: 'KLM Royal Dutch Airlines', country: 'Netherlands' },
    'QTR': { name: 'Qatar Airways', country: 'Qatar' },
    'RYR': { name: 'Ryanair', country: 'Ireland' },
    'SEJ': { name: 'SpiceJet', country: 'India' },
    'SWA': { name: 'Southwest Airlines', country: 'USA' },
    'TGW': { name: 'Tigerair', country: 'Singapore' },
    'UAE': { name: 'Emirates', country: 'UAE' },
    'VTI': { name: 'Vistara', country: 'India' },
};

// Application state
let appState = {
    allFlights: [],
    filteredFlights: [],
    selectedYear: 'all',
    globe: null,
    selectedFlight: null,
    replayActive: false,
    agentCollapsed: false,
};

// Utility functions
function haversineDistance(lat1, lng1, lat2, lng2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(R * c);
}

function getRouteDistanceKm(route) {
    if (!route || route === '-') return '-';
    const [from, to] = route.split('-');
    const fromAirport = AIRPORT_DATA[from];
    const toAirport = AIRPORT_DATA[to];
    if (!fromAirport || !toAirport) return '-';
    return `${haversineDistance(fromAirport.lat, fromAirport.lng, toAirport.lat, toAirport.lng)} km`;
}

function getCountryFlag(countryCode) {
    if (!countryCode) return '🌍';
    const codePoints = countryCode
        .toUpperCase()
        .split('')
        .map(char => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
}

function getAirlineName(code) {
    return AIRLINE_DATA[code] || { name: code, country: 'Unknown' };
}

// CSV Parsing - Handle Flighty format
function parseCSV(csvContent) {
    const lines = csvContent.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.trim());
    const flights = [];

    for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        if (!line.trim()) continue;

        const values = [];
        let current = '';
        let inQuotes = false;

        for (let j = 0; j < line.length; j++) {
            const char = line[j];
            if (char === '"') {
                inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
                values.push(current.trim());
                current = '';
            } else {
                current += char;
            }
        }
        values.push(current.trim());

        const flight = {};
        headers.forEach((header, index) => {
            flight[header] = values[index] || '';
        });

        if (flight.Date && flight.Flight) {
            flights.push(flight);
        }
    }

    return flights;
}

function normalizeFlights(flights) {
    return flights.map(f => {
        const date = new Date(f['Date']);
        const year = date.getFullYear();
        const month = date.toLocaleString('default', { month: 'long' });

        const from = f['From'] || '';
        const to = f['To'] || '';

        let distance = 0;
        if (from && to && AIRPORT_DATA[from] && AIRPORT_DATA[to]) {
            const fromAirport = AIRPORT_DATA[from];
            const toAirport = AIRPORT_DATA[to];
            distance = haversineDistance(
                fromAirport.lat, fromAirport.lng,
                toAirport.lat, toAirport.lng
            );
        }

        let durationMinutes = 0;
        const actualDep = f['Take off (Actual)'] || f['Gate Departure (Actual)'];
        const actualArr = f['Landing (Actual)'] || f['Gate Arrival (Actual)'];

        if (actualDep && actualArr) {
            const depTime = new Date(actualDep);
            const arrTime = new Date(actualArr);
            durationMinutes = Math.round((arrTime - depTime) / 60000);
        }

        const hours = Math.floor(durationMinutes / 60);
        const minutes = durationMinutes % 60;
        const duration = durationMinutes > 0 ? `${hours}h ${minutes}m` : '';

        return {
            ...f,
            date,
            year,
            month,
            from,
            to,
            distance,
            duration,
            durationMinutes,
            airline: f['Airline'] || '',
            flight: f['Flight'] || '',
            aircraft: f['Aircraft Type Name'] || f['Aircraft Type'] || '',
            cabin: f['Cabin Class'] || '',
            status: f['Canceled'] === 'true' ? 'Canceled' : 'Completed',
        };
    });
}

function filterFlightsByYear(flights, year) {
    if (year === 'all') return flights;
    return flights.filter(f => f.year === parseInt(year));
}

// KPI Calculations
function calculateKPIs(flights) {
    const totalFlights = flights.length;
    const totalDistance = flights.reduce((sum, f) => sum + (f.distance || 0), 0);
    const timeInAir = flights.reduce((sum, f) => sum + f.durationMinutes, 0);
    const hours = Math.floor(timeInAir / 60);
    const minutes = timeInAir % 60;

    const airports = new Set();
    const countries = new Set();
    const airlines = new Set();
    const aircraftTypes = new Set();

    flights.forEach(f => {
        if (f.from && AIRPORT_DATA[f.from]) {
            airports.add(f.from);
            countries.add(AIRPORT_DATA[f.from].countryCode);
        }
        if (f.to && AIRPORT_DATA[f.to]) {
            airports.add(f.to);
            countries.add(AIRPORT_DATA[f.to].countryCode);
        }
        if (f.airline) airlines.add(f.airline);
        if (f.aircraft) aircraftTypes.add(f.aircraft);
    });

    return {
        totalFlights,
        totalDistance,
        timeInAir: `${hours}h ${minutes}m`,
        airportsVisited: airports.size,
        countries: countries.size,
        airlines: airlines.size,
        aircraftTypes: aircraftTypes.size,
    };
}

// Aviation Story
function calculateAviationStory(flights) {
    const airportCounts = {};
    const routeCounts = {};
    const airlineCounts = {};
    let longestFlight = null;
    let maxDistance = 0;
    const monthCounts = {};

    flights.forEach(f => {
        if (f.from) airportCounts[f.from] = (airportCounts[f.from] || 0) + 1;
        if (f.to) airportCounts[f.to] = (airportCounts[f.to] || 0) + 1;

        const route = `${f.from}-${f.to}`;
        routeCounts[route] = (routeCounts[route] || 0) + 1;

        if (f.airline) airlineCounts[f.airline] = (airlineCounts[f.airline] || 0) + 1;

        if (f.distance > maxDistance) {
            maxDistance = f.distance;
            longestFlight = f;
        }

        const monthKey = `${f.year}-${f.month}`;
        monthCounts[monthKey] = (monthCounts[monthKey] || 0) + 1;
    });

    const mostVisitedAirport = Object.keys(airportCounts).length > 0 ?
        Object.keys(airportCounts).reduce((a, b) => airportCounts[a] > airportCounts[b] ? a : b) : '-';

    const mostFlownRoute = Object.keys(routeCounts).length > 0 ?
        Object.keys(routeCounts).reduce((a, b) => routeCounts[a] > routeCounts[b] ? a : b) : '-';

    const mostFlownAirline = Object.keys(airlineCounts).length > 0 ?
        Object.keys(airlineCounts).reduce((a, b) => airlineCounts[a] > airlineCounts[b] ? a : b) : '-';

    const busiestMonth = Object.keys(monthCounts).length > 0 ?
        Object.keys(monthCounts).reduce((a, b) => monthCounts[a] > monthCounts[b] ? a : b) : '-';

    const internationalFlights = flights.filter(f => {
        const fromCountry = AIRPORT_DATA[f.from]?.countryCode;
        const toCountry = AIRPORT_DATA[f.to]?.countryCode;
        return fromCountry && toCountry && fromCountry !== toCountry;
    }).length;

    const domesticFlights = flights.length - internationalFlights;

    return {
        mostVisitedAirport,
        mostVisitedAirportCount: airportCounts[mostVisitedAirport] || 0,
        mostFlownAirline,
        mostFlownAirlineCount: airlineCounts[mostFlownAirline] || 0,
        mostFlownRoute,
        mostFlownRouteCount: routeCounts[mostFlownRoute] || 0,
        longestFlight,
        busiestMonth,
        busiestMonthCount: monthCounts[busiestMonth] || 0,
        internationalFlights,
        domesticFlights,
    };
}

// Rendering functions
function renderKPIs(flights) {
    const kpis = calculateKPIs(flights);
    const aircraftStats = getAircraftStats(flights);

    document.getElementById('totalFlights').textContent = kpis.totalFlights;
    document.getElementById('totalDistance').textContent = `${kpis.totalDistance.toLocaleString()} km`;
    document.getElementById('timeInAir').textContent = kpis.timeInAir;
    document.getElementById('airportsVisited').textContent = kpis.airportsVisited;
    document.getElementById('countries').textContent = kpis.countries;
    document.getElementById('airlines').textContent = kpis.airlines;
    document.getElementById('aircraftTypes').textContent = kpis.aircraftTypes;
    document.getElementById('avgAircraftAge').textContent = `${aircraftStats.averageAge} yrs`;
}

function renderAviationStory(flights) {
    const story = calculateAviationStory(flights);
    const container = document.getElementById('storyGrid');
    container.innerHTML = '';

    const fromAirport = AIRPORT_DATA[story.mostVisitedAirport];
    const airline = getAirlineName(story.mostFlownAirline);

    const cards = [
        {
            title: 'MOST VISITED AIRPORT',
            main: story.mostVisitedAirport,
            sub: fromAirport?.city || 'Unknown',
            detail: `${story.mostVisitedAirportCount} visits`
        },
        {
            title: 'MOST FLOWN AIRLINE',
            main: airline.name,
            sub: story.mostFlownAirline,
            detail: `${story.mostFlownAirlineCount} flights`
        },
        {
            title: 'MOST FLOWN ROUTE',
            main: story.mostFlownRoute,
            sub: `${story.mostFlownRouteCount} flights`,
            detail: getRouteDistanceKm(story.mostFlownRoute)
        },
        {
            title: 'LONGEST FLIGHT',
            main: `${story.longestFlight?.from || '-'} → ${story.longestFlight?.to || '-'}`,
            sub: `${story.longestFlight?.distance || 0} km`,
            detail: story.longestFlight?.duration || '-'
        },
        {
            title: 'BUSIEST MONTH',
            main: story.busiestMonth,
            sub: `${story.busiestMonthCount} flights`,
            detail: ''
        },
        {
            title: 'INTERNATIONAL VS DOMESTIC',
            main: `${story.internationalFlights}`,
            sub: `International flights`,
            detail: `${story.domesticFlights} domestic`
        },
    ];

    cards.forEach(card => {
        const el = document.createElement('div');
        el.className = 'story-card';
        el.innerHTML = `
            <div class="story-card-title">${card.title}</div>
            <div class="story-card-main">${card.main}</div>
            <div class="story-card-sub">${card.sub}</div>
            <div class="story-card-detail">${card.detail}</div>
        `;
        container.appendChild(el);
    });
}

function renderTimeline(flights) {
    const yearStats = {};

    flights.forEach(f => {
        const year = f.year;
        if (!yearStats[year]) {
            yearStats[year] = {
                year,
                flights: 0,
                distance: 0,
                countries: new Set(),
            };
        }
        yearStats[year].flights++;
        yearStats[year].distance += f.distance || 0;
        if (f.from) {
            const country = AIRPORT_DATA[f.from]?.countryCode;
            if (country) yearStats[year].countries.add(country);
        }
    });

    const container = document.getElementById('timelineContainer');
    container.innerHTML = '';

    Object.keys(yearStats).sort((a, b) => parseInt(a) - parseInt(b)).forEach(year => {
        const stats = yearStats[year];
        const el = document.createElement('div');
        el.className = 'timeline-item';
        if (appState.selectedYear === year.toString()) el.classList.add('active');

        el.innerHTML = `
            <div class="timeline-year">${year}</div>
            <div class="timeline-stat">${stats.flights} flights</div>
            <div class="timeline-stat">${stats.distance.toLocaleString()} km</div>
            <div class="timeline-stat">${stats.countries.size} countries</div>
        `;

        el.addEventListener('click', () => {
            setSelectedYear(year.toString());
        });

        container.appendChild(el);
    });
}

function renderAirlineUniverse(flights) {
    const airlineCounts = {};
    let totalFlights = 0;

    flights.forEach(f => {
        if (f.airline) {
            airlineCounts[f.airline] = (airlineCounts[f.airline] || 0) + 1;
            totalFlights++;
        }
    });

    const sorted = Object.entries(airlineCounts)
        .sort((a, b) => b[1] - a[1]);

    const container = document.getElementById('airlineGrid');
    container.innerHTML = '';

    // Airline wing logo mapping (using Kiwi.com CDN which has reliable airline logos)
    const airlineLogos = {
        'AAL': 'https://images.kiwi.com/airlines/64/AAL.png',
        'AIC': 'https://images.kiwi.com/airlines/64/AIC.png',
        'AKJ': 'https://images.kiwi.com/airlines/64/AKJ.png',
        'AXB': 'https://images.kiwi.com/airlines/64/AXB.png',
        'BAW': 'https://images.kiwi.com/airlines/64/BAW.png',
        'BKP': 'https://images.kiwi.com/airlines/64/BKP.png',
        'ETD': 'https://images.kiwi.com/airlines/64/ETD.png',
        'FFT': 'https://images.kiwi.com/airlines/64/FFT.png',
        'GOW': 'https://images.kiwi.com/airlines/64/GOW.png',
        'IAD': 'https://images.kiwi.com/airlines/64/IAD.png',
        'IGO': 'https://images.kiwi.com/airlines/64/IGO.png',
        'JAI': 'https://images.kiwi.com/airlines/64/JAI.png',
        'KLM': 'https://images.kiwi.com/airlines/64/KLM.png',
        'QTR': 'https://images.kiwi.com/airlines/64/QTR.png',
        'RYR': 'https://images.kiwi.com/airlines/64/RYR.png',
        'SEJ': 'https://images.kiwi.com/airlines/64/SEJ.png',
        'SWA': 'https://images.kiwi.com/airlines/64/SWA.png',
        'TGW': 'https://images.kiwi.com/airlines/64/TGW.png',
        'UAE': 'https://images.kiwi.com/airlines/64/UAE.png',
        'VTI': 'https://images.kiwi.com/airlines/64/VTI.png',
    };

    // Country code mapping
    const countryCodeMap = {
        'USA': 'US', 'UK': 'GB', 'Netherlands': 'NL', 'Ireland': 'IE',
        'India': 'IN', 'UAE': 'AE', 'Qatar': 'QA', 'Singapore': 'SG',
        'Malaysia': 'MY', 'Thailand': 'TH', 'France': 'FR', 'Germany': 'DE',
        'Spain': 'ES', 'Iran': 'IR'
    };

    sorted.forEach(([code, count]) => {
        const airline = getAirlineName(code);
        const percentage = ((count / totalFlights) * 100).toFixed(1);
        const countryCode = countryCodeMap[airline.country] || 'UN';
        const flag = getCountryFlag(countryCode);

        const el = document.createElement('div');
        el.className = 'airline-card';
        el.dataset.airline = code;

        const logoUrl = airlineLogos[code];
        const logoHtml = logoUrl
            ? `<img src="${logoUrl}" alt="${airline.name} logo" class="airline-wing-logo" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"><div class="airline-flag-fallback">${flag}</div>`
            : `<div class="airline-flag-fallback">${flag}</div>`;

        el.innerHTML = `
            <div class="airline-image" style="background: linear-gradient(135deg, rgba(0, 212, 255, 0.08), rgba(74, 144, 226, 0.08)); display: flex; align-items: center; justify-content: center;">
                ${logoHtml}
            </div>
            <div class="airline-content">
                <div class="airline-name">${airline.name}</div>
                <div class="airline-code">${code} • ${airline.country}</div>
                <div class="airline-stats">
                    <span class="airline-flights">${count} flights</span>
                    <span class="airline-percentage">${percentage}%</span>
                </div>
                <div class="airline-progress">
                    <div class="airline-progress-bar" style="width: ${percentage}%"></div>
                </div>
            </div>
        `;

        // Click handler for airline filter
        let clickCount = 0;
        let clickTimer = null;
        el.addEventListener('click', (e) => {
            if (e.target.tagName === 'IMG') return;
            clickCount++;
            if (clickCount === 1) {
                clickTimer = setTimeout(() => {
                    // Single click - filter by this airline
                    if (historyAirline === code) {
                        historyAirline = '';
                    } else {
                        historyAirline = code;
                    }
                    document.getElementById('airlineFilter').value = historyAirline;
                    applyHistoryFilters();
                    clickCount = 0;
                }, 250);
            } else if (clickCount === 2) {
                // Double click - reset filter
                clearTimeout(clickTimer);
                historyAirline = '';
                document.getElementById('airlineFilter').value = '';
                applyHistoryFilters();
                clickCount = 0;
            }
        });

        container.appendChild(el);
    });
}

function renderGeographicalStats(flights) {
    const countryCounts = {};
    const airportCounts = {};
    const countriesSet = new Set();

    flights.forEach(f => {
        if (f.from && AIRPORT_DATA[f.from]) {
            const airport = AIRPORT_DATA[f.from];
            airportCounts[f.from] = (airportCounts[f.from] || 0) + 1;
            countryCounts[airport.countryCode] = (countryCounts[airport.countryCode] || 0) + 1;
            countriesSet.add(airport.countryCode);
        }
        if (f.to && AIRPORT_DATA[f.to]) {
            const airport = AIRPORT_DATA[f.to];
            airportCounts[f.to] = (airportCounts[f.to] || 0) + 1;
            countryCounts[airport.countryCode] = (countryCounts[airport.countryCode] || 0) + 1;
            countriesSet.add(airport.countryCode);
        }
    });

    const internationalFlights = flights.filter(f => {
        const fromCountry = AIRPORT_DATA[f.from]?.countryCode;
        const toCountry = AIRPORT_DATA[f.to]?.countryCode;
        return fromCountry && toCountry && fromCountry !== toCountry;
    }).length;

    const domesticFlights = flights.length - internationalFlights;

    const geoSummary = document.getElementById('geoSummary');
    geoSummary.innerHTML = `
        <div class="kpi-card">
            <div class="kpi-value">${countriesSet.size}</div>
            <div class="kpi-label">Countries Visited</div>
        </div>
        <div class="kpi-card">
            <div class="kpi-value">${new Set(Object.keys(airportCounts)).size}</div>
            <div class="kpi-label">Airports Visited</div>
        </div>
        <div class="kpi-card">
            <div class="kpi-value">${internationalFlights}</div>
            <div class="kpi-label">International Flights</div>
        </div>
        <div class="kpi-card">
            <div class="kpi-value">${domesticFlights}</div>
            <div class="kpi-label">Domestic Flights</div>
        </div>
    `;

    const countryGrid = document.getElementById('countryGrid');
    countryGrid.innerHTML = '';

    const COUNTRY_MAP = {
        'IN': 'India', 'ID': 'Indonesia', 'SG': 'Singapore', 'MY': 'Malaysia',
        'TH': 'Thailand', 'VN': 'Vietnam', 'HK': 'Hong Kong', 'CN': 'China',
        'JP': 'Japan', 'KR': 'South Korea', 'US': 'USA', 'GB': 'UK',
        'FR': 'France', 'DE': 'Germany', 'NL': 'Netherlands', 'CH': 'Switzerland',
        'AE': 'UAE', 'QA': 'Qatar', 'IE': 'Ireland', 'ES': 'Spain',
    };

    Object.entries(countryCounts).sort((a, b) => b[1] - a[1]).forEach(([countryCode, count]) => {
        const countryName = COUNTRY_MAP[countryCode] || countryCode;
        const airportCount = Object.keys(airportCounts).filter(code =>
            AIRPORT_DATA[code]?.countryCode === countryCode
        ).length;

        const el = document.createElement('div');
        el.className = 'country-card';
        el.innerHTML = `
            <div class="country-flag">${getCountryFlag(countryCode)}</div>
            <div class="country-info">
                <div class="country-name">${countryName}</div>
                <div class="country-stat">${count} flights • ${airportCount} airports</div>
            </div>
        `;

        countryGrid.appendChild(el);
    });
}

function renderAirportIntelligence(flights) {
    const airportStats = {};

    flights.forEach(f => {
        ['from', 'to'].forEach(key => {
            const code = f[key];
            if (code && AIRPORT_DATA[code]) {
                if (!airportStats[code]) {
                    airportStats[code] = {
                        code,
                        ...AIRPORT_DATA[code],
                        flights: 0,
                        arrivals: 0,
                        departures: 0,
                        firstVisit: null,
                        lastVisit: null,
                    };
                }
                airportStats[code].flights++;
                if (key === 'from') airportStats[code].departures++;
                if (key === 'to') airportStats[code].arrivals++;

                if (!airportStats[code].firstVisit || f.date < airportStats[code].firstVisit) {
                    airportStats[code].firstVisit = f.date;
                }
                if (!airportStats[code].lastVisit || f.date > airportStats[code].lastVisit) {
                    airportStats[code].lastVisit = f.date;
                }
            }
        });
    });

    const container = document.getElementById('airportGrid');
    container.innerHTML = '';

    Object.values(airportStats)
        .sort((a, b) => b.flights - a.flights)
        .slice(0, 12)
        .forEach(airport => {
            const el = document.createElement('div');
            el.className = 'airport-card';
            el.innerHTML = `
                <div class="airport-header">
                    <div class="airport-code">${airport.code}</div>
                    <div>
                        <div class="airport-name">${airport.city}</div>
                        <div class="airport-location">${airport.country} ${getCountryFlag(airport.countryCode)}</div>
                    </div>
                </div>
                <div class="airport-stats">
                    <div class="airport-stat">
                        <div class="airport-stat-label">Total</div>
                        <div class="airport-stat-value">${airport.flights}</div>
                    </div>
                    <div class="airport-stat">
                        <div class="airport-stat-label">Arrivals</div>
                        <div class="airport-stat-value">${airport.arrivals}</div>
                    </div>
                    <div class="airport-stat">
                        <div class="airport-stat-label">Departures</div>
                        <div class="airport-stat-value">${airport.departures}</div>
                    </div>
                    <div class="airport-stat">
                        <div class="airport-stat-label">Last Visit</div>
                        <div class="airport-stat-value">${airport.lastVisit?.toLocaleDateString() || '-'}</div>
                    </div>
                </div>
            `;

            container.appendChild(el);
        });
}

function renderRouteExplorer(flights) {
    const routeStats = {};

    flights.forEach(f => {
        const route = `${f.from}-${f.to}`;
        if (!routeStats[route]) {
            routeStats[route] = {
                from: f.from,
                to: f.to,
                airline: f.airline,
                flights: [],
            };
        }
        routeStats[route].flights.push(f);
    });

    const container = document.getElementById('routeGrid');
    container.innerHTML = '';

    Object.values(routeStats)
        .sort((a, b) => b.flights.length - a.flights.length)
        .slice(0, 12)
        .forEach(route => {
            const fromAirport = AIRPORT_DATA[route.from];
            const toAirport = AIRPORT_DATA[route.to];
            const distance = fromAirport && toAirport ?
                haversineDistance(fromAirport.lat, fromAirport.lng, toAirport.lat, toAirport.lng) : 0;

            const el = document.createElement('div');
            el.className = 'route-card';
            el.innerHTML = `
                <div class="route-path">
                    <div class="route-airport">
                        <div class="route-airport-code">${route.from}</div>
                        <div class="route-airport-city">${fromAirport?.city || 'Unknown'}</div>
                    </div>
                    <div class="route-arrow">→</div>
                    <div class="route-airport">
                        <div class="route-airport-code">${route.to}</div>
                        <div class="route-airport-city">${toAirport?.city || 'Unknown'}</div>
                    </div>
                </div>
                <div class="route-details">
                    <div>
                        <div class="route-detail-label">Distance</div>
                        <div class="route-detail-value">${distance} km</div>
                    </div>
                    <div>
                        <div class="route-detail-label">Flights</div>
                        <div class="route-detail-value">${route.flights.length}</div>
                    </div>
                    <div>
                        <div class="route-detail-label">Airline</div>
                        <div class="route-detail-value">${getAirlineName(route.airline).name}</div>
                    </div>
                    <div>
                        <div class="route-detail-label">Flight #</div>
                        <div class="route-detail-value">${route.flights[0]?.flight || '-'}</div>
                    </div>
                </div>
                <button class="route-replay-btn" onclick="openReplay('${route.from}', '${route.to}')">✈ WATCH REPLAY</button>
            `;

            container.appendChild(el);
        });
}

// Search & filter over the current year-filtered flights
let historyQuery = '';
let historyAirline = '';
let historyAirport = '';
let historyCabin = '';

function applyHistoryFilters() {
    const candidateFlights = appState.filteredFlights;
    const rawIndex = [];
    const matched = [];

    candidateFlights.forEach((f, i) => {
        const text = [
            f.date ? f.date.toLocaleDateString() : '',
            getAirlineName(f.airline).name,
            f.airline,
            f.flight,
            f.from,
            f.to,
            f.aircraft,
            f.cabin,
            f.status,
        ].join(' ').toLowerCase();

        const qMatch = !historyQuery || text.includes(historyQuery.toLowerCase());
        const aMatch = !historyAirline || f.airline === historyAirline;
        const apMatch = !historyAirport || f.from === historyAirport || f.to === historyAirport;
        const cMatch = !historyCabin || f.cabin === historyCabin;

        if (qMatch && aMatch && apMatch && cMatch) {
            matched.push(f);
            rawIndex.push(i);
        }
    });

    const tableBody = document.getElementById('flightTableBody');
    tableBody.innerHTML = '';

    matched.slice(0, 50).forEach((flight, pos) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${flight.date?.toLocaleDateString() || '-'}</td>
            <td>${getAirlineName(flight.airline).name}</td>
            <td>${flight.flight}</td>
            <td>${flight.from}</td>
            <td>${flight.to}</td>
            <td>${flight.aircraft}</td>
            <td>${flight.duration}</td>
            <td>${flight.distance} km</td>
            <td>${flight.cabin}</td>
            <td>${flight.status}</td>
            <td><button class="replay-btn-small" onclick="openReplay('${flight.from}', '${flight.to}', ${rawIndex[pos]})">✈</button></td>
        `;
        tableBody.appendChild(row);
    });

    // Update airline card visual state
    updateAirlineCardFilters();
}

function updateAirlineCardFilters() {
    document.querySelectorAll('.airline-card').forEach(card => {
        const code = card.dataset.airline;
        if (historyAirline && historyAirline === code) {
            card.classList.add('filtered');
        } else {
            card.classList.remove('filtered');
        }
    });
}

function populateHistoryFilterOptions() {
    const airlines = new Set();
    const airports = new Set();
    const cabins = new Set();

    appState.allFlights.forEach(f => {
        if (f.airline) airlines.add(f.airline);
        if (f.from) airports.add(f.from);
        if (f.to) airports.add(f.to);
        if (f.cabin && f.cabin !== '') cabins.add(f.cabin);
    });

    const airlineSel = document.getElementById('airlineFilter');
    airlineSel.innerHTML = '<option value="">All Airlines</option>';
    Array.from(airlines).sort().forEach(code => {
        const opt = document.createElement('option');
        opt.value = code;
        opt.textContent = `${code} — ${getAirlineName(code).name}`;
        airlineSel.appendChild(opt);
    });

    const airportSel = document.getElementById('airportFilter');
    airportSel.innerHTML = '<option value="">All Airports</option>';
    Array.from(airports).sort().forEach(code => {
        const opt = document.createElement('option');
        opt.value = code;
        opt.textContent = AIRPORT_DATA[code] ? `${code} — ${AIRPORT_DATA[code].city}` : code;
        airportSel.appendChild(opt);
    });

    const cabinSel = document.getElementById('cabinFilter');
    cabinSel.innerHTML = '<option value="">All Cabins</option>';
    Array.from(cabins).sort().forEach(cabin => {
        const opt = document.createElement('option');
        opt.value = cabin;
        opt.textContent = cabin;
        cabinSel.appendChild(opt);
    });

    if (historyAirline) airlineSel.value = historyAirline;
    if (historyAirport) airportSel.value = historyAirport;
    if (historyCabin) cabinSel.value = historyCabin;
}

function updateDateRange() {
    const flights = appState.filteredFlights;
    if (flights.length === 0) {
        document.getElementById('dateRange').textContent = 'No data';
        return;
    }

    const dates = flights.map(f => f.date).sort((a, b) => a - b);
    const minDate = dates[0]?.toLocaleDateString() || '';
    const maxDate = dates[dates.length - 1]?.toLocaleDateString() || '';

    document.getElementById('dateRange').textContent = `${minDate} - ${maxDate}`;
}

// Year filtering
function setSelectedYear(year) {
    appState.selectedYear = year;
    appState.filteredFlights = filterFlightsByYear(appState.allFlights, year);

    updateDateRange();
    renderKPIs(appState.filteredFlights);
    renderAviationStory(appState.filteredFlights);
    renderTimeline(appState.allFlights);
    renderAirlineUniverse(appState.filteredFlights);
    renderGeographicalStats(appState.filteredFlights);
    renderAirportIntelligence(appState.filteredFlights);
    renderRouteExplorer(appState.filteredFlights);
    populateHistoryFilterOptions();
    applyHistoryFilters();
    updateGlobe();

    document.querySelectorAll('.year-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.year === year) {
            btn.classList.add('active');
        }
    });
}

// Year filter buttons
function createYearFilterButtons() {
    const years = new Set();
    appState.allFlights.forEach(f => years.add(f.year));

    const container = document.getElementById('yearFilter');
    container.innerHTML = '';

    const allBtn = document.createElement('button');
    allBtn.className = 'year-btn active';
    allBtn.textContent = 'ALL';
    allBtn.dataset.year = 'all';
    allBtn.addEventListener('click', () => setSelectedYear('all'));
    container.appendChild(allBtn);

    Array.from(years)
        .sort((a, b) => a - b)
        .forEach(year => {
            const btn = document.createElement('button');
            btn.className = 'year-btn';
            btn.textContent = year;
            btn.dataset.year = year;
            btn.addEventListener('click', () => setSelectedYear(year));
            container.appendChild(btn);
        });
}

// Globe rendering
function updateGlobe() {
    if (!appState.globe) return;

    const points = [];
    const routes = [];
    const flightCounts = {};

    appState.filteredFlights.forEach((f, idx) => {
        const fromAirport = AIRPORT_DATA[f.from];
        const toAirport = AIRPORT_DATA[f.to];

        if (fromAirport) {
            flightCounts[f.from] = (flightCounts[f.from] || 0) + 1;
        }
        if (toAirport) {
            flightCounts[f.to] = (flightCounts[f.to] || 0) + 1;
        }

        if (fromAirport && toAirport) {
            routes.push({
                startLat: fromAirport.lat,
                startLng: fromAirport.lng,
                endLat: toAirport.lat,
                endLng: toAirport.lng,
                index: idx
            });
        }
    });

    // Add all airports as points
    Object.keys(flightCounts).forEach(code => {
        const airport = AIRPORT_DATA[code];
        if (airport) {
            points.push({
                lat: airport.lat,
                lng: airport.lng,
                count: flightCounts[code]
            });
        }
    });

    const labelByKey = {};
    Object.keys(AIRPORT_DATA).forEach(code => {
        const ap = AIRPORT_DATA[code];
        labelByKey[ap.lat + ',' + ap.lng] = { code, city: ap.city };
    });

    try {
        if (appState.globe) {
            appState.globe
                .pointsData(points)
                .pointColor(() => '#00d4ff')
                .pointSize((d) => Math.min(1.5, 0.4 + (d.count * 0.15)))
                .arcsData(routes)
                .arcColor(() => 'rgba(0, 212, 255, 0.7)')
                .arcStrokeWidth(1.2)
                .arcDashInitialGap(0)
                .arcDashGap(0)
                .labelsData(points.map(p => {
                    const meta = labelByKey[p.lat + ',' + p.lng] || { code: '', city: '' };
                    return { code: meta.code, city: meta.city, lat: p.lat, lng: p.lng, count: p.count };
                }));
        }
    } catch (e) {
        console.error('Globe update error:', e);
    }
}

function renderGlobeCanvasFallback() {
    const container = document.getElementById('globeContainer');
    if (!container || container.style.display === 'none') return;

    const canvas = container.querySelector('canvas');
    if (!canvas) {
        container.innerHTML = `
            <div style="width: 100%; height: 100%; background: linear-gradient(135deg, #0a2342 0%, #1a4d7a 50%, #0a2342 100%);
                        display: flex; align-items: center; justify-content: center; border-radius: 12px; position: relative;">
                <div style="text-align: center; color: rgba(0, 212, 255, 0.6);">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">🌍</div>
                    <div style="font-size: 1.1rem; font-weight: 600;">Flight Routes Map</div>
                    <div style="font-size: 0.9rem; margin-top: 0.5rem;">
                        ${appState.filteredFlights.length} flights • ${new Set(appState.filteredFlights.map(f => f.from)).size + new Set(appState.filteredFlights.map(f => f.to)).size} airports
                    </div>
                </div>
            </div>
        `;
    }
}

function initGlobe() {
    const container = document.getElementById('globe');
    if (!container) return;

    if (typeof Globe === 'undefined') {
        console.warn('Globe.gl not available, using fallback');
        document.getElementById('globeContainer').style.background = 'linear-gradient(135deg, #0a2342 0%, #1a4d7a 50%, #0a2342 100%)';
        return;
    }

    try {
        appState.globe = Globe()(container)
            .globeImageUrl('https://cdn.jsdelivr.net/npm/three-globe/example/img/earth-night.jpg')
            .backgroundColor('rgba(0, 0, 0, 0)')
            .atmosphereColor('#00d4ff')
            .atmosphereAltitude(0.15)
            // Airport labels
            .labelText(d => `${d.code} · ${d.city}`)
            .labelSize(1.2)
            .labelDotRadius(d => Math.max(0.5, Math.min(1.2, d.count * 0.15)))
            .labelColor(() => '#00d4ff')
            .labelResolution(2)
            .labelAltitude(0.01);

        // Load country boundaries from GeoJSON
        fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
            .then(r => r.json())
            .then(topo => {
                if (!appState.globe) return;
                // Convert TopoJSON to GeoJSON polygons
                const countries = topo.objects.countries.geometries || [];
                // Use topojson-client if available, else draw the raw arcs as a flat polygon list
                if (typeof topojson !== 'undefined' && topojson.feature) {
                    const geo = topojson.feature(topo, topo.objects.countries);
                    WORLD_POLYGONS = geo.features.map(f => {
                        if (f.geometry.type === 'Polygon') {
                            return f.geometry.coordinates[0];
                        } else if (f.geometry.type === 'MultiPolygon') {
                            return f.geometry.coordinates.flatMap(p => p[0]);
                        }
                        return [];
                    }).filter(c => c && c.length > 3);
                    appState.globe
                        .polygonsData(geo.features)
                        .polygonCapColor(() => 'rgba(0, 212, 255, 0.02)')
                        .polygonSideColor(() => 'rgba(0, 212, 255, 0.01)')
                        .polygonStrokeColor(() => 'rgba(0, 212, 255, 0.25)')
                        .polygonAltitude(0.001);
                } else {
                    // Fallback: manually extract coordinates from the topo arcs
                    const arcs = topo.arcs;
                    const transform = topo.transform;
                    const invScale = [
                        1 / (transform.scale[0] || 1),
                        1 / (transform.scale[1] || 1)
                    ];
                    const translate = transform.translate;

                    const decoded = countries.map(geom => {
                        const coords = [];
                        (geom.arcs || []).forEach(arcIndex => {
                            let arc = arcs[arcIndex < 0 ? ~arcIndex : arcIndex];
                            if (arcIndex < 0) arc = arc.slice().reverse();
                            let x = 0, y = 0;
                            arc.forEach(([dx, dy]) => {
                                x += dx; y += dy;
                                coords.push([
                                    x * invScale[0] - translate[0],
                                    y * invScale[1] - translate[1]
                                ]);
                            });
                        });
                        return coords;
                    }).filter(c => c.length > 3);

                    WORLD_POLYGONS = decoded;
                    appState.globe
                        .polygonsData(decoded.map(c => ({ type: 'Polygon', coordinates: [c] })))
                        .polygonCapColor(() => 'rgba(0, 212, 255, 0.02)')
                        .polygonSideColor(() => 'rgba(0, 212, 255, 0.01)')
                        .polygonStrokeColor(() => 'rgba(0, 212, 255, 0.25)')
                        .polygonAltitude(0.001);
                }
            })
            .catch(e => console.warn('Could not load country boundaries:', e));

        // Auto-rotate globe
        setTimeout(() => {
            if (appState.globe && appState.globe.controls) {
                const controls = appState.globe.controls();
                if (controls) {
                    controls.autoRotate = true;
                    controls.autoRotateSpeed = 2;
                }
            }
        }, 500);

        // Prevent globe from capturing scroll events
        const canvas = container.querySelector('canvas');
        if (canvas) {
            canvas.addEventListener('wheel', (e) => {
                if (e.ctrlKey || e.metaKey) {
                    e.preventDefault();
                } else {
                    e.stopPropagation();
                }
            }, { passive: false });
        }

        // Initial update with slight delay
        setTimeout(() => updateGlobe(), 300);
    } catch (e) {
        console.warn('Globe init error:', e);
        renderGlobeCanvasFallback();
    }
}

// Handle scroll-based globe sizing
window.addEventListener('scroll', () => {
    const globeContainer = document.getElementById('globeContainer');
    if (!globeContainer) return;

    const rect = globeContainer.getBoundingClientRect();
    const scrollProgress = Math.max(0, 1 - (rect.bottom / window.innerHeight));

    // Scale globe down as user scrolls past it
    const scale = Math.max(0.3, 1 - (scrollProgress * 0.7));
    globeContainer.style.transform = `scale(${scale})`;
    globeContainer.style.opacity = Math.max(0.3, 1 - (scrollProgress * 0.7));
});

// Replay functionality
let replayState = {
    globe: null,
    flight: null,
    progress: 0,
    playing: false,
    speed: 1,
    interval: null,
};

function openReplay(from, to, flightIndex) {
    // If flightIndex is provided, use it directly (from table rows)
    let flight = null;
    if (flightIndex !== undefined && flightIndex !== null) {
        flight = appState.filteredFlights[flightIndex];
        // Verify it matches the route
        if (flight && (flight.from !== from || flight.to !== to)) {
            flight = null;
        }
    }
    // Otherwise find the first matching flight
    if (!flight) {
        flight = appState.filteredFlights.find(f => f.from === from && f.to === to);
    }

    if (!flight) {
        console.warn('Flight not found:', from, to, flightIndex);
        return;
    }

    replayState.flight = flight;
    replayState.progress = 0;
    replayState.playing = false;
    replayState.speed = 1;

    const modal = document.getElementById('replayModal');
    modal.classList.add('active');

    const fromAirport = AIRPORT_DATA[flight.from];
    const toAirport = AIRPORT_DATA[flight.to];

    if (!fromAirport || !toAirport) {
        document.getElementById('replayDetails').innerHTML = '<p style="color: #ff6b6b;">Flight data incomplete</p>';
        return;
    }

    const distance = haversineDistance(fromAirport.lat, fromAirport.lng, toAirport.lat, toAirport.lng);
    const airline = getAirlineName(flight.airline);

    document.getElementById('replayDetails').innerHTML = `
        <div class="replay-detail">
            <div class="replay-detail-label">Airline</div>
            <div class="replay-detail-value">${airline.name} (${flight.airline})</div>
        </div>
        <div class="replay-detail">
            <div class="replay-detail-label">Flight Number</div>
            <div class="replay-detail-value">${flight.flight}</div>
        </div>
        <div class="replay-detail">
            <div class="replay-detail-label">Route</div>
            <div class="replay-detail-value">${flight.from} → ${flight.to}</div>
        </div>
        <div class="replay-detail">
            <div class="replay-detail-label">Aircraft</div>
            <div class="replay-detail-value">${flight.aircraft}</div>
        </div>
        <div class="replay-detail">
            <div class="replay-detail-label">Date</div>
            <div class="replay-detail-value">${flight.date?.toLocaleDateString()}</div>
        </div>
        <div class="replay-detail">
            <div class="replay-detail-label">Distance</div>
            <div class="replay-detail-value">${distance} km</div>
        </div>
        <div class="replay-detail">
            <div class="replay-detail-label">Duration</div>
            <div class="replay-detail-value">${flight.duration}</div>
        </div>
    `;

    // Initialize replay globe with actual 3D
    if (!replayState.globe) {
        const container = document.getElementById('replayGlobe');
        if (container && typeof Globe !== 'undefined') {
            try {
                replayState.globe = Globe()(container)
                    .globeImageUrl('https://cdn.jsdelivr.net/npm/three-globe/example/img/earth-night.jpg')
                    .backgroundColor('rgba(0, 0, 0, 0)')
                    .pointsData([])
                    .pointColor(() => '#00d4ff')
                    .pointSize(0.8)
                    .arcsData([])
                    .arcColor(() => 'rgba(0, 212, 255, 0.8)')
                    .arcStrokeWidth(1.5);
            } catch (e) {
                console.warn('Replay globe init error:', e);
            }
        }
    }

    // Initialize canvas for replay animation (delay one frame so modal layout is computed)
    document.getElementById('replayScrubber').value = 0;
    document.getElementById('replayProgress').textContent = '0%';
    requestAnimationFrame(() => {
        initReplayCanvas();
        updateReplayVisualization();
    });
}

// Canvas-based replay animation
function initReplayCanvas() {
    const canvas = document.getElementById('replayCanvas');
    if (!canvas) return;
    const section = canvas.parentElement;
    const w = section.clientWidth || section.offsetWidth || 800;
    const h = section.clientHeight || section.offsetHeight || 600;
    if (w < 10 || h < 10) {
        // Layout not ready yet, retry
        requestAnimationFrame(() => { initReplayCanvas(); updateReplayVisualization(); });
        return;
    }
    const dpr = window.devicePixelRatio || 1;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    replayState.canvasW = w;
    replayState.canvasH = h;
}

function bezierPoint(t, p0, p1, p2) {
    const mt = 1 - t;
    return mt * mt * p0 + 2 * mt * t * p1 + t * t * p2;
}

function renderReplayCanvas(flight, fromAirport, toAirport, progress) {
    const canvas = document.getElementById('replayCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = replayState.canvasW || canvas.width;
    const h = replayState.canvasH || canvas.height;

    // Clear
    ctx.clearRect(0, 0, w, h);

    // Background
    const grad = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w * 0.6);
    grad.addColorStop(0, '#0f1c2e');
    grad.addColorStop(1, '#060d18');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Map lat/lng to canvas coordinates with padding
    const pad = 80;
    const mapX = (lng) => pad + ((lng + 180) / 360) * (w - 2 * pad);
    const mapY = (lat) => pad + ((90 - lat) / 180) * (h - 2 * pad);

    // Draw 2D world map (use real polygons from world-atlas if loaded, else fallback)
    const coastlines = WORLD_POLYGONS && WORLD_POLYGONS.length > 0 ? WORLD_POLYGONS : WORLD_COASTLINES_FALLBACK;
    ctx.strokeStyle = 'rgba(0, 212, 255, 0.18)';
    ctx.lineWidth = 1;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    coastlines.forEach(ring => {
        if (ring.length < 2) return;
        ctx.beginPath();
        ctx.moveTo(mapX(ring[0][0]), mapY(ring[0][1]));
        for (let i = 1; i < ring.length; i++) {
            ctx.lineTo(mapX(ring[i][0]), mapY(ring[i][1]));
        }
        ctx.stroke();
    });

    // Subtle grid lines
    ctx.strokeStyle = 'rgba(0, 212, 255, 0.04)';
    ctx.lineWidth = 0.5;
    for (let lng = -180; lng <= 180; lng += 30) {
        ctx.beginPath(); ctx.moveTo(mapX(lng), pad); ctx.lineTo(mapX(lng), h - pad); ctx.stroke();
    }
    for (let lat = -90; lat <= 90; lat += 30) {
        ctx.beginPath(); ctx.moveTo(pad, mapY(lat)); ctx.lineTo(w - pad, mapY(lat)); ctx.stroke();
    }

    const x1 = mapX(fromAirport.lng), y1 = mapY(fromAirport.lat);
    const x2 = mapX(toAirport.lng), y2 = mapY(toAirport.lat);

    // Bezier control point (perpendicular arc)
    const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
    const dx = x2 - x1, dy = y2 - y1;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const offset = Math.max(40, dist * 0.35);
    const cx = mx - (dy / dist) * offset;
    const cy = my + (dx / dist) * offset;

    // Draw full route path (dim)
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.quadraticCurveTo(cx, cy, x2, y2);
    ctx.strokeStyle = 'rgba(0, 212, 255, 0.15)';
    ctx.lineWidth = 2;
    ctx.setLineDash([8, 6]);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw traveled portion (bright)
    if (progress > 0) {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        const steps = 120;
        const maxStep = Math.max(1, Math.floor(progress * steps));
        for (let i = 1; i <= maxStep; i++) {
            const t = i / steps;
            ctx.lineTo(bezierPoint(t, x1, cx, x2), bezierPoint(t, y1, cy, y2));
        }
        ctx.strokeStyle = '#00d4ff';
        ctx.lineWidth = 3;
        ctx.shadowColor = 'rgba(0, 212, 255, 0.6)';
        ctx.shadowBlur = 12;
        ctx.stroke();
        ctx.shadowBlur = 0;
    }

    // Draw airport markers
    [{ x: x1, y: y1, code: flight.from, city: fromAirport.city },
     { x: x2, y: y2, code: flight.to, city: toAirport.city }].forEach(ap => {
        // Outer glow
        const glow = ctx.createRadialGradient(ap.x, ap.y, 0, ap.x, ap.y, 18);
        glow.addColorStop(0, 'rgba(0, 212, 255, 0.25)');
        glow.addColorStop(1, 'rgba(0, 212, 255, 0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(ap.x, ap.y, 18, 0, Math.PI * 2);
        ctx.fill();
        // Dot
        ctx.beginPath();
        ctx.arc(ap.x, ap.y, 6, 0, Math.PI * 2);
        ctx.fillStyle = '#00d4ff';
        ctx.fill();
        ctx.beginPath();
        ctx.arc(ap.x, ap.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
        // Label
        ctx.font = 'bold 16px "Space Grotesk", sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.fillText(ap.code, ap.x, ap.y - 22);
        ctx.font = '11px Inter, sans-serif';
        ctx.fillStyle = 'rgba(255,255,255,0.5)';
        ctx.fillText(ap.city || '', ap.x, ap.y - 8);
    });

    // Draw aircraft
    if (progress > 0 && progress < 1) {
        const t = progress;
        const ax = bezierPoint(t, x1, cx, x2);
        const ay = bezierPoint(t, y1, cy, y2);

        // Direction tangent
        const dt = 0.005;
        const t2 = Math.min(1, t + dt);
        const bx = bezierPoint(t2, x1, cx, x2);
        const by = bezierPoint(t2, y1, cy, y2);
        const angle = Math.atan2(by - ay, bx - ax);

        // Aircraft glow
        const aglow = ctx.createRadialGradient(ax, ay, 0, ax, ay, 30);
        aglow.addColorStop(0, 'rgba(0, 212, 255, 0.35)');
        aglow.addColorStop(1, 'rgba(0, 212, 255, 0)');
        ctx.fillStyle = aglow;
        ctx.beginPath();
        ctx.arc(ax, ay, 30, 0, Math.PI * 2);
        ctx.fill();

        // Aircraft shape (triangle pointing in direction of travel)
        ctx.save();
        ctx.translate(ax, ay);
        ctx.rotate(angle);
        ctx.beginPath();
        ctx.moveTo(16, 0);
        ctx.lineTo(-10, -9);
        ctx.lineTo(-5, 0);
        ctx.lineTo(-10, 9);
        ctx.closePath();
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = 'rgba(0, 212, 255, 0.8)';
        ctx.shadowBlur = 16;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.strokeStyle = '#00d4ff';
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.restore();
    }

    // Progress label
    ctx.font = '13px Inter, sans-serif';
    ctx.fillStyle = 'rgba(255,255,255,0.4)';
    ctx.textAlign = 'left';
    ctx.fillText(Math.round(replayState.progress) + '%', 16, h - 16);
}

function updateReplayVisualization() {
    if (!replayState.flight) return;

    const flight = replayState.flight;
    const fromAirport = AIRPORT_DATA[flight.from];
    const toAirport = AIRPORT_DATA[flight.to];

    if (!fromAirport || !toAirport) return;

    const progress = replayState.progress / 100;
    const currentLat = fromAirport.lat + (toAirport.lat - fromAirport.lat) * progress;
    const currentLng = fromAirport.lng + (toAirport.lng - fromAirport.lng) * progress;

    // Canvas-based replay animation (always runs, provides visible fallback)
    renderReplayCanvas(flight, fromAirport, toAirport, progress);

    // Update replay globe (3D)
    if (replayState.globe) {
        try {
            // Three points: origin, destination, aircraft
            const points = [
                { lat: fromAirport.lat, lng: fromAirport.lng, size: 0.8, color: '#00d4ff' },
                { lat: toAirport.lat, lng: toAirport.lng, size: 0.8, color: '#00d4ff' },
                { lat: currentLat, lng: currentLng, size: 1.2, color: '#ffffff' }
            ];

            // Single route line from source to destination
            const routes = [{
                startLat: fromAirport.lat,
                startLng: fromAirport.lng,
                endLat: toAirport.lat,
                endLng: toAirport.lng,
                index: 0
            }];

            replayState.globe
                .pointsData(points)
                .pointColor(d => d.color)
                .pointSize(d => d.size)
                .arcsData(routes)
                .arcColor(() => 'rgba(0, 212, 255, 0.9)')
                .arcStrokeWidth(2.5)
                .arcDashInitialGap(0)
                .arcDashGap(0);
        } catch (e) {
            console.warn('Replay globe update error:', e);
        }
    }

    // Update progress display
    document.getElementById('replayProgress').textContent = Math.round(replayState.progress) + '%';
}

function playReplay() {
    replayState.playing = true;
    document.getElementById('replayPlay').style.display = 'none';
    document.getElementById('replayPause').style.display = 'inline-block';

    replayState.interval = setInterval(() => {
        replayState.progress += 2 * replayState.speed;
        if (replayState.progress >= 100) {
            replayState.progress = 100;
            pauseReplay();
        }

        document.getElementById('replayScrubber').value = replayState.progress;
        document.getElementById('replayProgress').textContent = Math.round(replayState.progress) + '%';
        updateReplayVisualization();
    }, 50);
}

function pauseReplay() {
    replayState.playing = false;
    clearInterval(replayState.interval);
    document.getElementById('replayPlay').style.display = 'inline-block';
    document.getElementById('replayPause').style.display = 'none';
}

function restartReplay() {
    pauseReplay();
    replayState.progress = 0;
    document.getElementById('replayScrubber').value = 0;
    document.getElementById('replayProgress').textContent = '0%';
    updateReplayVisualization();
}

// Aircraft database with manufacturing years
const AIRCRAFT_DATA = {
    'Airbus A320': { manufacturer: 'Airbus', year: 1987, capacity: 150 },
    'Airbus A321': { manufacturer: 'Airbus', year: 1993, capacity: 185 },
    'Airbus A319': { manufacturer: 'Airbus', year: 1995, capacity: 124 },
    'Airbus A320neo': { manufacturer: 'Airbus', year: 2015, capacity: 150 },
    'Airbus A321neo': { manufacturer: 'Airbus', year: 2017, capacity: 185 },
    'Airbus A350-900': { manufacturer: 'Airbus', year: 2015, capacity: 315 },
    'Airbus A350-1000': { manufacturer: 'Airbus', year: 2018, capacity: 366 },
    'Airbus A380-800': { manufacturer: 'Airbus', year: 2007, capacity: 555 },
    'Boeing 737-800': { manufacturer: 'Boeing', year: 1997, capacity: 162 },
    'Boeing 737-900ER': { manufacturer: 'Boeing', year: 2007, capacity: 178 },
    'Boeing 737 MAX 8': { manufacturer: 'Boeing', year: 2017, capacity: 162 },
    'Boeing 737-700': { manufacturer: 'Boeing', year: 1997, capacity: 137 },
    'Boeing 787-9': { manufacturer: 'Boeing', year: 2013, capacity: 242 },
    'Boeing 787-8': { manufacturer: 'Boeing', year: 2011, capacity: 242 },
    'Boeing 787-10': { manufacturer: 'Boeing', year: 2018, capacity: 330 },
    'Boeing 777-200 LR': { manufacturer: 'Boeing', year: 2004, capacity: 300 },
    'Boeing 777-200 ER': { manufacturer: 'Boeing', year: 1997, capacity: 300 },
    'Boeing 777-300 ER': { manufacturer: 'Boeing', year: 2004, capacity: 365 },
    'Boeing 777-300': { manufacturer: 'Boeing', year: 1998, capacity: 300 },
    'ATR 72': { manufacturer: 'ATR', year: 1988, capacity: 72 },
    'ATR 42 / ATR 72': { manufacturer: 'ATR', year: 1988, capacity: 72 },
    'DHC-8 Dash 8': { manufacturer: 'De Havilland', year: 1983, capacity: 50 },
    'DHC-8-400 Dash 8Q': { manufacturer: 'De Havilland', year: 2000, capacity: 76 },
    'Bombardier Q400': { manufacturer: 'Bombardier', year: 2000, capacity: 76 },
};

function getAircraftAge(aircraftType) {
    const aircraft = AIRCRAFT_DATA[aircraftType];
    if (!aircraft) return null;
    const currentYear = 2026;
    return currentYear - aircraft.year;
}

function getAircraftStats(flights) {
    const aircraftFlown = {};
    let totalAge = 0;
    let ageCount = 0;

    flights.forEach(f => {
        const type = f.aircraft;
        if (!type) return;
        if (!aircraftFlown[type]) {
            aircraftFlown[type] = 0;
        }
        aircraftFlown[type]++;

        const age = getAircraftAge(type);
        if (age !== null) {
            totalAge += age;
            ageCount++;
        }
    });

    const avgAge = ageCount > 0 ? Math.round(totalAge / ageCount) : 0;

    const entries = Object.entries(aircraftFlown);
    const knownYear = e => AIRCRAFT_DATA[e[0]]?.year || 0;

    let newestAircraft = null;
    let oldestAircraft = null;
    if (entries.length > 0) {
        newestAircraft = entries.reduce((a, b) => knownYear(a) > knownYear(b) ? a : b)[0];
        oldestAircraft = entries.reduce((a, b) => knownYear(a) < knownYear(b) ? a : b)[0];
    }

    return {
        aircraftFlown,
        averageAge: avgAge,
        newestAircraft,
        oldestAircraft,
        uniqueAircraft: entries.length,
    };
}

function askAgent() {
    const input = document.getElementById('agentInput');
    const query = input.value.toLowerCase().trim();
    if (!query) return;

    const messagesContainer = document.getElementById('agentMessages');

    const userMsg = document.createElement('div');
    userMsg.className = 'agent-message agent-user';
    userMsg.textContent = query;
    messagesContainer.appendChild(userMsg);

    input.value = '';

    const story = calculateAviationStory(appState.filteredFlights);
    let response = 'I can help with questions about your flight history. Ask me about last flights, delays, statistics, routes, airlines, countries, or aircraft!';

    for (const [key, responder] of Object.entries(agentResponses)) {
        if (query.includes(key)) {
            response = responder(story, appState.filteredFlights);
            break;
        }
    }

    setTimeout(() => {
        const agentMsg = document.createElement('div');
        agentMsg.className = 'agent-message agent-response';
        agentMsg.textContent = response;
        messagesContainer.appendChild(agentMsg);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 300);
}

// File upload
document.getElementById('uploadBtn').addEventListener('click', () => {
    document.getElementById('csvUpload').click();
});

document.getElementById('csvUpload').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
        const csv = event.target.result;
        const flights = parseCSV(csv);
        appState.allFlights = normalizeFlights(flights);
        appState.filteredFlights = appState.allFlights;

        createYearFilterButtons();
        setSelectedYear('all');

        document.getElementById('uploadBtn').textContent = '✓ Loaded';
        setTimeout(() => {
            document.getElementById('uploadBtn').textContent = '📁 Load Flighty CSV';
        }, 2000);
    };
    reader.readAsText(file);
});

// Event listeners
document.getElementById('replayClose').addEventListener('click', () => {
    pauseReplay();
    document.getElementById('replayModal').classList.remove('active');
});

document.getElementById('replayPlay').addEventListener('click', playReplay);
document.getElementById('replayPause').addEventListener('click', pauseReplay);
document.getElementById('replayRestart').addEventListener('click', restartReplay);

document.querySelectorAll('.speed-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('.speed-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        replayState.speed = parseFloat(e.target.dataset.speed);
    });
});

document.getElementById('replayScrubber').addEventListener('input', (e) => {
    replayState.progress = parseFloat(e.target.value);
    document.getElementById('replayProgress').textContent = Math.round(replayState.progress) + '%';
    updateReplayVisualization();
});

document.getElementById('agentSend').addEventListener('click', askAgent);
document.getElementById('agentInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') askAgent();
});

// Flight history search & filter controls
document.getElementById('searchInput').addEventListener('input', (e) => {
    historyQuery = e.target.value;
    applyHistoryFilters();
});

document.getElementById('airlineFilter').addEventListener('change', (e) => {
    historyAirline = e.target.value;
    applyHistoryFilters();
});

document.getElementById('airportFilter').addEventListener('change', (e) => {
    historyAirport = e.target.value;
    applyHistoryFilters();
});

document.getElementById('cabinFilter').addEventListener('change', (e) => {
    historyCabin = e.target.value;
    applyHistoryFilters();
});

document.getElementById('agentToggle').addEventListener('click', () => {
    const body = document.getElementById('agentBody');
    body.classList.toggle('collapsed');
    appState.agentCollapsed = !appState.agentCollapsed;
    document.getElementById('agentToggle').textContent = appState.agentCollapsed ? '+' : '−';
});

// Auto-load CSV data from file
function autoLoadFlights() {
    fetch('flights.csv')
        .then(response => response.text())
        .then(csv => {
            const flights = parseCSV(csv);
            appState.allFlights = normalizeFlights(flights);
            appState.filteredFlights = appState.allFlights;

            createYearFilterButtons();
            setSelectedYear('all');

            console.log(`✓ Loaded ${appState.allFlights.length} flights`);
        })
        .catch(err => {
            console.error('Failed to load flights.csv:', err);
        });
}

// Initialize on page load
window.addEventListener('load', () => {
    initGlobe();
    autoLoadFlights();
});

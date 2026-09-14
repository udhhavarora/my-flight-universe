# MY FLIGHT UNIVERSE

A premium personal aviation analytics dashboard built from Flighty CSV exports.

## Overview

**My Flight Universe** is a cinematic, data-rich flight history visualization tool that transforms your aviation data into an interactive personal travel archive. The dashboard combines the elegance of a luxury aviation journal with modern data analytics, all presented through a sophisticated dark interface.

## Features

### 🌍 Interactive 3D Globe
- Real-time flight route visualization
- Dynamic airport markers scaled by activity
- Smooth great-circle route rendering
- Graceful fallback if globe library fails

### 📊 Flight Telemetry
Real-time KPI calculations:
- Total Flights
- Total Distance (km)
- Time in Air (hours)
- Airports Visited
- Countries Explored
- Airlines Flown
- Aircraft Types

### ✈️ Your Aviation Story
- Most Visited Airport
- Most Flown Airline
- Most Flown Route
- Longest Flight
- Busiest Month
- International vs Domestic Split

### 📅 Journey Timeline
- Yearly flight activity visualization
- Click to filter by year
- Shows flights, distance, and countries per year

### 🛫 Airline Universe
- Ranked airline cards
- Flight counts and percentages
- Progress bars
- Airline branding imagery

### 🗺️ Geographical Stats
- Countries and airports visited
- International/Domestic flight split
- Country-specific flight intelligence
- Flag emojis for visual recognition

### 🏢 Airport Intelligence
- Top 12 airports by activity
- Arrival/departure counts
- First and last visit dates
- Geographic metadata

### 🛣️ Route Explorer
- Top 12 routes by frequency
- Distance calculations
- Replay controls
- Flight number tracking

### ✈️ Flight Replay
- Interactive replay visualization
- Adjustable playback speed (0.5x, 1x, 2x, 4x)
- Progress scrubber
- Aircraft marker animation along route
- Detailed flight information panel

### 🧭 Flight Agent
- AI-powered flight intelligence
- Natural language queries
- Answers questions about flight history
- Context-aware responses based on filtered data

### 📋 Flight History
- Searchable flight table
- Filterable by year, airline, airport, cabin
- Full flight details
- Quick access to flight replays

## Getting Started

### Loading Your Data

1. Click the **"📁 Load Flighty CSV"** button in the top right
2. Select your Flighty export CSV file
3. The dashboard auto-calculates all statistics

### Demo Data

The dashboard loads with sample flight data from 2024. Replace it with your actual Flighty CSV export.

### Year Filtering

Use the year filter buttons below the hero section to filter ALL dashboard elements by year:
- Select "ALL" for complete history
- Click any year to isolate data from that period

Every section updates dynamically:
- KPIs recalculate
- Globe re-renders routes
- Rankings update
- Stories refresh

## Design Language

### Color Palette
- **Primary**: Dark navy/charcoal (#0a0e12)
- **Accent**: Electric cyan (#00d4ff)
- **Secondary**: Soft blue (#4a90e2)
- **Tertiary**: Muted purple (#7b68ee)

### Typography
- **Headings**: Space Grotesk (geometric, modern)
- **Body**: Inter (clean, readable)
- **Spacing**: Generous, breathable layout

### Visual Elements
- Subtle glass-morphism cards
- Soft glow effects (not excessive)
- Smooth animations and transitions
- Premium depth with restrained shadows
- Rounded corners (12px default)

## Technical Architecture

### Data Flow
```
CSV Upload
    ↓
Parse & Normalize
    ↓
Centralized State (appState)
    ↓
Year Filter
    ↓
Computed Analytics
    ↓
UI Rendering (all sections)
```

### Key Data Structures

**Airport Data**
```javascript
{
  code: { lat, lng, city, country, countryCode }
}
```

**Airline Data**
```javascript
{
  code: { name, country }
}
```

**Flight Object**
```javascript
{
  date, year, month,
  from, to, distance, duration,
  airline, flight, aircraft, cabin, status,
  durationMinutes, ...
}
```

### State Management

Single source of truth in `appState`:
- `allFlights`: Complete dataset
- `filteredFlights`: Year-filtered view
- `selectedYear`: Active year filter
- `globe`: Globe.gl instance
- `selectedFlight`: Current replay flight

All UI sections consume `filteredFlights` to ensure consistency.

## API Reference

### Core Functions

**`parseCSV(csvContent)`**
- Parses Flighty CSV format
- Returns raw flight objects

**`normalizeFlights(flights)`**
- Enriches flight data
- Calculates derived fields (year, duration in minutes, etc.)
- Returns normalized flights

**`filterFlightsByYear(flights, year)`**
- Filters by year or returns all
- Updates entire dashboard

**`calculateKPIs(flights)`**
- Computes telemetry metrics
- Returns object with all KPI values

**`calculateAviationStory(flights)`**
- Computes rankings and insights
- Returns top airports, airlines, routes, etc.

**`haversineDistance(lat1, lng1, lat2, lng2)`**
- Great-circle distance calculation
- Returns km

### Rendering Functions

All render functions consume filtered flights:
- `renderKPIs()`
- `renderAviationStory()`
- `renderTimeline()`
- `renderAirlineUniverse()`
- `renderGeographicalStats()`
- `renderAirportIntelligence()`
- `renderRouteExplorer()`
- `renderFlightHistory()`

### Replay System

**`openReplay(from, to, [flightIndex])`**
- Opens replay modal
- Initializes replay globe

**`playReplay()` / `pauseReplay()` / `restartReplay()`**
- Replay controls

**`updateReplayGlobe()`**
- Updates aircraft position
- Animates along route

## CSV Format

Expected Flighty export columns:
```
Date, Airline, Flight, From, To,
Scheduled Departure Time, Actual Departure Time,
Gate Departure (Scheduled), Gate Departure (Actual),
Scheduled Arrival Time, Actual Arrival Time,
Gate Arrival (Scheduled), Gate Arrival (Actual),
Duration, Aircraft Type, Aircraft Type Name,
Aircraft Registration, Seat, Seat Type,
Cabin Class, Flight Status, Distance,
Departure Terminal, Arrival Terminal, Canceled
```

## Customization

### Adding Airports

Edit `AIRPORT_DATA` in `app.js`:
```javascript
'LAX': { 
  lat: 33.9425, 
  lng: -118.4081, 
  city: 'Los Angeles', 
  country: 'USA', 
  countryCode: 'US' 
}
```

### Adding Airlines

Edit `AIRLINE_DATA` in `app.js`:
```javascript
'AAL': { 
  name: 'American Airlines', 
  country: 'USA' 
}
```

### Styling

All CSS variables are in `styles.css`:
```css
:root {
    --bg-dark: #0a0e12;
    --accent-cyan: #00d4ff;
    /* ... etc */
}
```

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Requires ES6+ support

## Performance

- Handles 1000+ flights smoothly
- Lazy image loading with fallbacks
- Efficient globe rendering with throttling
- CSV parsing in-memory (no backend required)

## Reliability

- **No single point of failure**: If globe library fails, graceful fallback shown
- **Image fallbacks**: Airline images use placeholder if CDN fails
- **Error handling**: All external dependencies wrapped in try-catch
- **Progressive enhancement**: Works without JavaScript (shows upload button)

## Responsive Design

- **Desktop (1920px+)**: Full 2-column replay layout
- **Tablet (768px-1200px)**: Single-column with 50vh globe
- **Mobile (<768px)**: Stacked layout, full-width cards, horizontal scroll for tables

## Future Enhancements

- Export flight data as PDF journal
- Compare flight patterns across years
- Aircraft performance analytics
- Co-pilot statistics (if available in data)
- Social sharing of achievements
- Integration with real flight tracking APIs

## Troubleshooting

### Globe Not Loading
- Check browser console for errors
- Fallback text will appear
- Dashboard functions normally without globe

### Missing Airports
- Add to `AIRPORT_DATA` mapping
- Uses IATA codes

### Performance Issues
- Reduce dataset size
- Check browser memory usage
- Clear browser cache

## License

Personal use. Aviation data is your own.

---

**Built with premium design principles, sophisticated data visualization, and a passion for aviation.** ✈️

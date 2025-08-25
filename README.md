# Warden Property Search - Frontend

A Next.js frontend application for searching properties with weather-based filtering capabilities.

## Features

- Property search with real-time text filtering
- Weather-based filters (temperature, humidity, weather conditions)
- Professional property cards with weather information
- Responsive design with Tailwind CSS
- Real-time API integration with backend

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- Backend server running on port 5000

### Installation

1. Navigate to frontend directory:
```bash
cd warnder-peoprty-forntend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will start on `http://localhost:3000`

## Features Overview

### Search Functionality
- Real-time text search across property names, cities, and states
- Auto-search on input change

### Weather Filters
- **Temperature Range**: Filter by minimum and maximum temperature (-20°C to 50°C)
- **Humidity Range**: Filter by minimum and maximum humidity (0% to 100%)
- **Weather Conditions**: Filter by weather types (Clear, Cloudy, Drizzle, Rainy, Snow)

### Property Display
- Professional property cards with gradient headers
- Real-time weather information display
- Property status indicators (Available/Unavailable)
- Location details with coordinates
- Weather icons and condition descriptions

## Technology Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **State Management**: React Hooks (useState, useEffect)
- **API Integration**: Fetch API

## Component Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx           # Main search page
│   └── globals.css        # Global styles
└── components/
    ├── SearchBar.tsx      # Search input component
    ├── WeatherFilters.tsx # Weather filtering component
    └── PropertyCard.tsx   # Property display component
```

## API Integration

The frontend communicates with the backend API at `http://localhost:5000/get-properties` with the following parameters:

- `searchText` - Text search query
- `minTemp` / `maxTemp` - Temperature range
- `minHumidity` / `maxHumidity` - Humidity range  
- `weatherCondition` - Weather condition filter

## Scripts

- `npm run dev` - Start development server (port 3000)
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Usage

1. Start the backend server on port 5000
2. Start the frontend development server
3. Open `http://localhost:3000` in your browser
4. Use the search bar to find properties by name, city, or state
5. Apply weather filters to narrow down results
6. View property details with real-time weather information
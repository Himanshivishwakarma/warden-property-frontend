# Warden Property Search - Frontend

A Next.js frontend application for searching properties with weather-based filtering capabilities.

## Features

- **Smart Search** - Real-time text filtering with instant results
- **Weather Filters** - Temperature, humidity, and weather condition filtering
- **Property Cards** - Professional cards with live weather data
- **Responsive Design** - Works seamlessly on all devices
- **Real-time Integration** - Live weather data from Open-Meteo API
- **Modern UI** - Beautiful gradients and smooth animations
- **Smart Messages** - Dynamic feedback for empty results
- **Error Handling** - Graceful fallback for API failures

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
- **Styling**: Tailwind CSS with custom gradients
- **Language**: TypeScript with strict typing
- **State Management**: React Hooks (useState, useEffect)
- **API Integration**: Fetch API with error handling
- **Icons**: Custom SVG icons and weather emojis
- **Animations**: CSS transitions and hover effects

## UI Enhancements 

### Visual Features
- **Gradient Headers**: Beautiful purple-to-blue gradients on property cards
- **Weather Icons**: Dynamic weather emojis based on conditions
  -  Clear sky
  -  Cloudy
  -  Rainy
  -  Snow
  -  Drizzle
- **Status Indicators**: Green/red badges for property availability
- **Loading States**: Animated spinner with smooth transitions
- **Empty States**: Custom illustrations for no results

### Interactive Elements
- **Hover Effects**: Cards lift and shadow on hover
- **Smooth Animations**: 500ms transitions for all interactions
- **Responsive Grid**: Adapts from 1 to 3 columns based on screen size
- **Form Validation**: Real-time input validation and feedback

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

### Basic Setup
1. Start the backend server on port 5000
2. Start the frontend development server
3. Open `http://localhost:3000` in your browser

### Search Tips 
- **City Search**: Try "Mumbai", "Delhi", "Pune", "Chennai"
- **Property Search**: Search by property names like "Warden Mumbai"
- **State Search**: Filter by states like "Maharashtra", "Karnataka"
- **Instant Results**: No need to press Enter - results update as you type

### Weather Filtering 
- **Temperature Range**: 
  - Hot cities: 25-35°C (Mumbai, Chennai)
  - Cool cities: 15-25°C (Delhi winter, Bengaluru)
  - Extreme filters: Try 35-50°C to see fallback messages
- **Humidity Range**: 
  - Dry: 30-60% (Northern cities)
  - Humid: 70-95% (Coastal cities)
- **Weather Conditions**: 
  - Clear: Sunny weather
  - Cloudy: Overcast conditions
  - Rainy: Monsoon areas

### Pro Tips 
- Combine multiple filters for precise results
- Clear all filters to reset search
- Watch console for real-time API vs fallback data indicators
- Property cards show live weather with appropriate icons
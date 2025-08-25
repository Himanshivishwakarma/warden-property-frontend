'use client';

import React from 'react';

interface Weather {
  temperature: number;
  humidity: number;
  weatherCode: number;
}

interface Property {
  name: string;
  city: string;
  state: string;
  country: string;
  lat?: number;
  lng?: number;
  weather?: Weather;
  isActive: boolean;
}

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const getWeatherIcon = (weatherCode: number) => {
    if (weatherCode === 0) return '☀️';
    if ([1, 2, 3].includes(weatherCode)) return '⛅';
    if ([51, 53, 55, 56, 57].includes(weatherCode)) return '🌦️';
    if ([61, 63, 65, 66, 67, 80, 81, 82].includes(weatherCode)) return '🌧️';
    if ([71, 73, 75, 77, 85, 86].includes(weatherCode)) return '❄️';
    return '🌤️';
  };

  const getWeatherCondition = (weatherCode: number) => {
    if (weatherCode === 0) return 'Clear Sky';
    if ([1, 2, 3].includes(weatherCode)) return 'Cloudy';
    if ([51, 53, 55, 56, 57].includes(weatherCode)) return 'Drizzle';
    if ([61, 63, 65, 66, 67, 80, 81, 82].includes(weatherCode)) return 'Rainy';
    if ([71, 73, 75, 77, 85, 86].includes(weatherCode)) return 'Snow';
    return 'Unknown';
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border-0 transform hover:-translate-y-2">
      {/* Header with Gradient */}
      <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
        <div className="relative z-10">
          <h3 className="text-2xl font-bold mb-2 leading-tight">{property.name}</h3>
          <div className="flex items-center text-indigo-100">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium">{property.city}, {property.state}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Location Details */}
        <div className="mb-6 bg-gray-50 rounded-xl p-4">
          <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
            <svg className="w-5 h-5 mr-2 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd" />
            </svg>
            Property Details
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Country:</span>
              <span className="font-medium text-gray-800">{property.country}</span>
            </div>

            {property.lat && property.lng && (
              <div className="flex justify-between">
                <span className="text-gray-600">Coordinates:</span>
                <span className="font-mono text-xs text-gray-500">
                  {property.lat.toFixed(3)}, {property.lng.toFixed(3)}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Weather Info */}
        {property.weather ? (
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-5 border-2 border-blue-100">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-bold text-gray-800 flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
                Live Weather
              </h4>
              <div className="flex items-center">
                <span className="text-3xl mr-2">
                  {getWeatherIcon(property.weather.weatherCode)}
                </span>
                <span className="text-sm font-medium text-blue-700">
                  {getWeatherCondition(property.weather.weatherCode)}
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-4 text-center shadow-sm border border-blue-200">
                <div className="text-3xl font-bold text-blue-600 mb-1">
                  {Math.round(property.weather.temperature)}°C
                </div>
                <div className="text-xs text-gray-600 font-medium">Temperature</div>
              </div>
              
              <div className="bg-white rounded-lg p-4 text-center shadow-sm border border-indigo-200">
                <div className="text-3xl font-bold text-indigo-600 mb-1">
                  {Math.round(property.weather.humidity)}%
                </div>
                <div className="text-xs text-gray-600 font-medium">Humidity</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-gray-100 rounded-xl p-5 text-center border-2 border-dashed border-gray-300">
            <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.4 4.4 0 003 15z" />
            </svg>
            <span className="text-gray-500 text-sm font-medium">Weather data loading...</span>
          </div>
        )}

        {/* Status Badge */}
        <div className="mt-6 flex justify-between items-center">
          <span className={`px-4 py-2 rounded-full text-sm font-bold flex items-center ${
            property.isActive 
              ? 'bg-green-100 text-green-800 border border-green-200' 
              : 'bg-red-100 text-red-800 border border-red-200'
          }`}>
            <div className={`w-2 h-2 rounded-full mr-2 ${
              property.isActive ? 'bg-green-500' : 'bg-red-500'
            }`}></div>
            {property.isActive ? 'Available' : 'Unavailable'}
          </span>
          

        </div>
      </div>
    </div>
  );
}
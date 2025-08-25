'use client';

import React from 'react';

interface WeatherFilters {
  temperatureMin?: number;
  temperatureMax?: number;
  humidityMin?: number;
  humidityMax?: number;
  weatherCondition?: string;
}

interface WeatherFiltersProps {
  filters: WeatherFilters;
  onChange: (filters: WeatherFilters) => void;
}

export default function WeatherFiltersComponent({ filters, onChange }: WeatherFiltersProps) {
  const updateFilter = (key: string, value: string | number | undefined) => {
    onChange({
      ...filters,
      [key]: value === '' ? undefined : value
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6 border">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Weather Filters</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Temperature Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Temperature (°C)
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min"
              min="-20"
              max="50"
              value={filters.temperatureMin || ''}
              onChange={(e) => updateFilter('temperatureMin', e.target.value ? Number(e.target.value) : undefined)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <input
              type="number"
              placeholder="Max"
              min="-20"
              max="50"
              value={filters.temperatureMax || ''}
              onChange={(e) => updateFilter('temperatureMax', e.target.value ? Number(e.target.value) : undefined)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
        </div>

        {/* Humidity Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Humidity (%)
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min"
              min="0"
              max="100"
              value={filters.humidityMin || ''}
              onChange={(e) => updateFilter('humidityMin', e.target.value ? Number(e.target.value) : undefined)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <input
              type="number"
              placeholder="Max"
              min="0"
              max="100"
              value={filters.humidityMax || ''}
              onChange={(e) => updateFilter('humidityMax', e.target.value ? Number(e.target.value) : undefined)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
        </div>

        {/* Weather Condition */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Weather Condition
          </label>
          <select
            value={filters.weatherCondition || ''}
            onChange={(e) => updateFilter('weatherCondition', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            <option value="">All Conditions</option>
            <option value="Clear">Clear</option>
            <option value="Cloudy">Cloudy</option>
            <option value="Drizzle">Drizzle</option>
            <option value="Rainy">Rainy</option>
            <option value="Snow">Snow</option>
          </select>
        </div>
      </div>

      {/* Clear Filters Button */}
      <div className="mt-4 flex justify-end">
        <button
          type="button"
          onClick={() => onChange({})}
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 text-sm font-medium"
        >
          Clear All
        </button>
      </div>
    </div>
  );
}
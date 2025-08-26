'use client';

import PropertyCard from '@/components/PropertyCard';
import SearchBar from '@/components/SearchBar';
import WeatherFiltersComponent from '@/components/WeatherFilters';
import { useEffect, useState, useCallback } from 'react';

interface Weather {
  temperature: number;
  humidity: number;
  weatherCode: number;
}

interface Property {
  id: string;
  name: string;
  city: string;
  state: string;
  country: string;
  lat?: number;
  lng?: number;
  weather?: Weather;
  isActive: boolean;
}

interface WeatherFilters {
  temperatureMin?: number;
  temperatureMax?: number;
  humidityMin?: number;
  humidityMax?: number;
  weatherCondition?: string;
}

export default function Home() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [searchText, setSearchText] = useState('');
  const [filters, setFilters] = useState<WeatherFilters>({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string>('');
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);

  const fetchProperties = async (currentFilters = filters) => {
    setLoading(true);
    setMessage('');
    try {
      const params = new URLSearchParams();
      if (searchText) params.append('searchText', searchText);
      if (currentFilters.temperatureMin) params.append('minTemp', currentFilters.temperatureMin.toString());
      if (currentFilters.temperatureMax) params.append('maxTemp', currentFilters.temperatureMax.toString());
      if (currentFilters.humidityMin) params.append('minHumidity', currentFilters.humidityMin.toString());
      if (currentFilters.humidityMax) params.append('maxHumidity', currentFilters.humidityMax.toString());
      if (currentFilters.weatherCondition) params.append('weatherCondition', currentFilters.weatherCondition);
      
      console.log('API URL:', `http://localhost:5000/get-properties?${params}`);
      const response = await fetch(`http://localhost:5000/get-properties?${params}`);
      const data = await response.json();
      console.log('API Response:', data);
      
      // Handle new response structure
      if (data.data) {
        setProperties(data.data);
        setMessage(data.message || '');
      } else {
        // Fallback for old response format
        setProperties(Array.isArray(data) ? data : []);
        setMessage('');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Failed to load properties. Please try again.');
      setProperties([]);
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetchProperties = useCallback((newFilters: WeatherFilters) => {
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }
    
    const timer = setTimeout(() => {
      fetchProperties(newFilters);
    }, 500); // 500ms delay
    
    setDebounceTimer(timer);
  }, [debounceTimer]);

  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <main className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Warden Property Search</h1>
        
        <SearchBar 
          value={searchText}
          onChange={setSearchText}
          onSearch={fetchProperties}
        />
        
        <WeatherFiltersComponent 
          filters={filters}
          onChange={(newFilters) => {
            console.log('New filters:', newFilters);
            setFilters(newFilters);
            debouncedFetchProperties(newFilters);
          }}
        />
        
        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">Loading properties...</p>
          </div>
        ) : (
          <>
            {properties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map((property: Property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="bg-gray-50 rounded-lg p-8 max-w-md mx-auto">
                  <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Properties Found</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {message || 'No properties match your current search criteria.'}
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
'use client';

import PropertyCard from '@/components/PropertyCard';
import SearchBar from '@/components/SearchBar';
import WeatherFiltersComponent from '@/components/WeatherFilters';
import { useEffect, useState } from 'react';

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

  const fetchProperties = async (currentFilters = filters) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchText) params.append('searchText', searchText);
      if (currentFilters.temperatureMin) params.append('minTemp', currentFilters.temperatureMin);
      if (currentFilters.temperatureMax) params.append('maxTemp', currentFilters.temperatureMax);
      if (currentFilters.humidityMin) params.append('minHumidity', currentFilters.humidityMin);
      if (currentFilters.humidityMax) params.append('maxHumidity', currentFilters.humidityMax);
      if (currentFilters.weatherCondition) params.append('weatherCondition', currentFilters.weatherCondition);
      
      console.log('API URL:', `http://localhost:5000/get-properties?${params}`);
      const response = await fetch(`http://localhost:5000/get-properties?${params}`);
      const data = await response.json();
      console.log('API Response:', data);
      setProperties(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

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
            fetchProperties(newFilters);
          }}
        />
        
        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(properties || []).map((property: Property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
        
        {!loading && (!properties || properties.length === 0) && (
          <div className="text-center py-8">No properties found.</div>
        )}
      </div>
    </main>
  );
}
import { Property, WeatherData, SearchFilters } from '@/types';

const API_BASE_URL = 'http://localhost:5000';

export async function fetchProperties(filters?: SearchFilters): Promise<Property[]> {
  const params = new URLSearchParams();
  
  if (filters?.searchText) {
    params.append('search', filters.searchText);
  }
  
  const url = `${API_BASE_URL}/get-properties${params.toString() ? `?${params.toString()}` : ''}`;
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch properties');
  }
  
  return response.json();
}

export async function fetchWeatherData(lat: number, lon: number): Promise<WeatherData> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m,relativehumidity_2m`;
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }
  
  const data = await response.json();
  
  return {
    temperature: Math.round(data.current_weather.temperature),
    humidity: Math.round(data.hourly.relativehumidity_2m[0]),
    weatherCode: data.current_weather.weathercode
  };
}
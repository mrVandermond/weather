import type { IForecastWeather } from '@/api/types';
import * as utl from './utils';

export async function fetchForecastWeather(lat: number, lon: number): Promise<IForecastWeather> {
  const response = await fetch(utl.getURLForWeather('/v1/forecast.json', {
    q: `${lat},${lon}`,
    days: 7,
  }));

  return response.json() as Promise<IForecastWeather>;
}

import type { ICurrentWeather, IHourlyForecast } from '@/api/types';
import * as utl from './utils';

export async function getWeather(lat: number, lon: number): Promise<ICurrentWeather> { // TODO: удалить
  const response = await fetch(utl.getURLForWeather('/v1/current.json', {
    q: `${lat},${lon}`,
  }));

  return response.json() as Promise<ICurrentWeather>;
}

export async function getHourlyForecastWeather(lat: number, lon: number): Promise<IHourlyForecast> {
  const response = await fetch(utl.getURLForWeather('/v1/forecast.json', {
    q: `${lat},${lon}`,
    days: 7,
  }));

  return response.json() as Promise<IHourlyForecast>;
}

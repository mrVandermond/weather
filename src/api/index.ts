import * as utl from './utils';

interface ICurrentWeather {
  name: string;
  dt: number;
  wind: {
    deg: number;
    speed: number;
    gust: number;
  };
  weather: Array<{
    description: string;
  }>;
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
    feels_like: number;
    pressure: number;
    humidity: number;
  };
}

export async function getWeather(lat: number, lon: number): Promise<ICurrentWeather> {
  const response = await fetch(utl.getURLForWeather('/data/2.5/weather/', {
    lat,
    lon,
    units: 'metric',
    lang: 'ru',
  }));

  return response.json() as Promise<ICurrentWeather>;
}

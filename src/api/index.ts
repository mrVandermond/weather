import * as utl from './utils';

interface IMainInfoWeather {
  temp: number;
  temp_min: number;
  temp_max: number;
  feels_like: number;
  pressure: number;
  humidity: number;
}

interface IWind {
  deg: number;
  speed: number;
  gust: number;
}

type TWeather = Array<{
  description: string;
}>;

interface IHourlyForecastItem {
  dt: string;
  wind: IWind;
  weather: TWeather;
  main: IMainInfoWeather;
}

interface ICity {
  id: number;
  name: string;
  country: string;
  population: number;
  sunrise: number;
  sunset: number;
  timezone: number;
  coord: {
    lan: number;
    lat: number;
  };
}

export interface ICurrentWeather {
  name: string;
  dt: number;
  wind: IWind;
  weather: TWeather;
  main: IMainInfoWeather;
}

export interface IHourlyForecast {
  cnt: number;
  list: IHourlyForecastItem[];
  city: ICity;
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

export async function getHourlyForecastWeather(lat: number, lon: number, cnt = 12): Promise<IHourlyForecast> {
  const response = await fetch(utl.getURLForWeather('/data/2.5/forecast/', {
    lat,
    lon,
    cnt,
    lang: 'ru',
  }));

  return response.json() as Promise<IHourlyForecast>;
}

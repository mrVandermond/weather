import * as utl from './utils';

enum BOOLEAN {
  FALSE,
  TRUE,
}

interface ILocation {
  lat: number;
  lon: number;
  name: string;
  region: string;
  country: string;
  tz_id: string;
  localtime_epoch: number;
  localtime: string;
}

interface ICondition {
  text: string;
  code: number; // TODO: Узнать какие конкретные значения тут могут быть и сделать enum
}

interface ICurrent {
  temp_c: number;
  feelslike_c: number;
  condition: ICondition;
  wind_kph: number;
  wind_degree: number;
  wind_dir: string;
  pressure_mb: number;
  precip_mm: number;
  humidity: number;
  cloud: number;
  is_day: BOOLEAN;
  uv: number;
  gust_kph: number;
  vis_km: number;
}

export interface IForecastDay {
  maxtemp_c: number;
  mintemp_c: number;
  avgtemp_c: number;
  maxwind_kph: number;
  totalprecip_mm: number;
  avgvis_km: number;
  avghumidity: number;
  condition: ICondition;
  uv: number;
}

interface IForecastAstro {
  sunrise: string;
  sunset: string;
  moonrise: string;
  moonset: string;
  moon_phase: string;
  moon_illumination: number;
}

export interface IForecastHour extends ICurrent {
  time_epoch: number;
  windchill_c: number;
  heatindex_c: number;
  dewpoint_c: number;
  will_it_rain: BOOLEAN;
  will_it_snow: BOOLEAN;
  chance_of_rain: number;
  chance_of_snow: number;
}

interface IForecast {
  day: IForecastDay;
  astro: IForecastAstro;
  hour: IForecastHour[];
  date_epoch: number;
}

export interface ICurrentWeather {
  location: ILocation;
  current: ICurrent;
}

export interface IHourlyForecast {
  location: ILocation;
  current: ICurrent;
  forecast: {
    forecastday: IForecast[];
  };
}

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

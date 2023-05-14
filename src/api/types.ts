enum EBoolean {
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

export interface ICurrent {
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
  is_day: EBoolean;
  uv: number;
  gust_kph: number;
  vis_km: number;
}

interface ICondition {
  text: string;
  code: number;
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

export interface IForecastDayWithDate extends IForecastDay {
  date_epoch: number;
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
  will_it_rain: EBoolean;
  will_it_snow: EBoolean;
  chance_of_rain: number;
  chance_of_snow: number;
}

interface IForecast {
  day: IForecastDay;
  astro: IForecastAstro;
  hour: IForecastHour[];
  date_epoch: number;
}

export interface IForecastWeather {
  location: ILocation;
  current: ICurrent;
  forecast: {
    forecastday: IForecast[];
  };
}

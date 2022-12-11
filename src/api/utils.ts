export const API_KEY = '97c941415da39d17960131bb8086c4b6';

type TGetUrlInternal = (url: string, params?: { [key: string]: unknown }) => string;

export function getURL(base: string): TGetUrlInternal {
  return (url, params) => {
    const urlPresentation = new URL(url, base);

    urlPresentation.searchParams.append('appid', API_KEY);

    if (!params) {
      return urlPresentation.toString();
    }

    for (const key of Object.keys(params)) {
      urlPresentation.searchParams.append(key, String(params[key]));
    }

    return urlPresentation.toString();
  };
}

export const getURLForWeather = getURL('https://api.openweathermap.org');
export const getURLForForecast = getURL('https://pro.openweathermap.org');

export const API_KEY = '715db0f15901498e982173411222212';

type TGetUrlInternal = (url: string, params?: { [key: string]: unknown }) => string;

export function getURL(base: string): TGetUrlInternal {
  return (url, params) => {
    const urlPresentation = new URL(url, base);

    urlPresentation.searchParams.append('key', API_KEY);

    if (!params) {
      return urlPresentation.toString();
    }

    for (const key of Object.keys(params)) {
      urlPresentation.searchParams.append(key, String(params[key]));
    }

    return urlPresentation.toString();
  };
}

export const getURLForWeather = getURL('https://api.weatherapi.com');

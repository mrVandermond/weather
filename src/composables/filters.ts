function capitalize(str: string): string {
  if (str.length < 2) return str;

  return `${str[0].toUpperCase()}${str.slice(1)}`;
}

function hoursWithLeadingZero(timestamp: number): string {
  const hours = new Date(timestamp).getHours();

  if (hours < 10) return `0${hours}:00`;

  return `${hours}:00`;
}

function dayOfWeek(timestamp: number): string {
  const dayOfWeekArr = [
    'Вс',
    'Пн',
    'Вт',
    'Ср',
    'Чт',
    'Пт',
    'Сб',
  ];

  return dayOfWeekArr[new Date(timestamp).getDay()];
}

interface IFilters {
  capitalize: typeof capitalize;
  hoursWithLeadingZero: typeof hoursWithLeadingZero;
  dayOfWeek: typeof dayOfWeek;
}

export function useFilters(): IFilters {
  return {
    capitalize,
    hoursWithLeadingZero,
    dayOfWeek,
  };
}

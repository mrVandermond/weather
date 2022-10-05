function capitalize(str: string): string {
  if (str.length < 2) return str;

  return `${str[0].toUpperCase()}${str.slice(1)}`;
}

interface IFilters {
  capitalize: typeof capitalize;
}

export function useFilters(): IFilters {
  return {
    capitalize,
  };
}

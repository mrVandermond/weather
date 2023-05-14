export function isCurrentHour(timestamp: number): boolean {
  const date = new Date(timestamp);
  const currentDate = new Date();

  return date.getHours() === currentDate.getHours();
}

export function isCurrentDate(timestamp: number): boolean {
  const date = new Date(timestamp);
  const currentDate = new Date();

  return date.getDate() === currentDate.getDate();
}

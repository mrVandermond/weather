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

export function scrollIntoView(rootScroll: HTMLElement, cssSelector: string): void {
  const activeElement = rootScroll.querySelector<HTMLElement>(cssSelector);

  if (!activeElement) return;

  rootScroll.scrollTo({
    left: activeElement.offsetLeft - 6,
    behavior: 'smooth',
  });
}

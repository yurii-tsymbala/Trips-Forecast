export function getFormattedDate(time: number): string {
  if (time <= 0) {
    return '--';
  }

  const date = new Date(time * 1000);

  const day = date.getDate().toString();
  const month = date.getMonth();
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
}

export function getCoundownDate(time: number): { days: number, hours: number, minutes: number, seconds: number } {
  const timeLeftSec = time - Date.now() / 1000;
  let days = 0, hours = 0, minutes = 0, seconds = 0;

  if (timeLeftSec < 0)
    return { days, hours, minutes, seconds };

  days = Math.floor(timeLeftSec / (3600 * 24));
  hours = Math.floor(timeLeftSec % (3600 * 24) / 3600);
  minutes = Math.floor(timeLeftSec % 3600 / 60);
  seconds = Math.floor(timeLeftSec % 60);

  return { days, hours, minutes, seconds };
}

export function getFormattedDay(time: number): string {
  const date = new Date(time * 1000);
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const day = daysOfWeek[date.getDay()];
  return day;
}


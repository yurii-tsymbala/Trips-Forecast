export default function getFormattedDate(time: number): string {
    if (time <= 0) {
      return '--';
    }
  
    const date = new Date(time * 1000);
  
    const day = date.getDate().toString();
    const month = date.getMonth();
    const year = date.getFullYear();
  
    return `${day}.${month}.${year}`;
  }
  
  
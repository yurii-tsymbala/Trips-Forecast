import { Component, Input } from '@angular/core';
import { Weather } from '../../models/Weather';

@Component({
  selector: 'weather',
  standalone: true,
  imports: [],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss',
})
export class WeatherComponent {
  @Input() weather!: Weather;

  get tempFormatted(): string {
    return this.weather.tempmax + '*/' + this.weather.tempmin + '*';
  }

  get dayFormatted(): string {
    const date = new Date(this.weather.datetimeEpoch * 1000);
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const day = daysOfWeek[date.getDay()];
    return day;
  }
}

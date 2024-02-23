import { Component, Input } from '@angular/core';
import { Weather } from '../../models/Weather';
import { getFormattedDay } from '../../models/FormattedDate';

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
    return (
      farenheitToCelcius(this.weather.tempmax) +
      '°/' +
      farenheitToCelcius(this.weather.tempmin) +
      '°'
    );
  }

  get dayFormatted(): string {
    return getFormattedDay(this.weather.datetimeEpoch);
  }

  get imageUrl(): string {
    return `assets/weather/${this.weather.icon.toLowerCase()}.png`;
  }
}

const farenheitToCelcius = (fahrenheit: number) => {
  return Math.round(((fahrenheit - 32) * 5) / 9);
};

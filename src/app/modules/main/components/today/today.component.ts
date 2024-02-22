import { Component, HostBinding, OnInit } from '@angular/core';
import { Weather } from '../../models/Weather';
import { TripService } from '../../services/trip.service';
import { Trip } from '../../models/Trip';
import { getCoundownDate, getFormattedDay } from '../../models/FormattedDate';

@Component({
  selector: 'today',
  standalone: true,
  imports: [],
  templateUrl: './today.component.html',
  styleUrl: './today.component.scss',
})
export class TodayComponent implements OnInit {
  currentWeather?: Weather;
  currentTrip?: Trip;
  updateIntervalId: number = 0;

  days = 0;
  hours = 0;
  minutes = 0;
  seconds = 0;

  constructor(private tripService: TripService) {}

  ngOnInit(): void {
    this.observeData();

    setInterval(() => this.updateDate(), 1000);
  }

  private updateDate() {
    if (!this.currentTrip) return;

    const { days, hours, minutes, seconds } = getCoundownDate(
      this.currentTrip.startDate
    );

    this.days = days;
    this.hours = hours;
    this.minutes = minutes;
    this.seconds = seconds;
  }

  private observeData() {
    this.tripService.updatedCurrentWeather$.subscribe(
      (currentWeather: Weather) => (this.currentWeather = currentWeather)
    );

    this.tripService.updatedCurrentTrip$.subscribe((currentTrip: Trip) => {
      this.currentTrip = currentTrip;
      this.updateDate();
    });
  }

  get tempFormatted(): string {
    if (this.currentWeather) {
      return `${this.currentWeather.temp}`;
    } else {
      return '';
    }
  }

  get dayFormatted(): string {
    if (this.currentWeather) {
      return getFormattedDay(this.currentWeather.datetimeEpoch);
    } else {
      return '';
    }
  }

  @HostBinding('class.showed')
  get showed(): boolean {
    return !!this.currentWeather;
  }
}

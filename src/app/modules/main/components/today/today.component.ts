import { Component, OnInit } from '@angular/core';
import { Weather } from '../../models/Weather';
import { TripService } from '../../services/trip.service';
import { take } from 'rxjs/internal/operators/take';
import { Trip } from '../../models/Trip';
import { takeUntil } from 'rxjs';

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

  constructor(private tripService: TripService) {}

  ngOnInit(): void {
    this.observeData();
  }

  private observeData() {
    this.tripService.updatedCurrentWeather$.subscribe(
      (currentWeather) => (this.currentWeather = currentWeather)
    );

    this.tripService.updatedCurrentTrip$.subscribe(
      (currentTrip) => (this.currentTrip = currentTrip)
    );
  }

  get tempFormatted(): string {
    if (this.currentWeather) {
      return this.currentWeather.temp + '*';
    } else {
      return "";
    }
  }

  get dayFormatted(): string {
    if (this.currentWeather) {
      const date = new Date(this.currentWeather.datetimeEpoch * 1000);
      const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const day = daysOfWeek[date.getDay()];
      return day;
    } else {
      return '';
    }
  }
}

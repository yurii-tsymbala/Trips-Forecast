import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { TodayComponent } from '../today/today.component';
import { SearchComponent } from '../search/search.component';
import { TripComponent } from '../trip/trip.component';
import { WeatherComponent } from '../weather/weather.component';
import { TripService } from '../../services/trip.service';
import { Observable } from 'rxjs';
import { Trip } from '../../models/Trip';
import { CommonModule } from '@angular/common';
import { Weather } from '../../models/Weather';

@Component({
  selector: 'main',
  standalone: true,
  imports: [
    HeaderComponent,
    SearchComponent,
    TripComponent,
    WeatherComponent,
    TodayComponent,
    CommonModule,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent implements OnInit {
  selectedItem: number = -1;
  trips$!: Observable<Trip[]>;
  weathers$!: Observable<Weather[]>;

  constructor(private tripService: TripService) {}

  ngOnInit(): void {
    this.fetchBooks();
    this.observeData();
  }

  private observeData(): void {
    this.trips$ = this.tripService.updatedTrips$;
    this.weathers$ = this.tripService.updatedWeathers$;
  }

  private fetchBooks(): void {
    this.tripService.fetchTrips();
  }

  onTripDetail(trip: Trip) {
    this.selectedItem = trip.id;
    this.tripService.fetchForecast(trip);
    this.tripService.fetchForecastToday(trip);
  }
}

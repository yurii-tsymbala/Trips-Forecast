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

  constructor(private tripService: TripService) {}

  ngOnInit(): void {
    this.fetchBooks();
    this.observeTrips();
  }

  private observeTrips(): void {
    this.trips$ = this.tripService.updatedTrips$;
  }

  private fetchBooks(): void {
    this.tripService.fetchTrips();
  }

  onTripDetail(tripId: number) {
    this.selectedItem = tripId;
    // show todayComponent with today weather data
    // show forecast for all trip
  }
}

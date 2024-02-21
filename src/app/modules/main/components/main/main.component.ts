import { Component, OnInit, ViewChild } from '@angular/core';
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
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'main',
  standalone: true,
  imports: [
    HeaderComponent,
    SearchComponent,
    TripComponent,
    WeatherComponent,
    TodayComponent,
    ModalComponent,
    CommonModule,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent implements OnInit {
  selectedItem: number = -1;
  trips$!: Observable<Trip[]>;
  weathers$!: Observable<Weather[]>;

  @ViewChild('modal', { static: false }) modal!: ModalComponent;

  constructor(private tripService: TripService) {}

  ngOnInit(): void {
    this.fetchTrips();
    this.observeData();
  }

  private observeData(): void {
    this.trips$ = this.tripService.updatedTrips$;
    this.weathers$ = this.tripService.updatedWeathers$;
  }

  private fetchTrips(): void {
    this.tripService.fetchTrips();
  }

  onTripDetail(trip: Trip) {
    this.selectedItem = trip.id;
    this.tripService.fetchForecast(trip);
    this.tripService.fetchForecastToday(trip);
  }

  onTripSave() {
  // save trip to service;
  }

  onTripAdd() {
    this.modal.open();
  }
}

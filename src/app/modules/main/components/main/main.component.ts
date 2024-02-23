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
  imports: [HeaderComponent, SearchComponent, TripComponent, WeatherComponent, TodayComponent, ModalComponent, CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent implements OnInit {
  @ViewChild('modal', { static: false }) modal!: ModalComponent;

  trips$!: Observable<Trip[]>;
  weathers$!: Observable<Weather[]>;
  selectedIndex: number = -1;
  scrollIndex = 0;

  constructor(private tripService: TripService) { }

  ngOnInit(): void {
    this.fetchTrips();
    this.observeData();
  }

  onTripSelect(index: number): void {
    this.selectedIndex = index;
  }

  onTripDetail(trip: Trip): void {
    this.tripService.fetchForecast(trip);
    this.tripService.fetchForecastToday(trip);
  }

  onTripAdd(): void {
    this.modal.onOpen();
  }

  onSearch(): void {
    this.selectedIndex = -1;
    this.scrollIndex = 0;
  }

  onPrevClick(): void {
    this.scrollIndex--;
  }

  onNextClick(): void {
    this.scrollIndex++;
  }

  get scrollStyle(): string {
    return `translate(-${this.scrollIndex * 14}rem)`;
  }

  private observeData(): void {
    this.trips$ = this.tripService.updatedTrips$;
    this.weathers$ = this.tripService.updatedWeathers$;
  }

  private fetchTrips(): void {
    this.tripService.fetchTrips();
  }
}

import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { TodayComponent } from '../today/today.component';
import { SearchComponent } from '../search/search.component';
import { TripComponent } from '../trip/trip.component';
import { WeatherComponent } from '../weather/weather.component';

@Component({
  selector: 'main',
  standalone: true,
  imports: [
    HeaderComponent,
    SearchComponent,
    TripComponent,
    WeatherComponent,
    TodayComponent,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent implements OnInit {
  ngOnInit(): void {}
}

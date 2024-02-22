import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Trip } from '../models/Trip';
import { Weather } from '../models/Weather';

@Injectable({
  providedIn: 'root',
})
export class TripService {
  private tripsKey = 'trips';
  private trips$ = new BehaviorSubject<Trip[]>([]);
  private weathers$ = new BehaviorSubject<Weather[]>([]);
  private currentWeather$ = new Subject<Weather>();
  private currentTrip$ = new Subject<Trip>();
  readonly updatedTrips$ = this.trips$.asObservable();
  readonly updatedWeathers$ = this.weathers$.asObservable();
  readonly updatedCurrentWeather$ = this.currentWeather$.asObservable();
  readonly updatedCurrentTrip$ = this.currentTrip$.asObservable();

  constructor() {
    this.loadMock();
  }

  async fetchForecast(trip: Trip) {
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${trip.city}/${trip.startDate}/${trip.endDate}?key=YFYZNTBA382JYNXFFMPZ37GC9&contentType=json`);
    const data = await response.json();

    const weathers = data["days"] as Weather[];  
    this.weathers$.next(weathers);  
  }

  async fetchForecastToday(trip: Trip) {
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${trip.city}/today?unitGroup=metric&include=days &key=YFYZNTBA382JYNXFFMPZ37GC9&contentType=json`);
    const data = await response.json();

    const currentWeather = data["days"][0] as Weather;
    currentWeather.address = data["address"];
    this.currentWeather$.next(currentWeather); 
    this.currentTrip$.next(trip);
  }

  fetchTrips(): void {
    this.trips$.next(this.storedTrips);
  }

  fetchTripsByInput(input: string): void {
    const trips = this.storedTrips;

    const filteredTrips = trips.filter((trip) => trip.city.toLocaleLowerCase().includes(input));

    if (filteredTrips) {
      this.trips$.next(filteredTrips);
    }
  }

  addTrip(trip: Trip): void {
    const trips = this.storedTrips;

    trips.push(trip);

    localStorage.setItem(this.tripsKey, JSON.stringify(trips));

    this.fetchTrips();
  }

  getTripById(id: number): Trip {
    const trips = this.storedTrips;

    const tripInDB = trips.find((el) => el.id === id) as Trip;

    return tripInDB;
  }

  private get storedTrips(): Trip[] {
    return JSON.parse(localStorage.getItem(this.tripsKey) || '{}') as Trip[];
  }

  loadMock(): void {
    if (
      localStorage.getItem(this.tripsKey) === null ||
      localStorage.getItem(this.tripsKey) == undefined
    ) {
      let trips = [
        new Trip(0, 'Berlin', 1708479173, 1708825553),
        new Trip(1, 'Kyiv', 1708998353, 1709171153),
        new Trip(2, 'Berlin', 1708998353, 1709171153),
        new Trip(3, 'Kyiv', 1708998353, 1709171153),
        new Trip(4, 'Berlin', 1708998353, 1709171153),
      ];

      localStorage.setItem(this.tripsKey, JSON.stringify(trips));
      this.fetchTrips();
      return;
    }
  }
}

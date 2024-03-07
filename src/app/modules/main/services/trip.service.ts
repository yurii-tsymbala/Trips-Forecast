import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Trip } from '../models/Trip';
import { Weather } from '../models/Weather';

@Injectable({
  providedIn: 'root',
})
export class TripService {
  private readonly tripsKey = 'trips';
  private readonly apiKey = 'AGPEN7R32U9ERDSMKNTT2K2X2';
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

  async fetchForecast(trip: Trip): Promise<void> {
    const response = await fetch(this.forecastUrl(trip));
    const data = await response.json();

    const weathers = data["days"] as Weather[];  
    this.weathers$.next(weathers);  
  }

  async fetchForecastToday(trip: Trip): Promise<void> {
    const response = await fetch(this.forecastTodayUrl(trip));
    const data = await response.json();

    const currentWeather = data["days"][0] as Weather;
    currentWeather.address = data["address"];
    this.currentWeather$.next(currentWeather); 
    this.currentTrip$.next(trip);
  }

  fetchTrips(): void {
    const trips = this.storedTrips;
    trips.sort( (firstTrip, secondTrip) => firstTrip.startDate - secondTrip.startDate);
    this.trips$.next(trips);
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

  get storedTripsLength(): number {
    return this.storedTrips.length;
  }

  private get storedTrips(): Trip[] {
    return JSON.parse(localStorage.getItem(this.tripsKey) || '{}') as Trip[];
  }

  private forecastUrl(trip: Trip): string {
   return `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/
   ${trip.city}/${trip.startDate}/${trip.endDate}?key=${this.apiKey}`
  }

  private forecastTodayUrl(trip: Trip): string {
   return `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/
   ${trip.city}/today?unitGroup=metric&include=days&key=${this.apiKey}`
  }

  private loadMock(): void {
    if (
      localStorage.getItem(this.tripsKey) === null ||
      localStorage.getItem(this.tripsKey) == undefined
    ) {
      let trips = [
        new Trip(0, 'Kyiv', 1710330345, 1710935145),
        new Trip(1, 'Barcelona', 1710416745, 1711194345),
        new Trip(2, 'Amsterdam', 1710503145, 1711539945),
      ];

      localStorage.setItem(this.tripsKey, JSON.stringify(trips));
      this.fetchTrips();
      return;
    }
  }
}

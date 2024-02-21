import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Trip } from '../models/Trip';

@Injectable({
  providedIn: 'root',
})
export class TripService {
  private tripsKey = 'trips';
  private trips$ = new BehaviorSubject<Trip[]>([]);
  readonly updatedTrips$ = this.trips$.asObservable();

  constructor() {
    this.loadMock();
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
        new Trip(1, 'Lviv', 1708998353, 1709171153),
      ];

      localStorage.setItem(this.tripsKey, JSON.stringify(trips));
      this.fetchTrips();
      return;
    }
  }
}

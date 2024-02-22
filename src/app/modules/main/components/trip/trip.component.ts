import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { getFormattedDate } from '../../models/FormattedDate';
import { Trip } from '../../models/Trip';

@Component({
  selector: 'trip',
  standalone: true,
  imports: [],
  templateUrl: './trip.component.html',
  styleUrl: './trip.component.scss',
})
export class TripComponent {
  @Input() trip!: Trip;
  @Output() tripDetail = new EventEmitter<Trip>();

  @HostListener('click')
  onDetail(): void {
    this.tripDetail.emit(this.trip);
  }

  get dateFormatted(): string {
    return getFormattedDate(this.trip.startDate) + " - " + getFormattedDate(this.trip.endDate);
  }

  get imageUrl() {
    return `assets/cities/${this.trip.city.toLowerCase()}.jpg`;
  }
}


import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TripService } from '../../services/trip.service';

@Component({
  selector: 'search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  @Output() inputSearch = new EventEmitter();
  inputValue: string = '';

  constructor(private tripService: TripService) {}

  onInput(): void {
    if (this.inputValue) {
      this.inputSearch.emit();
      this.tripService.fetchTrips();
      this.tripService.fetchTripsByInput(this.inputValue);
    } else {
      this.tripService.fetchTrips();
    }
  }
}

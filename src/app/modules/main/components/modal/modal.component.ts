import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, ElementRef, HostBinding, OnInit,  ViewChild, inject } from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule,Validators } from '@angular/forms';
import { Trip } from '../../models/Trip';
import { TripService } from '../../services/trip.service';

@Component({
  selector: 'modal',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent implements OnInit {
  @ViewChild('myModal', { static: false }) modal!: ElementRef;
  @HostBinding('class.hidden') hidden: boolean = true;

  modalForm!: FormGroup;
  cityFormControl = new FormControl('', [Validators.required]);
  startDateFormControl = new FormControl('', [Validators.required]);
  endDateFormControl = new FormControl('', [Validators.required]);

  readonly cities: String[] = ['Amsterdam', 'New York', 'Paris', 'Kyiv', 'Tokyo', 'Berlin', 'Barcelona'];

  private document = inject(DOCUMENT);
  private tripService = inject(TripService);

  ngOnInit(): void {
    this.configureForm();
    this.configureDateRange();
  }

  onSubmit(): void {
    if (this.modalForm.valid) {
      const id = this.tripService.storedTripsLength;
      const city = this.cityFormControl.value as string;
      const startDate = Math.floor(
        new Date(this.startDateFormControl.value as string).getTime() / 1000
      );
      const endDate = Math.floor(
        new Date(this.endDateFormControl.value as string).getTime() / 1000
      );

      const trip = new Trip(id, city, startDate, endDate);
      this.tripService.addTrip(trip);

      this.hidden = true;
      this.modalForm.reset();
    }
  }

  onOpen(): void {
    this.hidden = false;
  }

  onCancel(): void {
    this.hidden = true;
    this.modalForm.reset();
  }

  onStartDateChanged(event: any): void {
    const startDate = new Date(event.target.value as string);
    if (startDate) {
      (this.document.getElementById('endDate') as HTMLInputElement).min =
        startDate.toISOString().split('T')[0];
    }
  }

  onEndDateChanged(event: any): void {
    const endDate = new Date(event.target.value as string);
    if (endDate) {
      (this.document.getElementById('startDate') as HTMLInputElement).max =
        endDate.toISOString().split('T')[0];
    }
  }

  private configureForm(): void {
    this.modalForm = new FormGroup({
      cityFormControl: this.cityFormControl,
      startDateFormControl: this.startDateFormControl,
      endDateFormControl: this.endDateFormControl,
    });
  }

  private configureDateRange(): void {
    if (this.document) {
      let minDate = new Date();
      minDate.setDate(minDate.getDate() + 1);
      let maxDate = new Date();
      maxDate.setDate(maxDate.getDate() + 15);
      (this.document.getElementById('startDate') as HTMLInputElement).min =
        minDate.toISOString().split('T')[0];
      (this.document.getElementById('startDate') as HTMLInputElement).max =
        maxDate.toISOString().split('T')[0];
      (this.document.getElementById('endDate') as HTMLInputElement).min =
        minDate.toISOString().split('T')[0];
      (this.document.getElementById('endDate') as HTMLInputElement).max =
        maxDate.toISOString().split('T')[0];
    }
  }
}

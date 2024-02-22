import {
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'modal',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent implements OnInit {
  @ViewChild('myModal', { static: false }) modal!: ElementRef;
  @Output() saveTrip = new EventEmitter();
  @HostBinding('class.hidden') hidden: boolean = true;

  modalForm!: FormGroup;
  cityFormControl = new FormControl('', [Validators.required]);
  startDateFormControl = new FormControl('', [Validators.required]);
  endDateFormControl = new FormControl('', [Validators.required]);

  ngOnInit(): void {
    this.configureForm();
  }

  private configureForm(): void {
    this.modalForm = new FormGroup({
      cityFormControl: this.cityFormControl,
      startDateFormControl: this.startDateFormControl,
      endDateFormControl: this.endDateFormControl,
    });
  }

  onOpen() {
    this.hidden = false;
  }

  onSubmit() {
    this.hidden = true;
    this.saveTrip.emit();
  }

  onCancel() {
    this.hidden = true;
  }
}

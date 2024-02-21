import {
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  @ViewChild('myModal', { static: false }) modal!: ElementRef;
  @Output() saveTrip = new EventEmitter();
  @HostBinding('class.hidden') hidden: boolean = true;

  open() {
    this.hidden = false;
  }

  save() {
    this.hidden = true;
    this.saveTrip.emit();
  }

  cancel() {
    this.hidden = true;
  }
}

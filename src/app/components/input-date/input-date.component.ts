import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-input-date',
  templateUrl: './input-date.component.html',
  styleUrl: './input-date.component.css'
})
export class InputDateComponent {
  @Output() outInputDate = new EventEmitter<string>();
  inputDate: string = "";

  ngDoCheck(): void {
    this.outInputDate.emit(this.inputDate);
  }
}

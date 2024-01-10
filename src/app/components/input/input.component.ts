import { Component, DoCheck, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements DoCheck {

  @Output() outInputSumma = new EventEmitter<number>();
  @Input() userSumma: number = 0;

  ngDoCheck(): void {
    this.outInputSumma.emit(Number(this.userSumma));
  }
}
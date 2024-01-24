import { Component, DoCheck, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements DoCheck {

  @Output() outInputSumma = new EventEmitter<number | null>();
  @Input() userSumma: number | null = null;
  outUserSumma: number | null = null;

  ngDoCheck(): void {
    this.outInputSumma.emit(this.outUserSumma);
  }
}
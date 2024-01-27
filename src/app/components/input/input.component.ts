import { Component, DoCheck, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements DoCheck, OnChanges {

  @Output() outInputSumma = new EventEmitter<number | null>();
  @Input() userSumma: number | null = null;
  @Input() isResetInput: boolean = false;
  outUserSumma: number | null = null;

  ngDoCheck(): void {
    this.outInputSumma.emit(this.outUserSumma);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isResetInput']) {
      this.userSumma = null;
      this.outUserSumma = null;
    }
  }
}
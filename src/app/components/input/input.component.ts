import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Currency } from 'src/app/models/currency';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {
  @Output() outInputSumma = new EventEmitter<number>();
  @Input() userSumma: number;
  @Input() currency: Currency[];
  @Input() firstSelect: string;
  @Input() secondSelect: string;

  result: number;
  priseFirstCurrency: number;
  priseSecondCurrency: number;

  enterSumma(inputElement: HTMLInputElement) {
    this.outInputSumma.emit(Number(inputElement.value));
  }

  currencyConverter() {
    console.log(this.userSumma)
    this.priseFirstCurrency = this.findCurrency(this.firstSelect);
    this.priseSecondCurrency = this.findCurrency(this.secondSelect);
  }

  findCurrency(select: string = 'UAH'): number {
    return this.currency.filter(item => item.cc === select).map(item => item.rate)[0];
  }
}

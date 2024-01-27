import { Component, EventEmitter, Output } from '@angular/core';
import { Currency } from 'src/app/models/currency';
import { BankNBUService } from 'src/app/services/bankNBU/bank-nbu.service';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent {
  @Output() outSelectCurrency = new EventEmitter<string>();
  currency: Currency[] = [];

  constructor(private bankNBU: BankNBUService) {
    bankNBU.search().subscribe(result => {
      this.currency = result;
    });
  }

  enterCurrency(selectElement: HTMLSelectElement) {
    this.outSelectCurrency.emit(selectElement.value);
  }
}
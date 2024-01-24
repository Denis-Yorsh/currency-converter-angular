import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Currency } from 'src/app/models/currency';
import { BankNBUService } from 'src/app/services/bankNBU/bank-nbu.service';
import { BankNBUDateService } from 'src/app/services/bankNBUForDate/bank-nbudate.service';

@Component({
  selector: 'app-li-currency',
  templateUrl: './li-currency.component.html',
  styleUrl: './li-currency.component.css'
})
export class LiCurrencyComponent implements OnChanges {
  currency: Currency[] = [];
  @Input() inDate: string = "";

  constructor(private bankNBUForDate: BankNBUDateService, private bankNBU: BankNBUService) {
    bankNBU.search().subscribe(result => {
      this.currency = result;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['inDate'].currentValue !== '') {
      this.bankNBUForDate.searchForDate(changes['inDate'].currentValue.replaceAll('-', '')).subscribe(result => {
        this.currency = result;
      });
    }
  }
}
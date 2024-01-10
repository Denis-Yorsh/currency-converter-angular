import { AfterViewChecked, ChangeDetectorRef, Component } from '@angular/core';
import { BankNBUService } from './services/bankNBU/bank-nbu.service';
import { Currency } from './models/currency';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewChecked {

  private currency: Currency[] = [];
  private firstSumma: number = 0;
  private secondSumma: number = 0;
  private firstSelect: string = '';
  private secondSelect: string = '';
  resultFirst: number = 0;
  resultSecond: number = 0;

  constructor(private bankNBUService: BankNBUService, private changeDetector: ChangeDetectorRef) {
    this.bankNBUService.search().subscribe(result => {
      console.log(result);
      this.currency = result;
    });
  }

  ngAfterViewChecked(): void {
    console.log(this.firstSumma)
    console.log(this.secondSumma)
    this.currencyConverter()
    this.changeDetector.detectChanges();
  }

  addUserSummaFirst(firstSumma: number) {
    this.firstSumma = firstSumma;
  }
  addUserSummaSecond(secondSumma: number) {
    this.secondSumma = secondSumma;
  }

  addUserSelectFirst(firstSelect: string) {
    this.firstSelect = firstSelect;
  }
  addUserSelectSecond(secondSelect: string) {
    this.secondSelect = secondSelect;
  }

  private currencyConverter() {
    this.resultFirst = this.findCurrency(this.firstSelect);
    this.resultSecond = this.findCurrency(this.secondSelect);
  }

  private findCurrency(select: string): number {
    return this.currency.filter(item => item.cc === select).map(item => item.rate)[0];
  }
}
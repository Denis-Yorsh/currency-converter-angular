import { AfterViewChecked, ChangeDetectorRef, Component, DoCheck } from '@angular/core';
import { BankNBUService } from './services/bankNBU/bank-nbu.service';
import { Currency } from './models/currency';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewChecked {

  private currency: Currency[] = [];

  private firstSumma: number | null = null;
  private prevFirstSumma: number | null = null;
  private secondSumma: number | null = null;
  private prevSecondSumma: number | null = null;
  private tempFirst: number = 0;

  private firstSelect: string = '';
  private secondSelect: string = '';
  private tempSecond: number = 0;

  resultFirst: number | null = null;
  resultSecond: number | null = null;

  constructor(private bankNBUService: BankNBUService, private changeDetector: ChangeDetectorRef) {
    this.bankNBUService.search().subscribe(result => {
      this.currency = result;
    });
  }

  ngAfterViewChecked(): void {
    this.currencyConverter()
    this.changeDetector.detectChanges();
  }

  addUserSummaFirst(firstSumma: number | null) {
    this.firstSumma = firstSumma;
  }
  addUserSummaSecond(secondSumma: number | null) {
    this.secondSumma = secondSumma;
  }

  addUserSelectFirst(firstSelect: string) {
    this.firstSelect = firstSelect;
  }
  addUserSelectSecond(secondSelect: string) {
    this.secondSelect = secondSelect;
  }

  private currencyConverter() {
    if (this.firstSelect === '') {
      this.firstSelect = 'USD';
    }
    if (this.secondSelect === '') {
      this.secondSelect = 'USD';
    }
    this.firstInput();
    this.secondInput();
    this.checkUAH();
  }

  private firstInput() {
    if ((this.prevFirstSumma !== this.firstSumma)
      && this.firstSelect !== 'UAH' && this.secondSelect !== 'UAH') {
      if (this.firstSelect === this.secondSelect) {
        this.resultSecond = this.firstSumma;
        this.prevFirstSumma = this.firstSumma;
        return;
      } else if (this.firstSumma === 0 || !this.firstSumma) {
        return;
      }
      this.tempFirst = this.findCurrency(this.firstSelect) * this.firstSumma;
      this.tempSecond = this.findCurrency(this.secondSelect) * this.firstSumma;
      this.resultSecond = Number(parseFloat(String(this.tempFirst / this.tempSecond * this.firstSumma)).toFixed(4));
      this.prevFirstSumma = this.firstSumma;
      this.secondSumma = this.resultSecond;
      return;
    }
  }

  private secondInput() {
    if ((this.prevSecondSumma !== this.secondSumma)
      && this.firstSelect !== 'UAH' && this.secondSelect !== 'UAH') {
      if (this.secondSelect === this.firstSelect) {
        this.resultFirst = this.secondSumma;
        this.prevSecondSumma = this.secondSumma;
        return;
      } else if (this.secondSumma === 0 || !this.secondSumma) {
        return;
      }
      this.tempFirst = this.findCurrency(this.firstSelect) * this.secondSumma;
      this.tempSecond = this.findCurrency(this.secondSelect) * this.secondSumma;
      this.resultFirst = Number(parseFloat(String(this.tempSecond / this.tempFirst * this.secondSumma)).toFixed(4));
      this.prevSecondSumma = this.secondSumma;
      this.firstSumma = this.resultFirst;
      return;
    }
  }

  private checkUAH() {
    if (this.firstSelect === 'UAH' && this.secondSelect !== 'UAH') {
      if (this.prevFirstSumma !== this.firstSumma) {
        if (!this.firstSumma) {
          return;
        }
        this.resultSecond = Number(parseFloat(String(this.firstSumma / this.findCurrency(this.secondSelect))).toFixed(4));
        this.prevFirstSumma = this.firstSumma;
        this.secondSumma = this.resultSecond;
      } else if (this.prevSecondSumma !== this.secondSumma) {
        if (!this.secondSumma) {
          return;
        }
        this.resultFirst = Number(parseFloat(String(this.secondSumma * this.findCurrency(this.secondSelect))).toFixed(4));
        this.prevSecondSumma = this.secondSumma;
        this.firstSumma = this.resultFirst;
      }
    } else if (this.firstSelect !== 'UAH' && this.secondSelect === 'UAH') {
      if (this.prevFirstSumma !== this.firstSumma) {
        if (!this.firstSumma) {
          return;
        }
        this.resultSecond = Number(parseFloat(String(this.firstSumma * this.findCurrency(this.firstSelect))).toFixed(4));
        this.prevFirstSumma = this.firstSumma;
        this.secondSumma = this.resultSecond;
      } else if (this.prevSecondSumma !== this.secondSumma) {
        if (!this.secondSumma) {
          return;
        }
        this.resultFirst = Number(parseFloat(String(this.secondSumma / this.findCurrency(this.firstSelect))).toFixed(4));
        this.prevSecondSumma = this.secondSumma;
        this.firstSumma = this.resultFirst;
      }
    } else if (this.secondSelect === 'UAH' && this.firstSelect === 'UAH') {
      this.resultFirst = this.secondSumma;
      this.resultSecond = this.firstSumma;
    }
  }

  private findCurrency(select: string): number {
    return this.currency.filter(item => item.cc === select).map(item => item.rate)[0];
  }
}
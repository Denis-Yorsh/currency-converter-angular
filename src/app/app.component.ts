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
  private firstMap = new Map<string, any>();
  private secondMap = new Map<string, any>();

  private firstSumma: number | null = null;
  private secondSumma: number | null = null;
  private tempFirst: number = 0;

  private firstSelect: string;
  private secondSelect: string;
  private tempSecond: number = 0;

  date: string = "";
  isReset: boolean = false;
  resultFirst: number | null = null;
  resultSecond: number | null = null;

  constructor(private bankNBUService: BankNBUService, private changeDetector: ChangeDetectorRef) {
    this.bankNBUService.search().subscribe(result => {
      this.currency = result;
    });

    this.firstSelect = 'UAH';
    this.secondSelect = 'UAH';

    this.firstMap.set('firstSumma', this.firstSumma)
    this.firstMap.set('firstSelect', this.firstSelect)
    this.firstMap.set('first', false)

    this.secondMap.set('secondSumma', this.secondSumma)
    this.secondMap.set('secondSelect', this.secondSelect)
    this.secondMap.set('second', false)
  }

  ngAfterViewChecked(): void {
    this.isTru();
    this.currencyConverter();
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

  addDate(date: string) {
    this.date = date;
  }

  private isTru() {
    if (this.firstMap.get('firstSumma') != this.firstSumma) {
      this.firstMap.set('firstSumma', this.firstSumma);
      this.firstMap.set('first', true)
    } else if (this.firstMap.get('firstSelect') != this.firstSelect) {
      this.firstMap.set('firstSelect', this.firstSelect);
      this.firstMap.set('first', false)
      this.secondMap.set('second', false);
      this.isReset = !this.isReset;
      return;
    } else if (this.secondMap.get('secondSumma') != this.secondSumma) {
      this.secondMap.set('secondSumma', this.secondSumma);
      this.secondMap.set('second', true);
    } else if (this.secondMap.get('secondSelect') != this.secondSelect) {
      this.secondMap.set('secondSelect', this.secondSelect);
      this.firstMap.set('first', false)
      this.secondMap.set('second', false);
      this.isReset = !this.isReset;
      return;
    }
  }

  private currencyConverter(): void {
    this.firstInput();
    this.secondInput();
    this.checkUAH();
  }

  private firstInput() {
    if (this.firstMap.get('first') && this.firstSelect !== 'UAH' && this.secondSelect !== 'UAH') {
      if (this.firstSelect === this.secondSelect) {
        this.firstMap.set('first', false);
        this.resultSecond = this.firstSumma;
        return;
      } else if (this.firstSumma === 0 || !this.firstSumma) {
        this.firstMap.set('first', false);
        return;
      }
      this.tempFirst = this.findCurrency(this.firstSelect) * this.firstSumma;
      this.tempSecond = this.findCurrency(this.secondSelect) * this.firstSumma;
      this.resultSecond = Number(parseFloat(String(this.tempFirst / this.tempSecond * this.firstSumma)).toFixed(4));

      this.firstMap.set('first', false);
      return;
    }
  }

  private secondInput() {
    if (this.secondMap.get('second') && this.firstSelect !== 'UAH' && this.secondSelect !== 'UAH') {
      if (this.secondSelect === this.firstSelect) {
        this.secondMap.set('second', false)
        this.resultFirst = this.secondSumma;
        return;
      } else if (this.secondSumma === 0 || !this.secondSumma) {
        this.secondMap.set('second', false)
        return;
      }
      this.tempFirst = this.findCurrency(this.firstSelect) * this.secondSumma;
      this.tempSecond = this.findCurrency(this.secondSelect) * this.secondSumma;
      this.resultFirst = Number(parseFloat(String(this.tempSecond / this.tempFirst * this.secondSumma)).toFixed(4));

      this.secondMap.set('second', false)
      return;
    }
  }

  private checkUAH() {
    if (this.firstSelect === 'UAH' && this.secondSelect !== 'UAH') {
      if (this.firstMap.get('first')) {
        if (!this.firstSumma) {
          this.firstMap.set('first', false);
          return;
        }
        this.resultSecond = Number(parseFloat(String(this.firstSumma / this.findCurrency(this.secondSelect))).toFixed(4));

        this.firstMap.set('first', false);
      } else if (this.secondMap.get('second')) {
        if (!this.secondSumma) {
          this.secondMap.set('second', false)
          return;
        }
        this.resultFirst = Number(parseFloat(String(this.secondSumma * this.findCurrency(this.secondSelect))).toFixed(4));

        this.secondMap.set('second', false)
      }
    } else if (this.firstSelect !== 'UAH' && this.secondSelect === 'UAH') {
      if (this.firstMap.get('first')) {
        if (!this.firstSumma) {
          this.firstMap.set('first', false);
          return;
        }
        this.resultSecond = Number(parseFloat(String(this.firstSumma * this.findCurrency(this.firstSelect))).toFixed(4));

        this.firstMap.set('first', false);
      } else if (this.secondMap.get('second')) {
        if (!this.secondSumma) {
          this.secondMap.set('second', false)
          return;
        }
        this.resultFirst = Number(parseFloat(String(this.secondSumma / this.findCurrency(this.firstSelect))).toFixed(4));

        this.secondMap.set('second', false)
      }
    } else if (this.secondSelect === 'UAH' && this.firstSelect === 'UAH') {
      if (this.firstMap.get('first')) {
        this.firstMap.set('first', false);
        this.resultSecond = this.firstSumma;
      } else if (this.secondMap.get('second')) {
        this.secondMap.set('second', false)
        this.resultFirst = this.secondSumma;
      }
    }
  }

  private findCurrency(select: string): number {
    return this.currency.filter(item => item.cc === select).map(item => item.rate)[0];
  }
}
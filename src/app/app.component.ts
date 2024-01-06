import { Component, OnInit } from '@angular/core';
import { BankNBUService } from './services/bank-nbu.service';
import { Currency } from './models/currency';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  response: Currency[];
  firstSumma: number;
  secondSumma: number;
  firstSelect: string;
  secondSelect: string;

  constructor(private bankNBUService: BankNBUService) { }

  ngOnInit(): void {
    this.bankNBUService.search().subscribe(result => {
      console.log(result);
      this.response = result;
    });
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
}
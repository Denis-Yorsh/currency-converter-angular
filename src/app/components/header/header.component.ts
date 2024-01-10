import { Component, Input, OnInit } from '@angular/core';
import { Currency } from '../../models/currency'
import { BankNBUService } from 'src/app/services/bankNBU/bank-nbu.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  currency: Currency[] = [];

  constructor(private bankNBUService: BankNBUService) {
    this.bankNBUService.search().subscribe(result => {
      this.currency = result;
    });
  }
}
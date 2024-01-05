import { Component, OnInit } from '@angular/core';
import { BankNBUService } from './services/bank-nbu.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private bankNBUService: BankNBUService) { }

  ngOnInit(): void {
    this.bankNBUService.search().subscribe(result => {
      console.log(result);
      console.log(result[0]);
      console.log(result[0].txt);
      console.log(result[0].rate);
    });
  }
}
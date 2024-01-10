import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Currency } from '../../models/currency';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BankNBUService {

  constructor(private http: HttpClient) { }

  search(): Observable<Currency[]> {
    return this.http.get<Currency[]>('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json');
  }
}
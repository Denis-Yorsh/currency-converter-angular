import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Сurrency } from '../models/currency';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BankNBUService {

  constructor(private http: HttpClient) { }
  search(): Observable<Сurrency[]> {
    return this.http.get<Сurrency[]>('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json');
  }
}
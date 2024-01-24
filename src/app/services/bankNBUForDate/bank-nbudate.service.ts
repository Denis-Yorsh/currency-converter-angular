import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Currency } from 'src/app/models/currency';

@Injectable({
  providedIn: 'root'
})
export class BankNBUDateService {

  constructor(private http: HttpClient) { }

  searchForDate(date: string): Observable<Currency[]> {
    return this.http.get<Currency[]>(`https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date=${date}&json`);
  }
}
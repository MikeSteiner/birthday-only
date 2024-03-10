import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class YearService {

  isLeap(year: number): boolean {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }

}

import { Injectable } from '@angular/core';

import { YearService } from "../year/year.service";

@Injectable({
  providedIn: 'root'
})
export class MonthService {
  private readonly firstDayNumber = 1;

  constructor(private yearService: YearService) { }

  getFirstDay(): number {
    return  this.firstDayNumber;
  }

  getLastDay(year: number, month: number): number {
    return  this.countDays(year, month);
  }

  countDays(year: number, month: number): number {
    const maxDaysInFebruary =  this.yearService.isLeap(year)
      ? 29
      : 28;
    const maxDaysInMonth: number[] = [31, maxDaysInFebruary, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    return maxDaysInMonth[month];
  }




}

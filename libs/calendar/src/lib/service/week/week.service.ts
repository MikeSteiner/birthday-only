import { Injectable } from '@angular/core';

import { MS_IN_ONE_DAY } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class WeekService {

  constructor() { }

  /* For a given date, get the ISO week number
   *
   * Based on information at:
   *
   *    http://www.merlyn.demon.co.uk/weekcalc.htm#WNR
   *
   * Algorithm is to find nearest thursday, it's year
   * is the year of the week number. Then get weeks
   * between that date and the first day of that year.
   *
   * Note that dates in one year can be weeks of previous
   * or next year, overlap is up to 3 days.
   *
   * e.g. 2014/12/29 is Monday in week  1 of 2015
   *      2012/1/1   is Sunday in week 52 of 2011
   */
   getNumber(date: Date): number {
     // Todo add check for invalid date and return -1
     // Copy date so don't modify original
     const currentDate: Date = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));

     // Set to nearest Thursday: current date + 4 - current day number
     // Make Sunday's day number 7
     currentDate.setUTCDate(currentDate.getUTCDate() + 4 - (currentDate.getUTCDay()||7));

    // Get first day of year
    const yearStartDate: Date = new Date(Date.UTC(currentDate.getUTCFullYear(),0,1));

    // Calculate full weeks to nearest Thursday
    const weekNo: number = Math.ceil((((currentDate.getTime() - yearStartDate.getTime()) / MS_IN_ONE_DAY) + 1) / 7);

    // Return array of year and week number
    return weekNo;
  }
}

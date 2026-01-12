import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Birthday, CreateBirthdayDto, UpdateBirthdayDto, UpcomingBirthday } from '@birthday-app/shared';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BirthdayService {
  birthdays = signal<Birthday[]>([]);
  upcomingBirthdays = signal<UpcomingBirthday[]>([]);

  constructor(private http: HttpClient) {}

  loadBirthdays(): Observable<Birthday[]> {
    return this.http.get<Birthday[]>(`${environment.apiUrl}/birthdays`)
      .pipe(
        tap(birthdays => this.birthdays.set(birthdays))
      );
  }

  loadUpcoming(days = 30): Observable<UpcomingBirthday[]> {
    return this.http.get<UpcomingBirthday[]>(`${environment.apiUrl}/birthdays/upcoming?days=${days}`)
      .pipe(
        tap(upcoming => this.upcomingBirthdays.set(upcoming))
      );
  }

  create(birthday: CreateBirthdayDto): Observable<Birthday> {
    return this.http.post<Birthday>(`${environment.apiUrl}/birthdays`, birthday)
      .pipe(
        tap(() => {
          this.loadBirthdays().subscribe();
          this.loadUpcoming().subscribe();
        })
      );
  }

  update(id: string, birthday: UpdateBirthdayDto): Observable<Birthday> {
    return this.http.put<Birthday>(`${environment.apiUrl}/birthdays/${id}`, birthday)
      .pipe(
        tap(() => {
          this.loadBirthdays().subscribe();
          this.loadUpcoming().subscribe();
        })
      );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/birthdays/${id}`)
      .pipe(
        tap(() => {
          this.loadBirthdays().subscribe();
          this.loadUpcoming().subscribe();
        })
      );
  }
}

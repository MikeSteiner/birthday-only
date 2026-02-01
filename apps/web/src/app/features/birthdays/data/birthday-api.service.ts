import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Birthday, BirthdayDto, UpcomingBirthday } from '@bd-only/shared';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BirthdayApiService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/birthdays`;

  loadBirthdays(): Observable<BirthdayDto[]> {
    return this.http.get<BirthdayDto[]>(this.apiUrl);
  }

  loadUpcoming(days?: number): Observable<UpcomingBirthday[]> {
    // TODO: Extract 30 to constant
    const daysValue = days ?? 30;
    return this.http.get<UpcomingBirthday[]>(
      `${this.apiUrl}/upcoming?days=${daysValue}`,
    );
  }

  create(birthday: Birthday): Observable<BirthdayDto> {
    return this.http.post<BirthdayDto>(this.apiUrl, birthday);
  }

  update(id: string, birthday: Birthday): Observable<BirthdayDto> {
    return this.http.put<BirthdayDto>(`${this.apiUrl}/${id}`, birthday);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
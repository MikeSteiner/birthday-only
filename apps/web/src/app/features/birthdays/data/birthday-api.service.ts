import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from '@angular/core';
import {
  Birthday,
  CreateBirthdayRequest,
  UpcomingBirthday,
  UpdateBirthdayRequest
} from "@birthday-app/shared";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class BirthdayApiService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/birthdays`;

  loadBirthdays(): Observable<Birthday[]> {
    return this.http.get<Birthday[]>(this.apiUrl);
  }

  loadUpcoming(days?: number): Observable<UpcomingBirthday[]> {
    // TODO: Extract 30 to constant
    const daysValue = days ?? 30
    return this.http.get<UpcomingBirthday[]>(`${this.apiUrl}/upcoming?days=${daysValue}`);
  }

  create(birthday: CreateBirthdayRequest): Observable<Birthday> {
    return this.http.post<Birthday>(this.apiUrl, birthday);
  }

  update(id: string, birthday: UpdateBirthdayRequest): Observable<Birthday> {
    return this.http.put<Birthday>(`${this.apiUrl}/${id}`, birthday);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
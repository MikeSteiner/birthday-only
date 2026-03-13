import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Birthday } from '@bd-only/shared';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface ImportResult {
  imported: number;
  errors: number;
}

@Injectable({
  providedIn: 'root',
})
export class ImportExportApiService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/import-export`;

  importBirthdays(items: Birthday[]): Observable<ImportResult> {
    const birthdays = items.map((item) => ({
      name: item.name,
      birthDay: item.birthDay,
      birthMonth: item.birthMonth,
      ...(item.birthYear != null && { birthYear: item.birthYear }),
      ...(item.phoneNumber != null && { phoneNumber: item.phoneNumber }),
      ...(item.greetingMessage != null && { greetingMessage: item.greetingMessage }),
    }));

    return this.http.post<ImportResult>(`${this.apiUrl}/birthdays`, { birthdays });
  }
}
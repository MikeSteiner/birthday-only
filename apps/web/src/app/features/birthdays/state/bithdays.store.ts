import { HttpErrorResponse } from "@angular/common/http";
import { computed, inject, Injectable } from "@angular/core";
import { tapResponse } from "@ngrx/operators";
import { patchState, signalState } from "@ngrx/signals";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { pipe, switchMap } from "rxjs";
import { tap } from "rxjs/operators";
import { Birthday, BirthdayDto, UpdateBirthdayRequest, UpcomingBirthday } from '@bd-only/shared';
import { BirthdayApiService } from "../data/birthday-api.service";

export interface BirthdaysState {
  birthdays: BirthdayDto[];
  upcomingBirthdays: UpcomingBirthday[];
  loading: boolean;
  error?: HttpErrorResponse;
}

const initialState: BirthdaysState = {
  birthdays: [],
  upcomingBirthdays: [],
  loading: false,
  error: undefined,
};

@Injectable()
export class BirthdaysStore {
  private readonly birthdayApiService = inject(BirthdayApiService);

  private readonly state = signalState(initialState);

  // SELECTORS
  readonly birthdays = computed(() => this.state().birthdays);
  readonly upcomingBirthdays = computed(() => this.state().upcomingBirthdays);
  readonly loading = computed(() => this.state().loading);
  readonly error = computed(() => this.state().error);

  // Computed selectors
  readonly hasBirthdays = computed(() => this.birthdays().length > 0);
  readonly hasUpcoming = computed(() => this.upcomingBirthdays().length > 0);

  // UPDATERS
  updateBirthdays(birthdays: BirthdayDto[]): void {
    patchState(this.state, { birthdays });
  }

  updateUpcomingBirthdays(upcomingBirthdays: UpcomingBirthday[]): void {
    patchState(this.state, { upcomingBirthdays });
  }

  clearError(): void {
    patchState(this.state, { error: undefined });
  }

  resetState(): void {
    patchState(this.state, initialState);
  }

  // EFFECTS
  readonly loadAllBirthdays = rxMethod<void>(
    pipe(
      tap(() => patchState(this.state, { loading: true, error: undefined })),
      switchMap(() => {
        return this.birthdayApiService.loadBirthdays().pipe(
          tapResponse({
            next: (birthdaysResponse) => {
              this.updateBirthdays(birthdaysResponse);
            },
            error: (error: HttpErrorResponse) =>
              patchState(this.state, { error }),
            finalize: () => patchState(this.state, { loading: false }),
          }),
        );
      }),
    ),
  );

  readonly loadUpcomingBirthdays = rxMethod<number | void>(
    pipe(
      tap(() => patchState(this.state, { loading: true, error: undefined })),
      switchMap((days) => {
        const daysValue = days as number | undefined;
        return this.birthdayApiService.loadUpcoming(daysValue).pipe(
          tapResponse({
            next: (upcomingResponse) => {
              this.updateUpcomingBirthdays(upcomingResponse);
            },
            error: (error: HttpErrorResponse) =>
              patchState(this.state, { error }),
            finalize: () => patchState(this.state, { loading: false }),
          }),
        );
      }),
    ),
  );

  readonly createBirthday = rxMethod<Birthday>(
    pipe(
      tap(() => patchState(this.state, { loading: true, error: undefined })),
      switchMap((birthday) => {
        return this.birthdayApiService.create(birthday).pipe(
          tapResponse({
            next: (newBirthday) => {
              const updatedBirthdays = [...this.state().birthdays, newBirthday];
              this.updateBirthdays(updatedBirthdays);
              // Reload upcoming to reflect the new birthday
              this.loadUpcomingBirthdays();
            },
            error: (error: HttpErrorResponse) =>
              patchState(this.state, { error }),
            finalize: () => patchState(this.state, { loading: false }),
          }),
        );
      }),
    ),
  );

  readonly updateBirthday = rxMethod<{ id: string; birthday: Birthday }>(
    pipe(
      tap(() => patchState(this.state, { loading: true, error: undefined })),
      switchMap(({ id, birthday }) => {
        return this.birthdayApiService.update(id, birthday).pipe(
          tapResponse({
            next: (updatedBirthday) => {
              const updatedBirthdays = this.state().birthdays.map((b) =>
                (b as any)._id === id ? updatedBirthday : b
              );
              this.updateBirthdays(updatedBirthdays);
              // Reload upcoming to reflect the changes
              this.loadUpcomingBirthdays();
            },
            error: (error: HttpErrorResponse) =>
              patchState(this.state, { error }),
            finalize: () => patchState(this.state, { loading: false }),
          }),
        );
      }),
    ),
  );

  readonly deleteBirthday = rxMethod<string>(
    pipe(
      tap(() => patchState(this.state, { loading: true, error: undefined })),
      switchMap((id) => {
        return this.birthdayApiService.delete(id).pipe(
          tapResponse({
            next: () => {
              const updatedBirthdays = this.state().birthdays.filter(
                (b) => (b as any)._id !== id
              );
              this.updateBirthdays(updatedBirthdays);
              // Reload upcoming to reflect the deletion
              this.loadUpcomingBirthdays();
            },
            error: (error: HttpErrorResponse) =>
              patchState(this.state, { error }),
            finalize: () => patchState(this.state, { loading: false }),
          }),
        );
      }),
    ),
  );
}

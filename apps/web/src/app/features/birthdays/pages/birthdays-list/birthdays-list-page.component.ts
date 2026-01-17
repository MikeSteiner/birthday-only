import { CommonModule } from "@angular/common";
import { Component, inject, OnInit, signal } from "@angular/core";
import { Birthday } from "@birthday-app/shared";
import { AllBirthdaysComponent } from "../../components/all-birthdays/all-birthdays.component";
import {
  BirthdayDialogComponent,
  BirthdayDialogInputData,
  BirthdayDialogResultData,
} from "../../components/birthday-dialog/birthday-dialog.component";
import { BirthdayFocusCardComponent } from '../../components/birthday-focus-card/birthday-focus-card.component';
import { DialogService } from "../../components/dialog/dialog.service";
import { UpcomingBirthdaysComponent } from "../../components/upcoming-birthdays/upcoming-birthdays.component";
import { BirthdaysStore } from "../../state/bithdays.store";

@Component({
  selector: "app-birthdays-list-page",
  standalone: true,
  imports: [
    CommonModule,
    UpcomingBirthdaysComponent,
    AllBirthdaysComponent,
    BirthdayFocusCardComponent,
  ],
  providers: [BirthdaysStore],
  templateUrl: "./birthdays-list-page.component.html",
  styleUrls: ["./birthdays-list-page.component.scss"],
})
export class BirthdaysListPageComponent implements OnInit {
  private readonly birthdaysStore = inject(BirthdaysStore);
  private readonly dialogService = inject(DialogService);

  // ===== Store state (signals) =====
  readonly birthdays = this.birthdaysStore.birthdays;
  readonly upcomingBirthdays = this.birthdaysStore.upcomingBirthdays;
  readonly loading = this.birthdaysStore.loading;
  readonly error = this.birthdaysStore.error;

  readonly editingId = signal<string | null>(null);

  ngOnInit(): void {
    this.birthdaysStore.loadAllBirthdays();
    this.birthdaysStore.loadUpcomingBirthdays();
  }

  openAdd(): void {
    this.editingId.set(null);
    this.openDialog();
  }

  openEdit(birthday: Birthday): void {
    this.editingId.set(birthday._id!);
    this.openDialog(birthday);
  }

  openDialog(birthday?: Birthday): void {
    const data = birthday ? { birthday: birthday } : undefined;
    const dialogRef = this.dialogService.open<
      BirthdayDialogResultData,
      BirthdayDialogInputData
    >(BirthdayDialogComponent, {
      data,
    });

    dialogRef.closed$.subscribe((result) => {
      if (!result) {
        return;
      }

      const id = this.editingId();
      if (id) {
        this.birthdaysStore.updateBirthday({
          id,
          birthday: {
            ...result,
          },
        });
      } else {
        this.birthdaysStore.createBirthday(result);
      }
    });
  }

  delete(id: string): void {
    this.birthdaysStore.deleteBirthday(id);
  }
}

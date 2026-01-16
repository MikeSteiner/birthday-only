import { CommonModule } from "@angular/common";
import { Component, inject, OnInit, signal } from "@angular/core";
import { Birthday } from "@birthday-app/shared";
import { AuthService } from "../../../auth/services/auth.service";
import { AllBirthdaysComponent } from "../../components/all-birthdays/all-birthdays.component";
import { BirthdayFormComponent } from "../../components/birthday-form/birthday-form.component";
import { BirthdaysHeaderComponent } from "../../components/birthdays-header/birthdays-header.component";
import { ModalComponent } from "../../components/modal/modal.component";
import { UpcomingBirthdaysComponent } from "../../components/upcoming-birthdays/upcoming-birthdays.component";
import { BirthdaysStore } from '../../state/bithdays.store';

@Component({
  selector: "app-birthdays-list-page",
  standalone: true,
  imports: [
    CommonModule,
    BirthdaysHeaderComponent,
    UpcomingBirthdaysComponent,
    AllBirthdaysComponent,
    BirthdayFormComponent,
    ModalComponent,
  ],
  providers: [BirthdaysStore],
  templateUrl: "./birthdays-list-page.component.html",
  styleUrls: ["./birthdays-list-page.component.scss"],
})
export class BirthdaysListPageComponent implements OnInit {
  private readonly store = inject(BirthdaysStore);
  private readonly authService = inject(AuthService);

  // ===== Store state (signals) =====
  readonly birthdays = this.store.birthdays;
  readonly upcomingBirthdays = this.store.upcomingBirthdays;
  readonly loading = this.store.loading;
  readonly error = this.store.error;

  // ===== Auth state =====
  readonly currentUser = this.authService.currentUser;

  // ===== UI state =====
  readonly showModal = signal(false);
  readonly editingId = signal<string | null>(null);

  readonly formData = signal<{
    name?: string;
    birthDay: number;
    birthMonth: number;
    birthYear?: number;
  }>({
    name: undefined,
    birthDay: 1,
    birthMonth: 1,
    birthYear: undefined,
  });

  // ===== Lifecycle =====
  ngOnInit(): void {
    this.store.loadAllBirthdays();
    this.store.loadUpcomingBirthdays();
  }

  // ===== UI actions =====
  openAdd(): void {
    this.editingId.set(null);
    this.formData.set({
      name: "",
      birthDay: 1,
      birthMonth: 1,
      birthYear: undefined,
    });
    this.showModal.set(true);
  }

  openEdit(birthday: Birthday): void {
    this.editingId.set(birthday._id!);
    this.formData.set({
      name: birthday.name,
      birthDay: birthday.birthDay,
      birthMonth: birthday.birthMonth,
      birthYear: birthday.birthYear,
    });
    this.showModal.set(true);
  }

  submit(data: {
    name?: string;
    birthDay: number;
    birthMonth: number;
    birthYear?: number;
  }): void {
    const id = this.editingId();

    if (id) {
      this.store.updateBirthday({ id, birthday: data });
    } else {
      this.store.createBirthday(data);
    }

    this.closeModal();
  }

  delete(id: string): void {
    this.store.deleteBirthday(id);
  }

  closeModal(): void {
    this.showModal.set(false);
    this.editingId.set(null);
  }

  logout(): void {
    this.authService.logout();
  }
}

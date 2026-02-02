import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { DialogService } from '@bd-only/bd-dialog';
import {
  ExpandPanelComponent,
  ExpandPanelContentComponent,
  ExpandPanelHeaderComponent
} from '@bd-only/bd-ui-primitives';
import { Birthday, BirthdayDto } from '@bd-only/shared';
import { AllBirthdaysComponent } from '../../components/all-birthdays/all-birthdays.component';
import { BirthdayDialogComponent } from '../../components/birthday-dialog/birthday-dialog.component';
import { BirthdayFocusCardComponent } from '../../components/birthday-focus-card/birthday-focus-card.component';
import {
  ConfirmationDialogComponent,
  ConfirmationDialogData
} from '../../components/confirmation-dialog/confirmation-dialog.component';
import { UpcomingBirthdaysComponent } from '../../components/upcoming-birthdays/upcoming-birthdays.component';
import { EditBirthdayFormValue } from '../../service/birthday-form.service';
import { BirthdaysStore } from '../../state/bithdays.store';

@Component({
  selector: 'app-birthdays-list-page',
  standalone: true,
  imports: [
    CommonModule,
    UpcomingBirthdaysComponent,
    AllBirthdaysComponent,
    BirthdayFocusCardComponent,
    ExpandPanelComponent,
    ExpandPanelHeaderComponent,
    ExpandPanelContentComponent,
  ],
  providers: [BirthdaysStore],
  templateUrl: './birthdays-list-page.component.html',
  styleUrls: ['./birthdays-list-page.component.scss'],
})
export class BirthdaysListPageComponent implements OnInit {
  private readonly birthdaysStore = inject(BirthdaysStore);
  private readonly dialogService = inject(DialogService);

  // ===== Store state (signals) =====
  readonly birthdays = this.birthdaysStore.birthdays;
  readonly upcomingBirthdays = this.birthdaysStore.upcomingBirthdays;
  readonly selectedBirthday = this.birthdaysStore.selectedBirthday;
  readonly selectedBirthdayId = this.birthdaysStore.selectedBirthdayId;
  readonly loading = this.birthdaysStore.loading;
  readonly error = this.birthdaysStore.error;

  readonly editingId = signal<string | null>(null);

  faqs = [
    {
      id: 1,
      question: 'How do I add a birthday?',
      answer:
        'Click the "Add Birthday" button and fill in the required information including name and birth date.',
    },
    {
      id: 2,
      question: 'Can I set custom reminders?',
      answer:
        'Yes! You can customize reminder settings in your profile preferences.',
    },
    {
      id: 3,
      question: 'Is my data secure?',
      answer:
        'Absolutely! We use industry-standard encryption and never share your data with third parties.',
    },
    {
      id: 4,
      question: 'Can I import birthdays from other apps?',
      answer:
        'Currently we support manual entry only, but import features are coming soon!',
    },
  ];

  ngOnInit(): void {
    this.birthdaysStore.loadAllBirthdays();
    this.birthdaysStore.loadUpcomingBirthdays();
  }

  openAdd(): void {
    this.editingId.set(null);
    this.handleOpenAddEditEvent();
  }

  openEdit(birthday: BirthdayDto): void {
    this.editingId.set(birthday._id);
    this.handleOpenAddEditEvent(birthday);
  }

  cardClick(id: string | null): void {
    this.birthdaysStore.toggleBirthdaySelection(id);
  }

  delete(id: string): void {
    this.handleDeleteBirthdayEvent(id);
  }

  call(birthday: Birthday): void {
    // TODO: store the call press log
    console.log('CALL action', birthday.phoneNumber);
  }

  private handleOpenAddEditEvent(birthday?: Birthday): void {
    const data = birthday ? birthday : undefined;
    const dialogRef = this.dialogService.open<
      EditBirthdayFormValue,
      EditBirthdayFormValue
    >(BirthdayDialogComponent, { data });

    dialogRef.closed$.subscribe((result) => {
      if (!result) {
        return;
      }

      const id = this.editingId();
      if (id) {
        this.birthdaysStore.updateBirthday({
          id,
          birthday: { ...result },
        });
      } else {
        this.birthdaysStore.createBirthday(result);
      }
    });
  }

  private handleDeleteBirthdayEvent(
    birthdayId: string
  ): void {
    const dialogData: ConfirmationDialogData = {
      title: 'Delete Birthday',
      message: `Are you sure you want to delete this birthday? This action cannot be undone.`,
      confirmText: 'Delete',
      cancelText: 'Cancel',
      type: 'danger',
    };

    const dialogRef = this.dialogService.open(ConfirmationDialogComponent, {
      data: dialogData,
    });

    dialogRef.closed$.subscribe((confirmed) => {
      if (confirmed) {
        this.birthdaysStore.deleteBirthday(birthdayId);
      }
    });
  }
}

import { DatePipe, TitleCasePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { BdIconComponent } from '@bd-only/bd-icons';
import { BirthdayDto, getYearDiffFromNow } from '@bd-only/shared';

@Component({
  selector: 'app-birthday-focus-card',
  templateUrl: './birthday-focus-card.component.html',
  styleUrls: ['./birthday-focus-card.component.scss'],
  imports: [TitleCasePipe, BdIconComponent, DatePipe],
})
export class BirthdayFocusCardComponent {
  readonly birthday = input<BirthdayDto | null>();

  createBirthdayDate(): Date | undefined {
    const bday = this.birthday();
    if (!bday) {
      return;
    }

    return new Date(bday.birthYear ?? 1900, bday.birthMonth, bday.birthDay);
  }

  protected readonly getYearDiffFromNow = getYearDiffFromNow;
}

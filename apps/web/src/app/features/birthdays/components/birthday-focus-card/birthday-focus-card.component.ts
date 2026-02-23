import { DatePipe, TitleCasePipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { BdIconComponent } from '@bd-only/bd-icons';
import { Birthday, BirthdayDto, getYearDiffFromNow } from '@bd-only/shared';

@Component({
  selector: 'app-birthday-focus-card',
  templateUrl: './birthday-focus-card.component.html',
  styleUrls: ['./birthday-focus-card.component.scss'],
  imports: [TitleCasePipe, BdIconComponent, DatePipe],
})
export class BirthdayFocusCardComponent {
  readonly birthday = input<BirthdayDto | null>();

  readonly call = output<Birthday>();

  protected readonly getYearDiffFromNow = getYearDiffFromNow;

  createBirthdayDate(): Date | undefined {
    const bday = this.birthday();
    if (!bday) {
      return;
    }

    return new Date(bday.birthYear ?? 1900, bday.birthMonth, bday.birthDay);
  }
}

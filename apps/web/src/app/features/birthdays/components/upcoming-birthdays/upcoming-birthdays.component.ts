import { TitleCasePipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { BdIconComponent } from '@bd-only/bd-icons';
import { UpcomingBirthday } from '@bd-only/shared';
import { BirthdayActionCardComponent } from '../birthday-action-card/birthday-action-card.component';

@Component({
  selector: 'app-upcoming-birthdays',
  standalone: true,
  imports: [BirthdayActionCardComponent, BdIconComponent, TitleCasePipe],
  templateUrl: './upcoming-birthdays.component.html',
  styleUrls: ['./upcoming-birthdays.component.scss'],
})
export class UpcomingBirthdaysComponent {
  readonly birthdays = input<UpcomingBirthday[]>([]);
  readonly selectedBirthdayId = input.required<string | null>();

  readonly cardClick = output<string | null>();
}

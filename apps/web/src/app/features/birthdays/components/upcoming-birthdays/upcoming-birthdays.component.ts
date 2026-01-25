import { TitleCasePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { BdIconComponent } from '@bd-only/bd-icons';
import { BirthdayActionCardComponent } from '../birthday-action-card/birthday-action-card.component';

@Component({
  selector: 'app-upcoming-birthdays',
  standalone: true,
  imports: [BirthdayActionCardComponent, BdIconComponent, TitleCasePipe],
  templateUrl: './upcoming-birthdays.component.html',
  styleUrls: ['./upcoming-birthdays.component.scss'],
})
export class UpcomingBirthdaysComponent {
  readonly birthdays = input<any[]>([]);
}

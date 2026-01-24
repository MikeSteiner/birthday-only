import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconDirective } from '@bd-only/ui-icons';
import { BirthdayActionCardComponent } from '../birthday-action-card/birthday-action-card.component';

@Component({
  selector: 'app-upcoming-birthdays',
  standalone: true,
  imports: [CommonModule, BirthdayActionCardComponent, IconDirective],
  templateUrl: './upcoming-birthdays.component.html',
  styleUrls: ['./upcoming-birthdays.component.scss'],
})
export class UpcomingBirthdaysComponent {
  readonly birthdays = input<any[]>([]);
}

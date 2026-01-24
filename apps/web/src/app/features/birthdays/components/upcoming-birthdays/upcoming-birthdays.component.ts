import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-upcoming-birthdays',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './upcoming-birthdays.component.html',
  styleUrls: ['./upcoming-birthdays.component.scss'],
})
export class UpcomingBirthdaysComponent {
  readonly birthdays = input<any[]>([]);
}

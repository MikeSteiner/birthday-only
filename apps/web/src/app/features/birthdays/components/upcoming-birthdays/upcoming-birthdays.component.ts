import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BirthdayActionCardComponent } from '../birthday-action-card/birthday-action-card.component';

@Component({
  selector: "app-upcoming-birthdays",
  standalone: true,
  imports: [CommonModule, BirthdayActionCardComponent],
  templateUrl: "./upcoming-birthdays.component.html",
  styleUrls: ["./upcoming-birthdays.component.scss"],
})
export class UpcomingBirthdaysComponent {
  readonly birthdays = input<any[]>([]);
}

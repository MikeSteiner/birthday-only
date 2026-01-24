import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BirthdayActionCardComponent } from '../birthday-action-card/birthday-action-card.component';

@Component({
  selector: "app-all-birthdays",
  standalone: true,
  imports: [CommonModule, BirthdayActionCardComponent],
  templateUrl: "./all-birthdays.component.html",
  styleUrls: ["./all-birthdays.component.scss"],
})
export class AllBirthdaysComponent {
  readonly birthdays = input<any[]>([]);
  readonly edit = output<any>();
  readonly remove = output<string>();
  readonly add = output<void>();
  readonly call = output<string>();
}

import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { BdIconComponent } from '@bd-only/bd-icons';
import { Birthday } from '@birthday-app/shared';
import { BirthdayActionCardComponent } from '../birthday-action-card/birthday-action-card.component';

@Component({
  selector: 'app-all-birthdays',
  standalone: true,
  imports: [CommonModule, BirthdayActionCardComponent, BdIconComponent],
  templateUrl: './all-birthdays.component.html',
  styleUrls: ['./all-birthdays.component.scss'],
})
export class AllBirthdaysComponent {
  readonly birthdays = input<Birthday[]>([]);
  readonly selectedBirthdayId = input.required<string | null>();

  readonly edit = output<any>();
  readonly remove = output<string>();
  readonly add = output<void>();
  readonly call = output<string>();
  readonly cardClick = output<string | null>();
}

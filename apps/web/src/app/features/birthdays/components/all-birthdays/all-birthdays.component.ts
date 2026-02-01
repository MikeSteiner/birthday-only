import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { BdIconComponent } from '@bd-only/bd-icons';
import { Birthday, BirthdayDto } from '@bd-only/shared';
import { BirthdayActionCardComponent } from '../birthday-action-card/birthday-action-card.component';

@Component({
  selector: 'app-all-birthdays',
  standalone: true,
  imports: [CommonModule, BirthdayActionCardComponent, BdIconComponent],
  templateUrl: './all-birthdays.component.html',
  styleUrls: ['./all-birthdays.component.scss'],
})
export class AllBirthdaysComponent {
  readonly birthdays = input<BirthdayDto[]>([]);
  readonly selectedBirthdayId = input.required<string | null>();

  readonly add = output<void>();
  readonly edit = output<BirthdayDto>();
  readonly remove = output<string>();
  readonly call = output<Birthday>();
  readonly cardClick = output<string | null>();
}

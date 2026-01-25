import { Component, input, output } from '@angular/core';
import { BirthdayDto } from '@bd-only/shared';

@Component({
  selector: 'app-birthday-action-card',
  templateUrl: './birthday-action-card.component.html',
  styleUrls: ['./birthday-action-card.component.scss'],
  imports: [],
  standalone: true,
  host: {
    '(click)': 'onCardClick()',
    '[class.selected]': 'isSelected()',
  },
})
export class BirthdayActionCardComponent {
  readonly birthday = input.required<BirthdayDto>();
  readonly isSelected = input<boolean>(false);

  readonly cardClick = output<string | null>();

  onCardClick(): void {
    const birthdayId = this.birthday()._id ?? null;
    this.cardClick.emit(birthdayId);
  }
}

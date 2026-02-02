import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { BdIconComponent } from '@bd-only/bd-icons';
import {
  ExpandPanelComponent,
  ExpandPanelContentComponent,
  ExpandPanelHeaderComponent
} from '@bd-only/bd-ui-primitives';
import { Birthday, BirthdayDto } from '@bd-only/shared';
import { BirthdayActionCardComponent } from '../birthday-action-card/birthday-action-card.component';

@Component({
  selector: 'app-all-birthdays',
  standalone: true,
  imports: [
    CommonModule,
    BirthdayActionCardComponent,
    BdIconComponent,
    ExpandPanelComponent,
    ExpandPanelHeaderComponent,
    ExpandPanelContentComponent,
  ],
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

  faqs = [
    {
      id: 1,
      question: 'How do I add a birthday?',
      answer:
        'Click the "Add Birthday" button and fill in the required information including name and birth date.',
    },
    {
      id: 2,
      question: 'Can I set custom reminders?',
      answer:
        'Yes! You can customize reminder settings in your profile preferences.',
    },
    {
      id: 3,
      question: 'Is my data secure?',
      answer:
        'Absolutely! We use industry-standard encryption and never share your data with third parties.',
    },
    {
      id: 4,
      question: 'Can I import birthdays from other apps?',
      answer:
        'Currently we support manual entry only, but import features are coming soon!',
    },
  ];
}

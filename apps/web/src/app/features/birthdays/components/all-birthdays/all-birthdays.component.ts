import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-all-birthdays',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './all-birthdays.component.html',
  styleUrls: ['./all-birthdays.component.scss'],
})
export class AllBirthdaysComponent {
  readonly birthdays = input<any[]>([]);
  readonly edit = output<any>();
  readonly remove = output<string>();
  readonly add = output<void>();
}

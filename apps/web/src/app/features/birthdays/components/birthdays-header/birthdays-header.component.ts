import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-birthdays-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './birthdays-header.component.html',
  styleUrls: ['./birthdays-header.component.scss'],
})
export class BirthdaysHeaderComponent {
  readonly user = input<{ email: string } | null>();
  readonly logout = output<void>();
}

import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss'],
  imports: [CommonModule, MenuComponent],
  standalone: true,
})
export class AppHeaderComponent {
  readonly user = input<{ email: string } | null>();
  readonly logout = output<void>();
}

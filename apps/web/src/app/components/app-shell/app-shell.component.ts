import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { AuthService } from "../../features/auth/services/auth.service";
import { AppFooterComponent } from '../app-footer/app-footer.component';
import { AppHeaderComponent } from "../app-header/app-header.component";

@Component({
  selector: "app-shell",
  standalone: true,
  imports: [CommonModule, AppHeaderComponent, AppFooterComponent],
  templateUrl: "./app-shell.component.html",
  styleUrls: ["./app-shell.component.scss"],
})
export class AppShellComponent {
  private readonly authService = inject(AuthService);

  readonly currentUser = this.authService.currentUser;

  logout(): void {
    this.authService.logout();
  }
}

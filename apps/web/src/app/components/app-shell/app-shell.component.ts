import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { AuthService } from "../../features/auth/services/auth.service";
import { ImportExportApiService } from "../../features/import-export/import-export-api.service";
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
  private readonly importExportApi = inject(ImportExportApiService);

  readonly currentUser = this.authService.currentUser;

  logout(): void {
    this.authService.logout();
  }

  onImportFile(file: File): void {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const raw = JSON.parse(e.target?.result as string);
        const items = Array.isArray(raw) ? raw : raw.birthdays ?? [];
        this.importExportApi.importBirthdays(items).subscribe({
          next: (result) => {
            alert(`Import complete: ${result.imported} imported, ${result.errors} errors.`);
            window.location.reload();
          },
          error: () => alert('Import failed. Please check the file format.'),
        });
      } catch {
        alert('Invalid JSON file.');
      }
    };
    reader.readAsText(file);
  }
}

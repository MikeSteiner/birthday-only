import { Component, ElementRef, input, output, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss'],
})
export class AppHeaderComponent {
  readonly user = input<{ email: string } | null>();
  readonly logout = output<void>();
  readonly importFile = output<File>();

  private readonly fileInput = viewChild<ElementRef<HTMLInputElement>>('fileInput');

  triggerImport(): void {
    this.fileInput()?.nativeElement.click();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      this.importFile.emit(file);
      input.value = '';
    }
  }
}

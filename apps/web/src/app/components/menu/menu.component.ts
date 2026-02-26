import { CdkMenuTrigger } from '@angular/cdk/menu';
import { CdkConnectedOverlay, CdkOverlayOrigin } from '@angular/cdk/overlay';
import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject, input, output, signal } from '@angular/core';
import { BdIconComponent } from '@bd-only/bd-icons';
import { getInitials } from '@bd-only/shared';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  imports: [CdkConnectedOverlay, CdkOverlayOrigin, BdIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent {
  private readonly destroyRef = inject(DestroyRef);

  readonly user = input<{ email: string } | null>();
  readonly logout = output<void>();

  protected readonly isLoggedIn = computed(() => !!this.user);
  readonly userInitials = computed(() => {
    const allNames = `${this.user()?.email}`;

    return getInitials(allNames);
  });

  isOpen = signal(false);

  protected readonly positions = [
    {
      originX: 'end',
      originY: 'bottom',
      overlayX: 'end',
      overlayY: 'top',
    },
  ];

  toggle() {
    this.isOpen.set(!this.isOpen());
  }

  close() {
    this.isOpen.set(false);
  }

  export(): void {
    console.log('Export click');
  }

  import(): void {
    console.log('Export click');
  }
}
